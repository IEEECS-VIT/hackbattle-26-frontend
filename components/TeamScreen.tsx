"use client";

import Image from "next/image";
import { LoadingLink as Link } from "@/components/NavigationLoader";
import { useLoadingRouter as useRouter } from "@/components/NavigationLoader";
import { api, GetTeamResponse } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";
import { useSimpleLoading } from "@/components/NavigationLoader";

type Player = {
  id: number;
  filled: boolean;
  name: string;
};

function SlotButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="
        team-slot-btn
        flex
        h-full
        w-full
        cursor-default
        items-center
        justify-center
        rounded-[5px]
        border-[2px]
        border-black
        bg-white
        px-2
        shadow-[3px_3px_0_rgba(0,0,0,0.85)]
      "
    >
      <span className="font-pixeboy whitespace-nowrap leading-none text-black text-[clamp(11px,3.2vw,16px)]">
        PLAYER {label}
      </span>
    </button>
  );
}

export type TeamScreenProps = {
  mode?: "build" | "join";
  teamCode?: string | null;
  teamData?: GetTeamResponse | null;
  // Kept so TeamPage doesn't throw a type error, but unused in the UI now
  onFetchTeam?: () => Promise<void>;
  isLoading?: boolean;
};

export default function TeamScreen({
  mode = "build",
  teamCode = null,
  teamData = null,
}: TeamScreenProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [leaving, setLeaving] = useState(false);
  useSimpleLoading(leaving);

  const members = teamData?.members || [];
  const isLeader = teamData?.isLeader ?? false;
  const activeTeamCode = teamData?.code || teamCode;

  const players: Player[] = Array.from({ length: 5 }, (_, idx) => {
    const member = members[idx];
    return {
      id: idx + 1,
      filled: Boolean(member),
      name: member?.name || "",
    };
  });

  const handleCopyTeamCode = async () => {
    if (!activeTeamCode) return;

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(activeTeamCode);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = activeTeamCode;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!successful) {
          throw new Error("execCommand copy failed");
        }
      }
      showToast("Team code copied!", "success");
    } catch (err) {
      console.error("Copy team code error:", err);
      showToast("Failed to copy team code.", "error");
    }
  };

  const handleLeaveTeam = async () => {
    if (leaving) return;
    setLeaving(true);
    try {
      const { data, status } = await api.leaveTeam();

      if (status === 200) {
        showToast("You left the team.", "success");
        router.push("/dashboard");
        return;
      }

      if (status === 401) {
        showToast("PLEASE LOG IN FIRST", "error");
      } else if (status === 403) {
        showToast("YOUR TEAM HAS ALREADY SUBMITTED, YOU CANNOT LEAVE", "error");
      } else if (status === 404) {
        showToast("TEAM NOT FOUND", "error");
      } else {
        showToast(data?.message || "Failed to leave team.", "error");
      }
    } catch {
      showToast("Failed to leave team.", "error");
    } finally {
      setLeaving(false);
    }
  };

  const handleSubmissionClick = (e: React.MouseEvent) => {
    const size = members.length;
    if (size < 2 || size > 5) {
      e.preventDefault();
      showToast("TEAM MUST HAVE 2 TO 5 MEMBERS TO SUBMIT A PROJECT", "error");
    }
  };

  const displayHeading = teamData?.name || "MY TEAM";

  // Base class to ensure uniform button heights and padding across the header
  const navBtnBase = `
    inline-flex h-8 sm:h-10 items-center justify-center
    rounded-[5px] border-2 border-black
    px-3 sm:px-5
    text-sm sm:text-lg font-pixeboy leading-none
    shadow-[2px_2px_0_rgba(0,0,0,0.85)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.85)]
    transition-all hover:brightness-95 active:translate-y-[1px]
  `;

  let qualificationMessage: string | null = null;
  let isRejected = false;

  if (teamData?.isQualifiedForFinalRound === true) {
    qualificationMessage = "Congratulations, you have been qualified for the Final Round! All the best!";
  } else if (teamData?.isQualifiedForR3 === true) {
    qualificationMessage = "Congratulations, you have been qualified for the Round-3";
  } else if (teamData?.isQualifiedForFinalRound === false || teamData?.isQualifiedForR3 === false) {
    qualificationMessage = "We regret to inform you haven't been qualifed for the next round";
    isRejected = true;
  }

  return (
    <div className="team-page-outer relative w-full overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/team/team.svg"
          alt="Team background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/75" />

      <div className="flex relative z-10 h-[100dvh] w-full flex-col items-center px-3 pt-3 pb-2 sm:px-4 sm:pt-4 md:px-6">
        {/* NAVIGATION & HEADER TOP ROW */}
        <div className="w-full max-w-[1400px] shrink-0 pb-2 sm:pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={`${navBtnBase} bg-white text-black`}
              >
                BACK
              </Link>

              {/* 
{isLeader && (
  <Link
    href="/submission"
    onClick={handleSubmissionClick}
    className={`${navBtnBase} bg-yellow-400 text-black`}
  >
    SUBMISSION
  </Link>
)} 
*/}
            </div>

            <div className="flex items-center gap-2">
              {/* TEAM CODE */}
              {mode === "build" && (
                <div className="flex h-8 sm:h-10 items-center gap-1.5 rounded-[5px] border-2 border-black bg-white/95 px-2 shadow-[2px_2px_0_rgba(0,0,0,0.85)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.85)]">
                  <span className="font-pixeboy text-sm sm:text-lg leading-none tracking-wider text-black pt-[2px]">
                    {activeTeamCode || "----"}
                  </span>
                  <button
                    type="button"
                    aria-label="Copy team code"
                    onClick={handleCopyTeamCode}
                    disabled={!activeTeamCode}
                    className="grid h-5 w-5 sm:h-6 sm:w-6 shrink-0 place-items-center rounded bg-black text-white hover:bg-black/80 disabled:opacity-40"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleLeaveTeam}
                className={`${navBtnBase} bg-red-800 text-white`}
              >
                LEAVE
              </button>
            </div>
          </div>
        </div>

        {/* CONTAINER */}
        <div className="team-game-container relative flex w-full max-w-[1400px] flex-1 flex-col overflow-hidden">
          {/* HEADING */}
          <div className="relative z-30 flex shrink-0 flex-col items-center justify-center px-2 pt-1">
            <h1
              className="
                font-pixeboy select-none text-center tracking-wider text-white uppercase
                truncate max-w-full px-2
              "
              style={{
                fontSize: "clamp(28px, 6.5vw, 90px)",
                lineHeight: "1",
                textShadow:
                  "2px 2px 0 #0a2a3a, -2px -2px 0 #0a2a3a, 2px -2px 0 #0a2a3a, -2px 2px 0 #0a2a3a, 0 4px 0 rgba(0,0,0,0.6)",
              }}
            >
              {displayHeading}
            </h1>
            {qualificationMessage && (
              <div
                className={`mt-2 font-pixeboy text-center text-[clamp(16px,4vw,32px)] ${
                  isRejected ? "text-red-400" : "text-green-400"
                } drop-shadow-[2px_2px_0_#000]`}
              >
                {qualificationMessage}
              </div>
            )}
          </div>

          {/* STAGE */}
          <div className="team-stage relative z-10 mx-1 mt-1 flex-1 overflow-hidden sm:mx-4">
            {/* CHARACTERS */}
            <div className="team-characters pointer-events-none absolute left-1/2 bottom-0 z-10 -translate-x-1/2 select-none">
              <Image
                src="/team/team-characters.svg"
                alt="Team characters"
                width={1700}
                height={900}
                priority
                className="h-auto w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* PLAYER SLOTS */}
            {players.map((player) => (
              <div
                key={player.id}
                className={`team-slot team-slot-${player.id} absolute z-20`}
              >
                {player.filled ? (
                  <div
                    className="
                      team-slot-filled
                      flex h-full w-full items-center justify-center gap-1
                      rounded-[5px] border-[2px] border-black bg-white px-2
                      shadow-[2px_2px_0_rgba(0,0,0,0.85)] sm:shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                    "
                  >
                    <span className="font-pixeboy leading-tight text-black truncate text-[clamp(10px,2.8vw,15px)]">
                      {player.name}
                    </span>

                    {player.id === 1 && (
                      <span className="font-pixeboy leading-tight text-[#c0392b] text-[clamp(9px,2.5vw,13px)] shrink-0">
                        (LEADER)
                      </span>
                    )}
                  </div>
                ) : (
                  <SlotButton label={String(player.id)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .team-page-outer {
          height: 100dvh;
          overflow: hidden;
        }

        .team-stage {
          min-height: 0;
        }

        .team-characters {
          width: 95%;
          max-width: 900px;
          max-height: 55vh;
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        .team-characters img {
          width: 100%;
          height: 100%;
          max-height: 55vh;
          object-fit: contain;
          object-position: bottom center;
        }

        /* MOBILE POSITIONING (<= 640px) */
        @media (max-width: 640px) {
          .team-slot {
            width: 38%;
            height: 38px;
          }

          .team-slot-1 { left: 2%; top: 4%; }
          .team-slot-2 { left: 2%; top: 48%; }
          .team-slot-3 { left: 31%; top: 26%; }
          .team-slot-4 { right: 2%; top: 48%; }
          .team-slot-5 { right: 2%; top: 4%; }
        }

        /* TABLET POSITIONING (641px - 1023px) */
        @media (min-width: 641px) and (max-width: 1023px) {
          .team-slot {
            width: 26%;
            height: 44px;
          }

          .team-slot-1 { left: 3%; top: 12%; }
          .team-slot-2 { left: 3%; bottom: 15%; }
          .team-slot-3 { left: 50%; top: 4%; transform: translateX(-50%); }
          .team-slot-4 { right: 3%; bottom: 15%; }
          .team-slot-5 { right: 3%; top: 12%; }
        }

        /* DESKTOP POSITIONING (>= 1024px) */
        @media (min-width: 1024px) {
          .team-slot {
            width: min(22%, 240px);
            height: 50px;
          }

          .team-characters {
            max-height: 70vh;
          }

          .team-characters img {
            max-height: 70vh;
          }

          .team-slot-1 { left: 5%; top: 25%; }
          .team-slot-2 { left: 6%; bottom: 8%; }
          .team-slot-3 { left: 50%; top: 5%; transform: translateX(-50%); }
          .team-slot-4 { right: 6%; bottom: 8%; }
          .team-slot-5 { right: 5%; top: 25%; }
        }
      `}</style>
    </div>
  );
}
