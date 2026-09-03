"use client";

import { FirebaseError } from "firebase/app";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  type ParticipantType,
  useAuth,
} from "@/components/AuthProvider";

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
  const {
    configured,
    loading,
    participantType,
    signInWithGoogle,
    signOut,
    user,
  } = useAuth();
  const [selectedType, setSelectedType] = useState<ParticipantType | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!selectedType) return;
    setPending(true);
    setError("");
    try {
      await signInWithGoogle(selectedType);
    } catch (signInError) {
      setError(authErrorMessage(signInError));
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
    } catch (signOutError) {
      setError(authErrorMessage(signOutError));
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#082f3d] px-4 pb-4 pt-20 text-white sm:px-6 md:pb-10 md:pt-28">
      <Image
        src="/grass_wind_animation.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(4,36,51,.82)_0%,rgba(5,89,104,.62)_52%,rgba(4,42,48,.78)_100%)]" />
      <div className="retro-scanlines pointer-events-none absolute inset-0 -z-10 opacity-20" />
      <div className="pointer-events-none absolute left-[-5rem] top-[18%] h-64 w-64 rounded-full bg-[#5ed7df]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-[#ffdb37]/15 blur-3xl" />

      <section className="w-full max-w-4xl text-center">
        <h1 className="mx-auto w-full max-w-[9rem] sm:max-w-[17rem]">
          <Image
            src="/hackbattle-logo.png"
            alt="HackBattle"
            width={567}
            height={440}
            priority
            className="h-auto w-full drop-shadow-[0_12px_18px_rgba(0,22,31,.45)]"
          />
        </h1>
        {!user && (
          <p className="mt-2 font-sans text-sm text-white/75 sm:mt-4 sm:text-base">
            Choose your participant type to enter the arena.
          </p>
        )}

        <div className="mx-auto mt-4 rounded-[1.75rem] border border-white/30 bg-[#073f50]/70 p-4 shadow-[0_24px_70px_rgba(0,22,31,.45)] backdrop-blur-xl sm:mt-7 sm:p-6">
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
                  <p className="font-sans text-xs font-bold tracking-[0.22em] text-[#8ee9ee]">
                    {participantType === "vit" ? "VIT STUDENT" : "EXTERNAL PARTICIPANT"}
                  </p>
                  <h2
                    className="mt-2 break-words text-4xl leading-[0.95] text-white sm:text-5xl"
                    style={{ fontFamily: 'var(--font-pixeboy), "Pixeboy", monospace' }}
                  >
                    WELCOME, {user.displayName?.split(" ")[0]?.toUpperCase() || "TRAINER"}
                  </h2>
                  <p className="mt-1 truncate font-sans text-sm text-white/65">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={pending}
                className="font-pixeboy mt-7 w-full rounded-xl border-2 border-[#173c50] bg-[#ef5350] px-5 py-3 text-3xl text-white shadow-[0_5px_0_#173c50] transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60"
              >
                {pending ? "SIGNING OUT..." : "SIGN OUT"}
              </button>
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
                      className={`group relative min-h-36 rounded-2xl border-2 p-5 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdf50] sm:min-h-40 sm:p-6 ${
                        selected
                          ? "-translate-y-1 border-[#ffdf50] bg-[#0b6575] shadow-[0_6px_0_#d2a900,0_16px_35px_rgba(0,0,0,.25)]"
                          : "border-white/35 bg-[#062f3d]/70 hover:-translate-y-1 hover:border-[#8ee9ee] hover:bg-[#08495a]"
                      }`}
                    >
                      <span className="font-pixeboy block pr-8 text-4xl leading-none text-white sm:text-[2.7rem]">
                        {option.title}
                      </span>
                      <span className="mt-3 block max-w-xs font-sans text-xs leading-5 text-white/65 sm:text-sm">
                        {option.description}
                      </span>
                      <span className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border-2 text-sm font-bold transition ${selected ? "border-[#ffdf50] bg-[#ffdf50] text-[#153e53]" : "border-white/35 text-transparent"}`}>
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
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#173c50] bg-[#ffdf50] px-5 py-3.5 font-sans text-sm font-bold tracking-wide text-[#153e53] shadow-[0_5px_0_#173c50] transition hover:-translate-y-0.5 hover:bg-[#ffe873] active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 sm:text-base"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">
                  <GoogleIcon />
                </span>
                {pending ? "OPENING GOOGLE..." : "CONTINUE WITH GOOGLE"}
              </button>
            </>
          )}

          {!configured && (
            <p role="alert" className="mt-4 rounded-xl border border-[#ffdf50]/50 bg-[#3e3311]/70 px-4 py-3 font-sans text-sm text-[#fff0a8]">
              Firebase browser configuration is missing from this environment.
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 rounded-xl border border-[#ff8b87]/40 bg-[#501d26]/75 px-4 py-3 font-sans text-sm text-[#ffd1cf]">
              {error}
            </p>
          )}
        </div>

        <Link
          href="/"
          className="font-pixeboy mt-4 inline-flex items-center gap-2 text-2xl text-white/75 transition hover:text-[#ffdf50] sm:mt-6"
        >
          <span aria-hidden="true">←</span> BACK TO HOME
        </Link>
      </section>
    </main>
  );
}
