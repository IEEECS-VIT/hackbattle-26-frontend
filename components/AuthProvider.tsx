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
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export type ParticipantType = "vit" | "external";

const PARTICIPANT_TYPE_KEY = "hackbattle-participant-type";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  participantType: ParticipantType | null;
  signInWithGoogle: (participantType: ParticipantType) => Promise<User>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [participantType, setParticipantType] = useState<ParticipantType | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        const savedType = window.localStorage.getItem(PARTICIPANT_TYPE_KEY);
        setParticipantType(savedType === "vit" || savedType === "external" ? savedType : null);
      } else {
        window.localStorage.removeItem(PARTICIPANT_TYPE_KEY);
        setParticipantType(null);
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
      signInWithGoogle: async (selectedType) => {
        const auth = getFirebaseAuth();
        if (!auth) {
          throw new Error(
            "Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local.",
          );
        }

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
          prompt: "select_account",
          ...(selectedType === "vit" ? { hd: "vitstudent.ac.in" } : {}),
        });
        const credential = await signInWithPopup(auth, provider);

        if (
          selectedType === "vit" &&
          !credential.user.email?.toLowerCase().endsWith("@vitstudent.ac.in")
        ) {
          await firebaseSignOut(auth);
          throw new Error("VIT_EMAIL_REQUIRED");
        }

        window.localStorage.setItem(PARTICIPANT_TYPE_KEY, selectedType);
        setParticipantType(selectedType);
        return credential.user;
      },
      signOut: async () => {
        const auth = getFirebaseAuth();
        if (auth) await firebaseSignOut(auth);
        window.localStorage.removeItem(PARTICIPANT_TYPE_KEY);
        setParticipantType(null);
      },
      getIdToken: () => user?.getIdToken() ?? Promise.resolve(null),
    }),
    [loading, participantType, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
