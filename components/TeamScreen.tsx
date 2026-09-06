"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, GetTeamResponse } from "@/lib/api";

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
  const [copied, setCopied] = useState(false);

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
      await navigator.clipboard.writeText(activeTeamCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleLeaveTeam = async () => {
    const { data, status } = await api.leaveTeam();

    if (status === 200) {
      router.push("/join-team");
      return;
    }

    if (status === 401) {
      alert("PLEASE LOG IN FIRST");
    } else if (status === 403) {
      alert("YOU ARE NOT IN A TEAM");
    } else if (status === 404) {
      alert("TEAM NOT FOUND");
    } else {
      alert(data?.message || "UNABLE TO LEAVE TEAM");
    }
  };

  const handleSubmissionClick = (e: React.MouseEvent) => {
    const size = members.length;
    if (size < 2 || size > 5) {
      e.preventDefault();
      alert("TEAM MUST HAVE 2 TO 5 MEMBERS TO SUBMIT A PROJECT");
    }
  };

  const displayHeading = mode === "join" ? "JOIN TEAM" : "BUILD YOUR TEAM";

  return (
    <div className="team-page-outer w-full overflow-hidden bg-[#0a0d1c]">
      <div
        className="
          flex
          h-[100dvh]
          w-full
          flex-col
          items-center
          overflow-hidden
          px-2
          pb-2
          pt-[76px]
          sm:px-4
          sm:pb-3
          sm:pt-[84px]
          md:px-6
          md:pb-4
          md:pt-[96px]
        "
      >
        {/* NAVIGATION */}

        <div
          className="
            team-nav-row
            w-full
            max-w-[1400px]
            shrink-0
            pb-2
            sm:pb-3
            md:pb-3
          "
        >
          <div className="flex items-center gap-3">
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
                px-4
                py-1.5
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
                  px-4
                  py-1.5
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
                SUBMIT PROJECT
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
                  bg-white
                  px-4
                  py-1.5
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
            rounded-xl
            bg-black
          "
        >
          {/* BACKGROUND */}

          <div className="absolute inset-0 z-0">
            <Image
              src="/team/team-background.png"
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

          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

          {/* TEAM CODE */}

          {mode === "build" && (
            <div
              className="
                team-token
                absolute
                right-2
                top-2
                z-30
                sm:right-4
                sm:top-3
                md:right-5
                md:top-4
              "
            >
              <div
                className="
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
                <span
                  className="
                    font-pixeboy
                    leading-none
                    tracking-wider
                    text-black
                  "
                  style={{ fontSize: "clamp(14px, 1.6vw, 22px)" }}
                >
                  {activeTeamCode ? (
                    activeTeamCode
                  ) : (
                    <span className="opacity-50">----</span>
                  )}
                </span>

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
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>

                {copied && (
                  <span
                    className="
                      font-pixeboy
                      leading-none
                      text-[#2e7d32]
                    "
                    style={{ fontSize: "clamp(10px, 1vw, 14px)" }}
                  >
                    COPIED!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* HEADING */}

          <div
            className="
              relative
              z-20
              flex
              shrink-0
              justify-center
              px-2
              pt-2
              sm:pt-3
              md:pt-4
            "
          >
            <h1
              className="
                font-pixeboy
                select-none
                text-center
                leading-none
                tracking-wider
                text-white
              "
              style={{
                fontSize: "clamp(30px, 6vh, 78px)",
                textShadow:
                  "3px 3px 0 #0a2a3a, -1px -1px 0 #0a2a3a, 1px -1px 0 #0a2a3a, -1px 1px 0 #0a2a3a, 0 4px 0 rgba(0,0,0,0.6)",
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
              mb-2
              flex-1
              overflow-hidden
              sm:mx-4
              sm:mt-2
              sm:mb-3
              md:mx-6
              md:mt-2
              md:mb-4
            "
          >
            {/* CHARACTERS */}

            <div
              className="
                team-characters
                pointer-events-none
                absolute
                left-1/2
                z-10
                -translate-x-1/2
                select-none
              "
            >
              <Image
                src="/team/team-characters.png"
                alt="Team characters"
                width={1200}
                height={600}
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
          width: min(26%, 220px);
          height: clamp(38px, 6.5vh, 56px);
          max-width: 220px;
        }

        .team-slot-btn span:first-child,
        .team-slot-filled span {
          font-size: clamp(12px, 1.5vw, 17px);
        }

        .team-characters {
          width: 72%;
          max-width: 780px;
          bottom: 1%;
          display: flex;
          justify-content: center;
        }

        .team-characters img {
          width: 100%;
          height: auto;
          max-width: 780px;
          object-fit: contain;
        }

        .team-slot-1 {
          left: 5%;
          top: 31%;
        }

        .team-slot-2 {
          left: 6%;
          bottom: 5%;
        }

        .team-slot-3 {
          right: 23%;
          top: 8%;
          left: auto;
        }

        .team-slot-4 {
          left: 44%;
          bottom: 5%;
        }

        .team-slot-5 {
          right: 5%;
          top: 31%;
        }

        @media (min-width: 1024px) {
          .team-characters {
            width: 74%;
            max-width: 800px;
            bottom: 1%;
          }

          .team-slot-1 {
            left: 7%;
            top: 32%;
          }

          .team-slot-2 {
            left: 8%;
            bottom: 5%;
          }

          .team-slot-3 {
            right: 24%;
            top: 9%;
          }

          .team-slot-4 {
            left: 43%;
            bottom: 5%;
          }

          .team-slot-5 {
            right: 7%;
            top: 32%;
          }
        }

        @media (min-width: 1280px) {
          .team-characters {
            width: 78%;
            max-width: 860px;
            bottom: 1%;
          }

          .team-slot {
            width: min(24%, 230px);
          }

          .team-slot-1 {
            left: 8%;
            top: 33%;
          }

          .team-slot-2 {
            left: 10%;
            bottom: 5%;
          }

          .team-slot-3 {
            right: 25%;
            top: 10%;
          }

          .team-slot-4 {
            left: 42%;
            bottom: 5%;
          }

          .team-slot-5 {
            right: 8%;
            top: 33%;
          }
        }

        @media (min-width: 1600px) {
          .team-characters {
            width: 80%;
            max-width: 890px;
            bottom: 1%;
          }
        }

        @media (max-width: 640px) {
          .team-characters {
            width: 72%;
            max-width: none;
            bottom: 2%;
          }

          .team-characters img {
            max-width: none;
          }

          .team-slot {
            width: 35%;
            height: clamp(34px, 6vh, 46px);
          }

          .team-slot-1 {
            left: 2%;
            top: 23%;
          }

          .team-slot-2 {
            left: 2%;
            bottom: 19%;
          }

          .team-slot-3 {
            right: 20%;
            top: 7%;
          }

          .team-slot-4 {
            left: 39%;
            bottom: 15%;
          }

          .team-slot-5 {
            right: 2%;
            top: 27%;
          }
        }
      `}</style>
    </div>
  );
}
