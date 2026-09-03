"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Player = {
  id: number;
  filled: boolean;
  name: string;
  teamName: string;
};

const INITIAL_PLAYERS: Player[] = [
  {
    id: 1,
    filled: false,
    name: "John Doe",
    teamName: "team name",
  },
  {
    id: 2,
    filled: false,
    name: "",
    teamName: "",
  },
  {
    id: 3,
    filled: false,
    name: "",
    teamName: "",
  },
  {
    id: 4,
    filled: false,
    name: "",
    teamName: "",
  },
  {
    id: 5,
    filled: false,
    name: "",
    teamName: "",
  },
];

function SlotButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
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
  // "build" => BUILD YOUR TEAM (used by /team)
  // "join"  => JOIN TEAM (used by /join-team)
  mode?: "build" | "join";
  // Optional team invite code (6-char) provided by the backend.
  // When null/undefined, the token UI renders an empty/"no data" state.
  teamCode?: string | null;
};

export default function TeamScreen({ mode = "build", teamCode = null }: TeamScreenProps) {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState("John Doe");
  const [editTeam, setEditTeam] = useState("team name");

  const [copied, setCopied] = useState(false);

  const player1Filled = players[0]?.filled;

  const handleCopyTeamCode = async () => {
    if (!teamCode) return;
    try {
      await navigator.clipboard.writeText(teamCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable - do nothing
    }
  };

  const handleSlotClick = (id: number) => {
    if (id === 1 && !player1Filled) {
      setPlayers((prev) =>
        prev.map((player) =>
          player.id === 1
            ? {
                ...player,
                filled: true,
                name: editName || "John Doe",
                teamName: editTeam || "team name",
              }
            : player
        )
      );
    }
  };

  const handleEditSave = () => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === 1
          ? {
              ...player,
              name: editName.trim() || "John Doe",
              teamName: editTeam.trim() || "team name",
            }
          : player
      )
    );

    setEditing(false);
  };

  const handleEditCancel = () => {
    const player1 = players.find((player) => player.id === 1);

    setEditName(player1?.name || "John Doe");
    setEditTeam(player1?.teamName || "team name");

    setEditing(false);
  };

  const displayHeading = mode === "join" ? "JOIN TEAM" : "BUILD YOUR TEAM";

  return (
    <div className="team-page-outer w-full overflow-hidden bg-[#0a0d1c]">
      {/* =====================================================
          FULL VIEWPORT
          ===================================================== */}

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
        {/* =====================================================
            NAVIGATION BUTTON ROW
            (sits below the fixed Navbar, above the game area)
            ===================================================== */}

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
          <div className="flex items-center">
            {/* BACK button - navigates to login */}
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

            {mode === "join" && (
              <div className="ml-auto">
                <button
                  type="button"
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
            )}
          </div>
        </div>

        {/* =====================================================
            MAIN GAME AREA
            ===================================================== */}

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
          {/* =================================================
              BACKGROUND
              ================================================= */}

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

          {/* Dark overlay */}

          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

          {/* =================================================
              TEAM INVITE CODE (top-right)
              - only on the BUILD YOUR TEAM (/team) page
              ================================================= */}

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
                  {teamCode ? (
                    teamCode
                  ) : (
                    <span className="opacity-50">----</span>
                  )}
                </span>

                <button
                  type="button"
                  aria-label="Copy team code"
                  onClick={handleCopyTeamCode}
                  disabled={!teamCode}
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

          {/* =================================================
              HEADING
              ================================================= */}

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

          {/* =================================================
              MAIN STAGE
              ================================================= */}

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
            {/* =================================================
                CHARACTER IMAGE
                ================================================= */}

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

            {/* =================================================
                PLAYER 1
                ================================================= */}

            <div className="team-slot team-slot-1 absolute z-20">
              {player1Filled ? (
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
                  {!editing ? (
                    <>
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate pr-1 font-pixeboy leading-none text-black">
                          {players[0].name}
                        </span>

                        <button
                          type="button"
                          aria-label="Edit player 1"
                          onClick={() => {
                            setEditName(players[0].name);
                            setEditTeam(players[0].teamName);
                            setEditing(true);
                          }}
                          className="
                            grid
                            h-6
                            w-6
                            shrink-0
                            place-items-center
                            rounded
                            transition-colors
                            hover:bg-black/10
                          "
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black"
                          >
                            <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 1 22l1.5-6.5L17 3z" />
                          </svg>
                        </button>
                      </div>

                      <span className="mt-0.5 truncate font-pixeboy leading-none text-[#c0392b]">
                        {players[0].teamName}
                      </span>
                    </>
                  ) : (
                    <div className="flex w-full flex-col gap-1">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Player name"
                        className="
                          w-full
                          rounded
                          border
                          border-black/30
                          bg-white
                          px-1.5
                          py-0.5
                          font-pixeboy
                          text-[12px]
                          text-black
                          outline-none
                          focus:border-black
                        "
                      />

                      <input
                        value={editTeam}
                        onChange={(e) => setEditTeam(e.target.value)}
                        placeholder="Team name"
                        className="
                          w-full
                          rounded
                          border
                          border-black/30
                          bg-white
                          px-1.5
                          py-0.5
                          font-pixeboy
                          text-[12px]
                          text-black
                          outline-none
                          focus:border-black
                        "
                      />

                      <div className="mt-0.5 flex gap-1">
                        <button
                          type="button"
                          onClick={handleEditSave}
                          className="
                            flex-1
                            rounded
                            border
                            border-black
                            bg-[#00bfff]
                            py-0.5
                            font-pixeboy
                            text-[10px]
                            text-white
                            hover:bg-[#009ad9]
                          "
                        >
                          SAVE
                        </button>

                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="
                            flex-1
                            rounded
                            border
                            border-black
                            bg-white
                            py-0.5
                            font-pixeboy
                            text-[10px]
                            text-black
                            hover:bg-black/5
                          "
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <SlotButton
                  label="1"
                  onClick={() => handleSlotClick(1)}
                />
              )}
            </div>

            {/* =================================================
                PLAYER 2
                ================================================= */}

            <div className="team-slot team-slot-2 absolute z-20">
              <SlotButton
                label="2"
                onClick={() => handleSlotClick(2)}
              />
            </div>

            {/* =================================================
                PLAYER 3
                ================================================= */}

            <div className="team-slot team-slot-3 absolute z-20">
              <SlotButton
                label="3"
                onClick={() => handleSlotClick(3)}
              />
            </div>

            {/* =================================================
                PLAYER 4
                ================================================= */}

            <div className="team-slot team-slot-4 absolute z-20">
              <SlotButton
                label="4"
                onClick={() => handleSlotClick(4)}
              />
            </div>

            {/* =================================================
                PLAYER 5
                ================================================= */}

            <div className="team-slot team-slot-5 absolute z-20">
              <SlotButton
                label="5"
                onClick={() => handleSlotClick(5)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESPONSIVE CSS
          ===================================================== */}

      <style>{`
        /* ================================================
           PAGE
           ================================================ */

        .team-page-outer {
          height: 100dvh;
          overflow: hidden;
        }

        /* No blue/cyan border */

        .team-game-container {
          border: none;
        }

        /* ================================================
           NAVIGATION BUTTONS
           ================================================ */

        .team-nav-row {
          height: auto;
        }

        .team-nav-btn {
          font-size: clamp(14px, 1.6vw, 22px);
          white-space: nowrap;
        }

        /* ================================================
           STAGE
           ================================================ */

        .team-stage {
          min-height: 0;
        }

        /* ================================================
           PLAYER SLOTS
           ================================================ */

        .team-slot {
          width: min(26%, 220px);
          height: clamp(38px, 6.5vh, 56px);
          max-width: 220px;
        }

        .team-slot-btn span:first-child,
        .team-slot-filled span {
          font-size: clamp(12px, 1.5vw, 17px);
        }

        /* ================================================
           CHARACTER IMAGE
           ================================================ */

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

        /* ================================================
           DESKTOP PLAYER POSITIONS
           ================================================ */

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

        /* ================================================
           LARGE DESKTOP
           ================================================ */

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

        /* ================================================
           VERY LARGE DESKTOP
           ================================================ */

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

        /* ================================================
           EXTRA LARGE SCREENS
           ================================================ */

        @media (min-width: 1600px) {
          .team-characters {
            width: 80%;
            max-width: 890px;
            bottom: 1%;
          }
        }

        /* ================================================
           MOBILE
           ================================================ */

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
