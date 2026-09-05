"use client";

import { useState } from "react";
import TeamScreen from "@/components/TeamScreen";
import { api } from "@/lib/api";

export default function TeamPage() {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const handleCreateTeam = async () => {
    const name = teamName.trim();

    if (!name) {
      setError("PLEASE ENTER A TEAM NAME");
      return;
    }

    setLoading(true);
    setError("");

    const { data, status } = await api.createTeam(name);

    if (status === 201 && data?.code) {
      setTeamCode(data.code);
      setShowPopup(false);
      setLoading(false);
      return;
    }

    if (status === 200) {
      setError("YOU ARE ALREADY IN A TEAM");
    } else if (status === 400) {
      setError("INVALID TEAM NAME");
    } else if (status === 401) {
      setError("PLEASE LOG IN FIRST");
    } else if (status === 404) {
      setError("USER PROFILE NOT FOUND");
    } else if (status === 409) {
      setError("THIS TEAM NAME IS ALREADY TAKEN");
    } else {
      setError(data?.message || "UNABLE TO CREATE TEAM");
    }

    setLoading(false);
  };

  return (
    <>
      <TeamScreen mode="build" teamCode={teamCode} />

      {showPopup && (
        <div
          className="
            fixed inset-0
            z-[999999]
            flex items-center justify-center
            bg-black/60
            px-4
          "
        >
          <div
            className="
              relative
              w-full max-w-[430px]
              rounded-[6px]
              border-[3px] border-black
              bg-[#073f50]
              p-7
              shadow-[6px_6px_0_rgba(0,0,0,0.85)]
            "
          >
            {/* X */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="
                absolute right-3 top-2
                cursor-pointer
                border-0
                bg-transparent
                font-pixeboy
                text-[30px]
                leading-none
                text-red-500
                hover:scale-110
              "
            >
              ×
            </button>

            {/* Heading */}
            <h2
              className="
                mb-6
                text-center
                font-pixeboy
                text-[38px]
                leading-none
                tracking-wider
                text-yellow-400
              "
            >
              BUILD TEAM
            </h2>

            {/* Team Name */}
            <input
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateTeam();
                }
              }}
              placeholder="ENTER TEAM NAME"
              disabled={loading}
              className="
                mb-4
                h-[50px]
                w-full
                rounded-[4px]
                border-[3px] border-black
                bg-white
                px-4
                font-pixeboy
                text-[18px]
                uppercase
                text-black
                outline-none
              "
            />

            {/* Error */}
            {error && (
              <p
                className="
                  mb-4
                  text-center
                  font-pixeboy
                  text-[17px]
                  text-red-400
                "
              >
                {error}
              </p>
            )}

            {/* CREATE TEAM */}
            <button
              type="button"
              onClick={handleCreateTeam}
              disabled={loading}
              className="
                mb-3
                flex h-[50px] w-full
                cursor-pointer
                items-center justify-center
                rounded-[4px]
                border-[3px] border-black
                bg-yellow-400
                font-pixeboy
                text-[21px]
                text-black
                shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                hover:brightness-95
                active:translate-y-[1px]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "CREATING..." : "CREATE TEAM"}
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="
                flex h-[50px] w-full
                cursor-pointer
                items-center justify-center
                rounded-[4px]
                border-[3px] border-black
                bg-gray-300
                font-pixeboy
                text-[21px]
                text-black
                shadow-[3px_3px_0_rgba(0,0,0,0.85)]
                hover:brightness-95
                active:translate-y-[1px]
              "
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}