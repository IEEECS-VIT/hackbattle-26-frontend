"use client";
import { useLoadingRouter as useRouter } from "@/components/NavigationLoader";

import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { LoadingLink as Link } from "@/components/NavigationLoader";
import { useState } from "react";
import {
  type ParticipantType,
  useAuth,
} from "@/components/AuthProvider";
import { useToast } from "@/components/ToastProvider";
import { useSimpleLoading } from "@/components/NavigationLoader";

const participantOptions: Array<{
  id: ParticipantType;
  title: string;
  description: string;
}> = [
  {
    id: "vit",
    title: "VIT STUDENT",
    description: "Use your @vitstudent.ac.in Google account",
  },
  {
    id: "external",
    title: "EXTERNAL PARTICIPANT",
    description: "Use your regular Google account",
  },
];

function authErrorMessage(error: unknown) {
  if (error instanceof Error && error.message === "VIT_EMAIL_REQUIRED") {
    return "Choose a @vitstudent.ac.in Google account for the VIT student portal.";
  }

  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : "Unable to sign in. Please try again.";
  }

  if (error.code === "auth/popup-closed-by-user") {
    return "The sign-in window was closed before login finished.";
  }
  if (error.code === "auth/popup-blocked") {
    return "Allow popups for this site, then try again.";
  }
  if (error.code === "auth/unauthorized-domain") {
    return "This website domain must be added to Firebase Authentication's authorized domains.";
  }

  return "Google sign-in failed. Please try again.";
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.91h5.38a4.6 4.6 0 0 1-2 3.02v2.54h3.24c1.9-1.75 2.98-4.33 2.98-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.42l-3.24-2.53c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.05v2.61A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.88A6.01 6.01 0 0 1 6.07 12c0-.65.11-1.28.32-1.88V7.51H3.05A10 10 0 0 0 2 12c0 1.61.39 3.14 1.05 4.49l3.34-2.61Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.79.5 3.82 1.49l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.95 5.51l3.34 2.61C7.18 7.75 9.39 5.99 12 5.99Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    configured,
    loading,
    participantType,
    signInWithGoogle,
    signOut,
    user,
    hasTeam,
  } = useAuth();
  const [selectedType, setSelectedType] = useState<ParticipantType | null>(null);
  const [pending, setPending] = useState(false);
  useSimpleLoading(pending);
  const [error, setError] = useState("");

  const handleGoToTeam = () => {
    if (hasTeam) {
      router.push("/team"); 
    } else {
      router.push("/dashboard"); 
    }
  };
  const handleSignIn = async () => {
    if (!selectedType) return;
    setPending(true);
    setError("");
    try {
      await signInWithGoogle(selectedType);
      showToast("Login successful!", "success");
    if (hasTeam) {
      router.push("/team");
    } else {
      router.push("/dashboard");
    }    } catch (signInError) {
      setError(authErrorMessage(signInError));
      showToast("Login failed. Please try again.", "error");
    } finally {
      setPending(false);
    }
  };

  const handleSignOut = async () => {
    setPending(true);
    setError("");
    try {
      await signOut();
      setSelectedType(null);
      showToast("Signed out successfully!", "success");
    } catch (signOutError) {
      setError(authErrorMessage(signOutError));
      showToast("Failed to sign out. Please try again.", "error");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="font-pixeboy relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#082f3d] px-4 pb-4 pt-20 text-white sm:px-6 md:pb-10 md:pt-28">
      <Image
        src="/sleep.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />
      <div
  className="pointer-events-none absolute inset-0 -z-20 bg-black/40"
  aria-hidden="true"
/>

      <div className="pointer-events-none absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full blur-5xl" />

      <section className="w-full max-w-4xl text-center">
        {!user && (
          <p className="mt-2 text-2xl leading-none text-white/75 sm:mt-4 sm:text-3xl">
            Choose your participant type to enter the arena.
          </p>
        )}

        <div className="mx-auto mt-4 rounded-2xl border-2 border-white/30 p-4 shadow-[0_24px_70px_rgba(0,22,31,.45)] sm:mt-7 sm:p-6">
          {loading ? (
            <div className="grid min-h-56 place-items-center" role="status">
              <p className="font-pixeboy animate-pulse text-4xl text-[#ffdf50]">
                CHECKING TRAINER PASS...
              </p>
            </div>
          ) : user ? (
            <div className="mx-auto max-w-xl py-4 sm:py-7">
              <div className="text-center">
                <div className="min-w-0"> 
                  <p className="text-2xl leading-none tracking-[0.12em] text-white">
                    {participantType === "vit"
                      ? "VIT STUDENT"
                      : "EXTERNAL PARTICIPANT"}
                  </p>
                  <h2 className="mt-2 break-words text-4xl leading-[0.95] text-white sm:text-5xl">
                    WELCOME,{" "}
                    {user.displayName?.split(" ")[0]?.toUpperCase() ||
                      "TRAINER"}
                  </h2>
                  <div className="mt-3">
                    <p
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif", textTransform: "lowercase" }}
                      className="lowercase max-w-full truncate text-lg font-semibold leading-none text-black sm:text-xl"
                    >
                      {user.email?.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3">
                {/* GO TO TEAM PAGE BUTTON */}
                <button
                  type="button"
                  onClick={handleGoToTeam}
                  className="w-full rounded-2xl border-2 border-[#173c50] bg-[#ffdf50] px-5 py-3 text-3xl text-[#153e53] shadow-[0_5px_0_#173c50] transition hover:bg-[#ffe873] active:translate-y-1 active:shadow-none"
                >
                  GO TO TEAM PAGE
                </button>

                {/* SIGN OUT BUTTON */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={pending}
                  className="w-full rounded-2xl border-2 border-[#173c50] bg-[#ef5350] px-5 py-3 text-3xl text-white shadow-[0_5px_0_#173c50] transition hover:brightness-105 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60"
                >
                  {pending ? "SIGNING OUT..." : "SIGN OUT"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                role="radiogroup"
                aria-label="Participant type"
                className="grid gap-3 text-left sm:grid-cols-2 sm:gap-4"
              >
                {participantOptions.map((option) => {
                  const selected = selectedType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setSelectedType(option.id);
                        setError("");
                      }}
                      className={`group relative h-full min-h-36 rounded-2xl border-2 p-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdf50] sm:min-h-40 sm:p-6 ${
                        selected
                          ? "border-[#ffdf50] bg-[#0b6575] shadow-[0_4px_0_#d2a900,0_12px_28px_rgba(0,0,0,.25)]"
                          : "border-white/35 bg-[#062f3d]/70 hover:border-[#8ee9ee] hover:bg-[#08495a]"
                      }`}
                    >
                      <span className="block pr-8 text-4xl leading-none text-white sm:text-[2.7rem]">
                        {option.title}
                      </span>
                      <span className="mt-3 block max-w-xs text-2xl leading-none text-white/65 sm:text-[1.7rem]">
                        {option.description}
                      </span>
                      <span
                        className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border-2 text-sm font-bold transition ${
                          selected
                            ? "border-[#ffdf50] bg-[#ffdf50] text-[#153e53]"
                            : "border-white/35 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={pending || !configured || !selectedType}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#173c50] bg-[#ffdf50] px-5 py-3.5 text-3xl leading-none tracking-wide text-[#153e53] shadow-[0_5px_0_#173c50] transition hover:bg-[#ffe873] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">
                  <GoogleIcon />
                </span>
                {pending ? "OPENING GOOGLE..." : "CONTINUE WITH GOOGLE"}
              </button>
            </>
          )}

          {!configured && (
            <p
              role="alert"
              className="mt-4 rounded-2xl border-2 border-[#ffdf50]/50 bg-[#3e3311]/70 px-4 py-3 text-2xl leading-none text-[#fff0a8]"
            >
              Firebase browser configuration is missing from this environment.
            </p>
          )}
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-2xl border-2 border-[#ff8b87]/40 bg-[#501d26]/75 px-4 py-3 text-2xl leading-none text-[#ffd1cf]"
            >
              {error}
            </p>
          )}
        </div>

        <Link
          href="/"
          className="font-pixeboy mt-4 inline-flex items-center gap-2 text-2xl text-black transition hover:text-[#ffdf50] sm:mt-6"
        >
          <span aria-hidden="true">←</span> BACK TO HOME
        </Link>
      </section>
    </main>
  );
}
