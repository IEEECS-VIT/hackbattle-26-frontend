"use client";

import { useCallback, useEffect, useState } from "react";
import { useLoadingRouter as useRouter } from "@/components/NavigationLoader";
import TeamScreen from "@/components/TeamScreen";
import { api, GetTeamResponse } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";
import { useSimpleLoading } from "@/components/NavigationLoader";

export default function TeamPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [teamData, setTeamData] = useState<GetTeamResponse | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [fetching, setFetching] = useState(true);
  useSimpleLoading(fetching || creating);

  const fetchTeam = useCallback(async () => {
    try {
      const { data, status } = await api.getTeam();

      if (status === 200 && data) {
        setTeamData(data);
        setTeamCode(data.code);
        setShowPopup(false);
      } else if (status === 204 || status === 403 || status === 404) {
        setShowPopup(true);
      } else if (status === 401) {
        router.replace("/login");
      } else {
        showToast("Unable to load your team. Please refresh to try again.", "error");
      }
    } catch (err) {
      console.error("Failed to fetch team:", err);
      showToast("Unable to load your team. Please refresh to try again.", "error");
    } finally {
      setFetching(false);
    }
  }, [router, showToast]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchTeam();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchTeam]);

const handleCreateTeam = async () => {
  const name = teamName.trim();

  if (!name) {
    setError("PLEASE ENTER A TEAM NAME");
    return;
  }
  if (name.length > 100) {
  setError("TEAM NAME MUST BE 100 CHARACTERS OR LESS");
  return;
}

  setCreating(true);
  setError("");

  try {
    const { data, status } = await api.createTeam(name);

    // Successfully created team
    if ((status === 200 || status === 201) && data) {
      setTeamCode(data.code ?? null);
      setShowPopup(false);
      showToast("Team created successfully!", "success");

      // Fetch the complete team including members
      await fetchTeam();

      return;
    }

    showToast("Failed to create team.", "error");

    // User is already in a team
    if (status === 409) {
      router.replace("/team");
      return;
    }

    if (status === 208) {
      router.replace("/team");
      return;
    }

    if (status === 400) {
      setError("INVALID TEAM NAME");
      return;
    }

    if (status === 401) {
      router.replace("/login");
      return;
    }

    if (status === 404) {
      setError("USER PROFILE NOT FOUND");
      return;
    }

    setError(data?.message || "UNABLE TO CREATE TEAM");
  } catch (err) {
    console.error("Create team error:", err);
    setError("UNABLE TO CONNECT TO SERVER");
    showToast("Failed to create team.", "error");
  } finally {
    setCreating(false);
  }
};


  return (
    <>
      <TeamScreen mode="build" teamCode={teamCode} teamData={teamData} />

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
              onClick={() => router.replace("/dashboard")}           
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
              maxLength={100}
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
              disabled={creating}
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
              disabled={creating}
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
              {creating ? "CREATING..." : "CREATE TEAM"}
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => router.replace("/dashboard")}             
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
