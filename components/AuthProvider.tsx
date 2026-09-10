// authprovider.tsx — finalized code

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

  const handleUnauthorized = async (auth = getFirebaseAuth()) => {
    if (auth) {
      await firebaseSignOut(auth);
    }

    window.localStorage.removeItem(PARTICIPANT_TYPE_KEY);

    setUser(null);
    setParticipantType(null);
    setHasTeam(false);
    setTeamData(null);
  };

  const fetchTeamStatus = async (): Promise<boolean> => {
    try {
      const res = await api.getTeam();

      if (res.status === 200 && res.data?.id) {
        setHasTeam(true);
        setTeamData(res.data);
        return true;
      }

      if (res.status === 401) {
        throw new Error("UNAUTHENTICATED");
      }

      if (res.status === 204 || res.status === 403 || res.status === 404) {
        setHasTeam(false);
        setTeamData(null);
        return false;
      }

      console.error("Unexpected team status response:", res.status);

      setHasTeam(false);
      setTeamData(null);
      return false;
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "UNAUTHENTICATED") {
        throw err;
      }

      console.error("Failed to check team status:", err);

      setHasTeam(false);
      setTeamData(null);
      return false;
    }
  };

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    return onAuthStateChanged(auth, async (nextUser) => {
      if (nextUser) {
        const savedType = window.localStorage.getItem(
          PARTICIPANT_TYPE_KEY
        );

        setParticipantType(
          savedType === "vit" || savedType === "external"
            ? savedType
            : null
        );

        try {
          await fetchTeamStatus();
          setUser(nextUser);
        } catch (err) {
          await handleUnauthorized(auth);
        }
      } else {
        await handleUnauthorized(auth);
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
          ...(selectedType === "vit"
            ? { hd: "vitstudent.ac.in" }
            : {}),
        });

        const credential = await signInWithPopup(auth, provider);

        if (
          selectedType === "vit" &&
          !credential.user.email
            ?.toLowerCase()
            .endsWith("@vitstudent.ac.in")
        ) {
          await handleUnauthorized(auth);
          throw new Error("VIT_EMAIL_REQUIRED");
        }

        try {
          await fetchTeamStatus();
        } catch (err) {
          await handleUnauthorized(auth);
          throw new Error("USER_NOT_REGISTERED");
        }

        window.localStorage.setItem(
          PARTICIPANT_TYPE_KEY,
          selectedType
        );

        setParticipantType(selectedType);
        setUser(credential.user);

        return credential.user;
      },

      signOut: async () => {
        const auth = getFirebaseAuth();
        await handleUnauthorized(auth);
      },

      getIdToken: () =>
        user?.getIdToken() ?? Promise.resolve(null),

      checkTeamStatus: fetchTeamStatus,
    }),
    [loading, participantType, user, hasTeam, teamData]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}