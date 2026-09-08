"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TeamScreen from "@/components/TeamScreen";
import { api } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

export default function JoinTeamPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [teamCode, setTeamCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  // Check whether the logged-in user is already in a team
  useEffect(() => {
    const checkExistingTeam = async () => {
      try {
        const { data, status } = await api.getTeam();

        console.log("Existing team check:", {
          status,
          data,
        });

        // Already in a team -> Redirect to /team
        if (status === 200 && data) {
          router.replace("/team");
          return;
        }

        // User is not in a team -> Prompt join popup
        if (status === 204 || status === 403 || status === 404) {
          setShowPopup(true);
          return;
        }

        // Not authenticated
        if (status === 401) {
          router.replace("/login");
          return;
        }
      } catch (err) {
        console.error("Unable to determine team status:", err);
      }
    };

    checkExistingTeam();
  }, [router]);

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
        // Successfully joined
        showToast("Joined team successfully!", "success");
        setShowPopup(false);
        router.replace("/team");
        return;
      }

      showToast(
        "Failed to join team. Check the team code and try again.",
        "error"
      );

      if (status === 201) {
        setError("YOU ARE ALREADY IN A TEAM");
        return;
      }

      if (status === 204 || status === 400 || status === 404) {
        setError("INVALID TEAM CODE");
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

      setError(data?.message || "UNABLE TO JOIN TEAM");
    } catch (err) {
      console.error("Join team error:", err);
      setError("UNABLE TO CONNECT TO SERVER");
      showToast(
        "Failed to join team. Check the team code and try again.",
        "error"
      );
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
