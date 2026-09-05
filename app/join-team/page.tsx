"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TeamScreen from "@/components/TeamScreen";
import { api } from "@/lib/api";

export default function JoinTeamPage() {
  const router = useRouter();

  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(true);

  const handleJoinTeam = async () => {
    const code = teamCode.trim().toUpperCase();

    if (!code) {
      setError("PLEASE ENTER A TEAM CODE");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, status } = await api.joinTeam(code);

      if (status === 200) {
        // Successfully joined the team
        setShowPopup(false);

        // Go to the team page
        router.push("/team");
        return;
      }

      if (status === 204) {
        setError("TEAM NOT FOUND");
        return;
      }

      if (status === 208) {
        setError("TEAM IS FULL");
        return;
      }

      if (status === 401) {
        setError("PLEASE LOG IN FIRST");
        return;
      }

      setError(
        data?.message || "UNABLE TO JOIN TEAM"
      );
    } catch (err) {
      console.error("Join team error:", err);
      setError("UNABLE TO CONNECT TO SERVER");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TeamScreen mode="join" />

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
                font-pixeboy
                text-[30px]
                leading-none
                text-red-500
                hover:scale-110
                bg-transparent
                border-0
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
              JOIN TEAM
            </h2>

            {/* Input */}
            <input
              type="text"
              value={teamCode}
              onChange={(e) => {
                setTeamCode(e.target.value.toUpperCase());
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleJoinTeam();
                }
              }}
              placeholder="ENTER TEAM CODE"
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

            {/* JOIN TEAM */}
            <button
              type="button"
              onClick={handleJoinTeam}
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
              {loading ? "JOINING..." : "JOIN TEAM"}
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