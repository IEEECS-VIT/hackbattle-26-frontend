"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, type GetTeamResponse } from "@/lib/api";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

/** Pages where we intentionally skip the backend getTeam call on load. */
const PUBLIC_PATHS = new Set(["/", "/login"]);

const REQUEST_TIMEOUT_MS = 10_000;

export type ParticipantType = "vit" | "external";

const PARTICIPANT_TYPE_KEY = "hackbattle-participant-type";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  participantType: ParticipantType | null;
  hasTeam: boolean;
  teamData: GetTeamResponse | null;
  signInWithGoogle: (participantType: ParticipantType) => Promise<User>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  checkTeamStatus: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [participantType, setParticipantType] =
    useState<ParticipantType | null>(null);
  const [hasTeam, setHasTeam] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<GetTeamResponse | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Helper to clear local state and sign out
  const handleUnauthorized = async (auth = getFirebaseAuth()) => {
    if (auth) await firebaseSignOut(auth);
    window.localStorage.removeItem(PARTICIPANT_TYPE_KEY);
    setUser(null);
    setParticipantType(null);
    setHasTeam(false);
    setTeamData(null);
  };

  // Fetch team status and verify user exists in backend DB.
  // ALWAYS throws on any failure — timeout, network error, or 4xx.
  // A user must NEVER be set without an explicit backend 200 confirmation.
  const fetchTeamStatus = async (signal?: AbortSignal): Promise<boolean> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    // Allow an externally provided signal to also cancel the request
    signal?.addEventListener("abort", () => controller.abort());

    try {
      const res = await api.getTeam(controller.signal);

      if (res.status === 404 || res.status === 401 || res.status === 403) {
        throw new Error("USER_NOT_REGISTERED");
      }

      if (res.status === 200 && res.data && res.data.id) {
        setHasTeam(true);
        setTeamData(res.data);
        return true;
      }

      // 204 = user is registered but not on any team yet
      if (res.status === 204) {
        setHasTeam(false);
        setTeamData(null);
        return false;
      }

      // Any other response (500, 0 = network failure, unexpected shape)
      // is treated as the backend being unavailable.
      throw new Error("BACKEND_UNAVAILABLE");
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "USER_NOT_REGISTERED") {
        throw err; // propagate as-is
      }
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error("BACKEND_UNAVAILABLE"); // timeout → same treatment
      }
      if (err instanceof Error && err.message === "BACKEND_UNAVAILABLE") {
        throw err; // propagate as-is
      }
      // Unknown network / JS error → treat as backend unavailable
      throw new Error("BACKEND_UNAVAILABLE");
    } finally {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    return onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser) {
        const savedType = window.localStorage.getItem(PARTICIPANT_TYPE_KEY);

        setParticipantType(
          savedType === "vit" || savedType === "external" ? savedType : null
        );

        // On public pages (landing, login) skip the backend call entirely.
        // Team data will be fetched lazily when the user navigates to a
        // protected page or explicitly signs in.
        const isPublicPage = PUBLIC_PATHS.has(window.location.pathname);
        if (isPublicPage) {
          setUser(nextUser);
          setLoading(false);
          return;
        }

        try {
          await fetchTeamStatus();
          setUser(nextUser);
        } catch (err) {
          // ANY fetchTeamStatus failure (user not registered OR backend down)
          // means the session is invalid — sign the user out silently.
          console.error("Backend did not confirm user on session restore:", err);
          await handleUnauthorized(auth);
        }
      } else {
        window.localStorage.removeItem(PARTICIPANT_TYPE_KEY);
        setUser(null);
        setParticipantType(null);
        setHasTeam(false);
        setTeamData(null);
      }

      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: isFirebaseConfigured,
      participantType,
      hasTeam,
      teamData,
      signInWithGoogle: async (selectedType) => {
        const auth = getFirebaseAuth();
        if (!auth) {
          throw new Error(
            "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local."
          );
        }

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: "select_account",
          ...(selectedType === "vit" ? { hd: "vitstudent.ac.in" } : {}),
        });

        const credential = await signInWithPopup(auth, provider);

        // 1. Verify VIT domain restriction
        if (
          selectedType === "vit" &&
          !credential.user.email?.toLowerCase().endsWith("@vitstudent.ac.in")
        ) {
          await handleUnauthorized(auth);
          throw new Error("VIT_EMAIL_REQUIRED");
        }

        // 2. Verify backend registration — this MUST succeed before the user
        //    is considered logged in. Any failure signs the user back out.
        try {
          await fetchTeamStatus();
        } catch (err) {
          await handleUnauthorized(auth);
          // Re-throw with a message the login page can display distinctly
          if (err instanceof Error && err.message === "BACKEND_UNAVAILABLE") {
            throw new Error("BACKEND_UNAVAILABLE");
          }
          throw new Error("USER_NOT_REGISTERED");
        }

        window.localStorage.setItem(PARTICIPANT_TYPE_KEY, selectedType);
        setParticipantType(selectedType);
        setUser(credential.user);

        return credential.user;
      },
      signOut: async () => {
        const auth = getFirebaseAuth();
        await handleUnauthorized(auth);
      },
      getIdToken: () => user?.getIdToken() ?? Promise.resolve(null),
      checkTeamStatus: fetchTeamStatus,
    }),
    [loading, participantType, user, hasTeam, teamData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
