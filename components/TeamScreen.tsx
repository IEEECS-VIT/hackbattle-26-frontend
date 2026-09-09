"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, GetTeamResponse } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

type Player = {
  id: number;
  filled: boolean;
  name: string;
  teamName: string;
};

function SlotButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        team-slot-btn
        flex
        h-full
        w-full
        items-center
        justify-between
        rounded-[5px]
        border-[2px]
        border-black
        bg-white
        pl-3
        pr-2
        shadow-[3px_3px_0_rgba(0,0,0,0.85)]
        transition-all
        hover:brightness-95
        active:translate-y-[1px]
        active:shadow-[2px_2px_0_rgba(0,0,0,0.85)]
      "
    >
      <span className="font-pixeboy whitespace-nowrap leading-none text-black">
        PLAYER {label}
      </span>

      <span
        className="
          ml-2
          grid
          h-7
          w-7
          shrink-0
          place-items-center
          rounded
          bg-black
          text-[18px]
          font-bold
          leading-none
          text-white
        "
      >
        +
      </span>
    </button>
  );
}

type TeamScreenProps = {
  mode?: "build" | "join";
  teamCode?: string | null;
  teamData?: GetTeamResponse | null;
};

export default function TeamScreen({
  mode = "build",
  teamCode = null,
  teamData = null,
}: TeamScreenProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const members = teamData?.members || [];
  const isLeader = teamData?.isLeader ?? false;
  const activeTeamCode = teamData?.code || teamCode;

  // Fill up 5 slots using dynamic backend data
  const players: Player[] = Array.from({ length: 5 }, (_, idx) => {
    const member = members[idx];
    return {
      id: idx + 1,
      filled: Boolean(member),
      name: member?.name || "",
      teamName: teamData?.name || "TEAM",
    };
  });

  const handleCopyTeamCode = async () => {
    if (!activeTeamCode) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
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
        showToast("YOU ARE NOT IN A TEAM", "error");
      } else if (status === 404) {
        showToast("TEAM NOT FOUND", "error");
      } else {
        showToast(data?.message || "Failed to leave team.", "error");
      }
    } catch {
      showToast("Failed to leave team.", "error");
    }
  };

  const handleSubmissionClick = (e: React.MouseEvent) => {
    const size = members.length;
    if (size < 2 || size > 5) {
      e.preventDefault();
      showToast("TEAM MUST HAVE 2 TO 5 MEMBERS TO SUBMIT A PROJECT", "error");
    }
  };

  const displayHeading = mode === "join" ? "JOIN TEAM" : "BUILD YOUR TEAM";

  return (
    <div className="team-page-outer relative w-full overflow-hidden">
      {/* FULL PAGE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/team/team.svg"
          alt="Team background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "center center",
          }}
        />
      </div>

      {/* BACKGROUND OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/75" />
      <div
        className="
          flex relative 
          z-10
          h-[100dvh]
          w-full
          flex-col
          items-center
          px-2
          pb-0
          pt-2
          sm:px-4
          sm:pb-0
          sm:pt-2
          md:px-6
          md:pb-0
          md:pt-3
          "
      >
        {/* NAVIGATION */}
      <div
        className="
          team-nav-row
          w-full
          max-w-[1400px]
          shrink-0
          pb-0
          sm:pb-3
          md:pb-3
        "
      >
        <div className="flex items-center gap-2 sm:gap-3">

    <Link
      href="/login"
      className="
        team-nav-btn
        inline-flex
        items-center
        rounded-[5px]
        border-2
        border-black
        bg-white
        px-2.5 py-1
        text-sm
        sm:px-4 sm:py-1.5 sm:text-base
        font-pixeboy
        leading-none
        text-black
        shadow-[3px_3px_0_rgba(0,0,0,0.85)]
        transition-all
        hover:brightness-95
        active:translate-y-[1px]
        active:shadow-[2px_2px_0_rgba(0,0,0,0.85)]
      "
    >
      BACK
    </Link>

    {isLeader && (
      <Link
        href="/submission"
        onClick={handleSubmissionClick}
        className="
          team-nav-btn
          inline-flex
          items-center
          rounded-[5px]
          border-2
          border-black
          bg-yellow-400
          px-2.5 py-1
          text-sm
          sm:px-4 sm:py-1.5 sm:text-base
          font-pixeboy
          leading-none
          text-black
          shadow-[3px_3px_0_rgba(0,0,0,0.85)]
          transition-all
          hover:brightness-95
          active:translate-y-[1px]
          active:shadow-[2px_2px_0_rgba(0,0,0,0.85)]
        "
      >
        <span className="sm:hidden">SUBMIT</span>
        <span className="hidden sm:inline">SUBMIT PROJECT</span>
      </Link>
    )}

    <div className="ml-auto">
      <button
        type="button"
        onClick={handleLeaveTeam}
        className="
          team-nav-btn
          inline-flex
          items-center
          rounded-[5px]
          border-2
          border-black
          bg-red-800
          px-2.5 py-1
          text-sm
          sm:px-4 sm:py-1.5 sm:text-base
          font-pixeboy
          leading-none
          text-white
          shadow-[3px_3px_0_rgba(0,0,0,0.85)]
          transition-all
          hover:brightness-95
          active:translate-y-[1px]
          active:shadow-[2px_2px_0_rgba(0,0,0,0.85)]
        "
      >
        LEAVE TEAM
      </button>
    </div>

  </div>
</div>

        {/* MAIN GAME AREA */}
        <div
          className="
            team-game-container
            relative
            flex
            w-full
            max-w-[1400px]
            flex-1
            flex-col
            overflow-hidden
          "
        >
          {mode === "build" && (
            <div
              className="
                team-token
                absolute
                right-2
                top-10
                z-50
                pointer-events-auto
                sm:right-4
                sm:top-3
                md:right-5
                md:top-4
              "
            >
              <div
                className="
                  team-code-box
                  flex
                  items-center
                  gap-2.5
                  rounded-[5px]
                  border-2
                  border-black
                  bg-white/95
                  px-4
                  py-2
                  shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                "
              >
                {/* TEAM CODE */}
                <span
                  className="
                    team-code-text
                    font-pixeboy
                    leading-none
                    tracking-wider
                    text-black
                  "
                  style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}
                >
                  {activeTeamCode ? activeTeamCode : <span className="opacity-50">----</span>}
                </span>

                {/* COPY BUTTON */}
                <button
                  type="button"
                  aria-label="Copy team code"
                  onClick={handleCopyTeamCode}
                  disabled={!activeTeamCode}
                  className="
                    grid
                    h-7
                    w-7
                    shrink-0
                    cursor-pointer
                    place-items-center
                    rounded
                    bg-black
                    text-white
                    transition-colors
                    hover:bg-black/80
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {/* HEADING */}
          <div
            className="
              relative
              z-30
              flex
              shrink-0
              justify-center
              px-2
              pt-0
            "
                    >
            <h1
              className="
                  font-pixeboy
                  select-none
                  text-center
                  tracking-wider
                  text-white
                  pt-1
                "
                style={{
                fontSize: "clamp(55px, 12vh, 140px)",
                lineHeight: "0.9", 
                textShadow:
                  "4px 4px 0 #0a2a3a, -2px -2px 0 #0a2a3a, 2px -2px 0 #0a2a3a, -2px 2px 0 #0a2a3a, 0 5px 0 rgba(0,0,0,0.6)",
                letterSpacing: "0.05em",
              }}
            >
              {displayHeading}
            </h1>
          </div>

          {/* MAIN STAGE */}
          <div
            className="
              team-stage
              relative
              z-10
              mx-2
              mt-1
              mb-0
              pb-0
              flex-1
              overflow-hidden
              sm:mx-4
              sm:mt-2
              md:mx-6
              "
          >
            {/* CHARACTERS  */}
            <div
              className="
                team-characters
                pointer-events-none
                absolute
                left-1/2
                bottom-0
                z-10
                -translate-x-1/2
                select-none
              "
            >
              <Image
                src="/team/team-characters.svg"
                alt="Team characters"
                width={1700}
                height={900}
                priority
                className="
                  h-auto
                  w-full
                  object-contain
                  drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]
                "
              />
            </div>

            {/* PLAYER SLOTS 1 TO 5 */}
            {players.map((player) => (
              <div
                key={player.id}
                className={`team-slot team-slot-${player.id} absolute z-20`}
              >
                {player.filled ? (
                  <div
                    className="
                      team-slot-filled
                      flex
                      h-full
                      w-full
                      flex-col
                      justify-center
                      rounded-[5px]
                      border-[2px]
                      border-black
                      bg-white
                      px-2.5
                      py-1.5
                      shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                    "
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate pr-1 font-pixeboy leading-none text-black">
                        {player.name}
                      </span>
                    </div>

                    <span className="mt-0.5 truncate font-pixeboy leading-none text-[#c0392b]">
                      {player.id === 1
                        ? `${player.teamName} (LEADER)`
                        : player.teamName}
                    </span>
                  </div>
                ) : (
                  <SlotButton label={String(player.id)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        .team-page-outer {
          height: 100dvh;
          overflow: hidden;
        }

        .team-game-container {
          border: none;
        }

        .team-nav-row {
          height: auto;
        }

        .team-nav-btn {
          font-size: clamp(14px, 1.6vw, 22px);
          white-space: nowrap;
        }

        .team-stage {
          min-height: 0;
        }

        .team-slot {
          width: min(24%, 230px);
          height: clamp(38px, 6.5vh, 56px);
          max-width: 230px;
        }

        @media (max-width: 484px) {
          .team-slot span:last-child {
            width: 30px;
            height: 36px;
            font-size: 13px;
          }
        }

        .team-slot-btn span:first-child,
        .team-slot-filled span {
          font-size: clamp(12px, 1.5vw, 17px);
        }
        @media (max-width: 484px) {
          .team-slot-btn span:last-child {
            width: 20px;
            height: 30px;
            font-size: 13px;
          }
        }
        @media (max-width: 419px) {
          .team-slot-btn span:last-child {
            display: none;
          }
        }

        /* CENTERED BOTTOM CHARACTERS - INCREASED SIZE */
       /* CENTERED BOTTOM CHARACTERS - FIT TO BOTTOM WITHOUT CROPPING */
    .team-characters {
      width: 82%;
      max-width: 900px;
      max-height: 75vh; /* Prevents overflow/cropping on short viewports */
      bottom: 0 !important;
      margin-bottom: 0 !important;
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .team-characters img {
      width: 100%;
      height: 100%;
      max-height: 75vh;
      object-fit: contain;
      object-position: bottom center; /* Ensures base aligns flat with bottom */
      display: block;
    }

@media (min-width: 1024px) {
  .team-characters {
    width: 84%;
    max-width: 950px;
  }
}

@media (min-width: 1280px) {
  .team-characters {
    width: 85%;
    max-width: 1000px;
  }
}

@media (min-width: 1600px) {
  .team-characters {
    width: 88%;
    max-width: 1080px;
  }
}

@media (max-width: 640px) {
  .team-characters {
    width: 90%;
    max-width: none;
    max-height: 65vh;
  }
}

/* BASE / TABLET SLOT POSITIONS */
        .team-slot-1 {
          left: 3%;
          top: 25%;
        }

        .team-slot-2 {
          left: 4%;
          bottom: 8%;
        }

       .team-slot-3 {
        left: 62%;
        top: 20%;
      }
        .team-slot-4 {
          right: 4%;
          bottom: 8%;
          left: auto;
        }

        .team-slot-5 {
          right: 3%;
          top: 25%;
          left: auto;
        }

        @media (min-width: 1280px) {
        
          .team-slot {
            width: min(22%, 240px);
          }

          .team-slot-1 {
            left: 5%;
            top: 30%;
          }

          .team-slot-2 {
            left: 6%;
            bottom: 5%;
          }

         .team-slot-3 {
            left: 55%;
            top: 4%;
          }

          .team-slot-4 {
            right: 6%;
            bottom: 5%;
          }

          .team-slot-5 {
            right: 5%;
            top: 30%;
          }
        }


        @media (min-width: 940px) and (max-width: 1279px) {
          .team-slot {
            width: 24%;
            height: clamp(34px, 6vh, 46px);
          }

          .team-slot-1 {
            left: 2%;
            top: 30%;
          }

          .team-slot-2 {
            left: 4%;
            bottom: 22%;
          }

          .team-slot-3 {
            left: 50%;
            top: 15%;
            transform: translateX(-50%);
          }

          .team-slot-4 {
            right: 4%;
            bottom: 22%;
            left: auto;
          }

          .team-slot-5 {
            right: 1%;
            top: 25%;
            left: auto;
          }
        }

       @media (min-width: 540px) and (max-width: 939px) {
          .team-slot {
            width: 24%;
            height: clamp(34px, 6vh, 46px);
          }

          .team-slot-1 {
            left: 2%;
            top: 10%;
          }

          .team-slot-2 {
            left: 2%;
            bottom: 47%;
          }

          .team-slot-3 {
            left: 50%;
            top: 25%;
            transform: translateX(-50%);
          }

          .team-slot-4 {
            right: 2%;
            bottom: 47%;
            left: auto;
          }

          .team-slot-5 {
            right: 2%;
            top: 10%;
          }
        }

        @media (max-width: 539px) {
        
          .team-slot {
            width: min(22%, 240px);
          }

          .team-slot-1 {
            left: 5%;
            top: 10%;
          }

          .team-slot-2 {
            left: 6%;
            bottom: 40%;
          }

         .team-slot-3 {
            left: 42%;
            top: 30%;
          }

          .team-slot-4 {
            right: 6%;
            bottom: 40%;
          }

          .team-slot-5 {
            right: 5%;
            top: 10%;
          }
        }

        @media (max-width: 1150px) {
          .team-code-box {
            width: 44px;
            height: 44px;
            padding: 0;
            justify-content: center;
            gap: 0;
            overflow: hidden;
            transition: width 0.15s ease, padding 0.15s ease, gap 0.15s ease;
          }

          .team-code-text {
            position: absolute;
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transform: translateX(8px);
            transition:
              opacity 0.15s ease,
              transform 0.15s ease;
          }

          .team-code-box:hover {
            width: auto;
            padding: 8px 16px;
            gap: 10px;
            overflow: visible;
          }

          .team-code-box:hover .team-code-text {
            position: static;
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 920px) and (min-width: 560px) {
        .team-token {
          top: 12%;
        }
      }
        @media (max-width: 400px) {
        .team-code-box {
          bottom: 2%;
        }
        .team-token {
        bottom: 2%;
        top: auto;}
      }

      `}</style>
    </div>
  );
}