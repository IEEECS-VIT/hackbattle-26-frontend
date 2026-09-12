
"use client";

import { FormEvent, useState, useMemo, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";
import { useSimpleLoading } from "@/components/NavigationLoader";
import { LoadingLink as Link } from "@/components/NavigationLoader";

export const TRACK_SUBTRACKS_MAP: Record<string, string[]> = {
  "AI & AUTOMATION": [
    "Agentic Workflows",
    "Self-Learning & Adaptation",
    "Guardrails & Trust",
  ],
  "SYSTEMS & INFRASTRUCTURE": [
    "Cloud & Deployment Automation",
    "Decentralization & Protocols",
    "Core Systems & Data Engines",
  ],
  "DEVELOPER TOOLING": [
    "Terminal & Shell Tooling",
    "Codebase Intelligence & Navigation",
    "Workflow & Context Management",
  ],
  "CYBERSECURITY & PRIVACY": [
    "Local-First Privacy",
    "Defense & Sandboxing",
    "Surveillance Transparency",
  ],
  "OPEN INNOVATION": [],
};

const DRAFT_KEY = "hackbattle_submission_draft";

// Strict validation regex for GitHub URLs
const GITHUB_REGEX =
  /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/i;

export default function Submission() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [track, setTrack] = useState<string>("");
  const [selectedSubtracks, setSelectedSubtracks] = useState<string[]>([]);

  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [isSubtrackOpen, setIsSubtrackOpen] = useState(false);

  const [github, setGithub] = useState("");
  const [figma, setFigma] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isRejected, setIsRejected] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const subtrackRef = useRef<HTMLDivElement>(null);

  useSimpleLoading(submitting || fetching);
  const { showToast } = useToast();

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        trackRef.current &&
        !trackRef.current.contains(event.target as Node)
      ) {
        setIsTrackOpen(false);
      }
      if (
        subtrackRef.current &&
        !subtrackRef.current.contains(event.target as Node)
      ) {
        setIsSubtrackOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch submitted team data & hydrate draft backup
  useEffect(() => {
    let active = true;

    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setProjectName(parsed.projectName || "");
        setDescription(parsed.description || "");
        setTrack(parsed.track || "");
        setSelectedSubtracks(parsed.selectedSubtracks || []);
        setGithub(parsed.github || "");
        setFigma(parsed.figma || "");
        setOtherLinks(parsed.otherLinks || "");
      } catch (err) {
        console.error(
          "Failed to parse submission draft from local storage:",
          err
        );
      }
    }

    const fetchTeamData = async () => {
      try {
        const { data, status } = await api.getTeam();
        if (status === 200 && data && active) {
          if (data.name) setProjectName(data.name);
          if (data.project_desc) setDescription(data.project_desc);
          if (data.track) setTrack(data.track);

          if (data.subtrack) {
            const subtracksArr = Array.isArray(data.subtrack)
              ? data.subtrack
              : data.subtrack
                  .split(",")
                  .map((st: string) => st.trim())
                  .filter(Boolean);
            setSelectedSubtracks(subtracksArr);
          }

          if (data.github_link) setGithub(data.github_link);
          if (data.figma_link) setFigma(data.figma_link);
          if (data.other_files) setOtherLinks(data.other_files);

          if (
            data.isQualifiedForFinalRound === false ||
            data.isQualifiedForR3 === false
          ) {
            setIsRejected(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch team data:", err);
      } finally {
        if (active) setFetching(false);
      }
    };

    void fetchTeamData();

    return () => {
      active = false;
    };
  }, []);

  // Sync state to local storage backup
  useEffect(() => {
    const draftData = {
      projectName,
      description,
      track,
      selectedSubtracks,
      github,
      figma,
      otherLinks,
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
  }, [
    projectName,
    description,
    track,
    selectedSubtracks,
    github,
    figma,
    otherLinks,
  ]);

  // Dynamic subtracks for single track
  const availableSubtracks = useMemo(() => {
    return TRACK_SUBTRACKS_MAP[track] || [];
  }, [track]);

  // Handle single track selection
  const selectTrack = (trackName: string) => {
    if (isRejected) return;
    setSubmitted(false);
    setTrack(trackName);
    setSelectedSubtracks([]);
    setIsTrackOpen(false);
  };

  // Toggle Subtrack Selection
  const toggleSubtrack = (subtrackName: string) => {
    if (isRejected) return;
    setSubmitted(false);

    if (selectedSubtracks.includes(subtrackName)) {
      setSelectedSubtracks(
        selectedSubtracks.filter((st) => st !== subtrackName)
      );
    } else {
      setSelectedSubtracks([...selectedSubtracks, subtrackName]);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (!description.trim()) {
      showToast("Project Description is required.", "error");
      return;
    }

    if (!github.trim()) {
      showToast("GitHub Link is required.", "error");
      return;
    }

    // GitHub Link Validation
    if (!GITHUB_REGEX.test(github.trim())) {
      showToast(
        "Please enter a valid GitHub repository URL (e.g. https://github.com/username/repository).",
        "error"
      );
      return;
    }

    setSubmitting(true);
    try {
      setSubmitted(false);

      const { data, status } = await api.submitProject({
        project_desc: description.trim(),
        track: track.trim(),
        subtrack: selectedSubtracks.join(", "),
        github_link: github.trim(),
        figma_link: figma.trim(),
        other_files: otherLinks.trim(),
      });

      if (status === 200 || status === 201) {
        setSubmitted(true);
        showToast("Project submitted successfully!", "success");

        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({
            projectName,
            description,
            track,
            selectedSubtracks,
            github,
            figma,
            otherLinks,
          })
        );
        return;
      }

      if (status === 401) {
        showToast("Please log in before submitting.", "error");
        return;
      }

      throw new Error(data?.message || `Submission failed (${status})`);
    } catch (error) {
      console.error("Submission error:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Failed to submit project. Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="w-full min-h-screen bg-black p-0">
      <section className="relative mx-auto w-full min-h-screen bg-black">
        {/* video wrapper owns the clipping, not the whole page */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          >
            <source
              src="/submission/video/pikachu_motion.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="absolute inset-0 z-[1] bg-white/[0.06]" />
       

        {/* LOGOS */}
        <img
          src="/submission/HTML UI/IEEE_CS_logo.svg"
          alt="IEEE Computer Society"
          className="absolute left-[4%] top-[2.5%] z-20 h-auto w-[22%] max-w-[115px] md:left-[3%] md:top-[3%] md:w-[12%] md:max-w-[160px]"
        />

        <img
          src="/submission/HTML UI/HACKBATTLE.svg"
          alt="HackBattle"
          className="absolute right-[4%] top-[2.5%] z-20 h-auto w-[12%] max-w-[65px] md:right-[3%] md:top-[3%] md:w-[8%] md:max-w-[105px]"
        />

        <Link
          href="/team"
          className="absolute right-[5%] top-[17%] z-30 rounded-full bg-[#107050] px-6 py-3 font-pixeboy text-xl text-white shadow-[2px_2px_0_#000] transition hover:scale-105 hover:bg-[#138861] active:scale-95 max-md:left-1/2 max-md:right-auto max-md:top-[94%] max-md:-translate-x-1/2 max-md:px-5 max-md:py-2 max-md:text-base max-md:whitespace-nowrap"
        >
          GO TO TEAM PAGE
        </Link>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 min-h-screen w-full p-6 md:p-12"
        >
          {/* TITLE */}
          <h1 className="mt-12 font-pixeboy text-[clamp(3.5rem,8vw,6.5rem)] leading-none tracking-wide text-[#f4c51e] [-webkit-text-stroke:3px_#111] drop-shadow-[4px_4px_0_#111]">
            SUBMISSION
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* PROJECT NAME */}
              <div>
                <label
                  htmlFor="project-name"
                  className="block font-pixeboy text-xl text-black md:text-2xl"
                >
                  PROJECT NAME
                </label>
                <input
                  id="project-name"
                  value={projectName}
                  disabled={isRejected}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    setSubmitted(false);
                  }}
                  className="mt-1 h-12 w-full border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-lg text-black outline-none focus:bg-white md:border-[4px]"
                />
              </div>

              {/* PROJECT DESCRIPTION */}
              <div>
                <label
                  htmlFor="project-description"
                  className="block font-pixeboy text-xl text-black md:text-2xl"
                >
                  PROJECT DESCRIPTION
                </label>
                <textarea
                  id="project-description"
                  value={description}
                  disabled={isRejected}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setSubmitted(false);
                  }}
                  className="mt-1 h-32 w-full resize-none border-[3px] border-black bg-[#fbf7ee] p-4 font-pixeboy text-lg leading-tight text-black outline-none focus:bg-white md:border-[4px]"
                />
              </div>

              {/* TRACK DROPDOWN */}
              <div ref={trackRef} className="relative">
                <label className="block font-pixeboy text-xl text-black md:text-2xl">
                  TRACK (SELECT ONE)
                </label>
                <button
                  type="button"
                  disabled={isRejected}
                  onClick={() => setIsTrackOpen(!isTrackOpen)}
                  className="mt-1 flex h-12 w-full items-center justify-between border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-lg text-black outline-none transition hover:bg-[#f3d973] focus:bg-white md:border-[4px]"
                >
                  <span className="truncate">{track || "SELECT TRACK"}</span>
                  <span className="ml-2 text-xs">▼</span>
                </button>

                {isTrackOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto border-[3px] border-black bg-[#fffdf5] shadow-[4px_4px_0_#000] md:border-[4px]">
                    {Object.keys(TRACK_SUBTRACKS_MAP).map((t) => {
                      const isSelected = track === t;
                      return (
                        <div
                          key={t}
                          onClick={() => selectTrack(t)}
                          className={`flex cursor-pointer items-center justify-between border-b border-black/10 px-4 py-2 font-pixeboy text-base transition-colors hover:bg-[#f7d046] hover:text-black ${
                            isSelected
                              ? "bg-[#2d7d6f] text-white"
                              : "text-black"
                          }`}
                        >
                          <span>{t}</span>
                          {isSelected && <span className="font-bold">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SUBTRACK DROPDOWN */}
              <div ref={subtrackRef} className="relative">
                <label className="block font-pixeboy text-xl text-black md:text-2xl">
                  SUBTRACK (SELECT ONE OR MORE)
                </label>
                <button
                  type="button"
                  disabled={
                    isRejected || !track || availableSubtracks.length === 0
                  }
                  onClick={() => setIsSubtrackOpen(!isSubtrackOpen)}
                  className="mt-1 flex h-12 w-full items-center justify-between border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-lg text-black outline-none transition hover:bg-[#f3d973] focus:bg-white disabled:opacity-50 md:border-[4px]"
                >
                  <span className="truncate">
                    {!track
                      ? "SELECT A TRACK FIRST"
                      : availableSubtracks.length === 0
                      ? "NO SUBTRACKS AVAILABLE"
                      : selectedSubtracks.length > 0
                      ? selectedSubtracks.join(", ")
                      : "SELECT SUBTRACKS"}
                  </span>
                  <span className="ml-2 text-xs">▼</span>
                </button>

                {isSubtrackOpen && availableSubtracks.length > 0 && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto border-[3px] border-black bg-[#fffdf5] shadow-[4px_4px_0_#000] md:border-[4px]">
                    {availableSubtracks.map((st) => {
                      const isSelected = selectedSubtracks.includes(st);
                      return (
                        <div
                          key={st}
                          onClick={() => toggleSubtrack(st)}
                          className={`flex cursor-pointer items-center justify-between border-b border-black/10 px-4 py-2 font-pixeboy text-base transition-colors hover:bg-[#f7d046] hover:text-black ${
                            isSelected
                              ? "bg-[#2d7d6f] text-white"
                              : "text-black"
                          }`}
                        >
                          <span>{st}</span>
                          {isSelected && <span className="font-bold">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-5">
              {/* GITHUB LINK */}
              <div>
                <label
                  htmlFor="github"
                  className="block font-pixeboy text-xl text-black md:text-2xl"
                >
                  GITHUB LINK
                </label>
                <input
                  id="github"
                  type="url"
                  value={github}
                  disabled={isRejected}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="HTTPS://GITHUB.COM/USER/REPO"
                  className="mt-1 h-12 w-full border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-base text-black outline-none placeholder:text-black/50 focus:bg-white md:border-[4px]"
                />
              </div>

              {/* FIGMA LINK */}
              <div>
                <label
                  htmlFor="figma"
                  className="block font-pixeboy text-xl text-black md:text-2xl"
                >
                  FIGMA LINK
                </label>
                <input
                  id="figma"
                  type="url"
                  value={figma}
                  disabled={isRejected}
                  onChange={(e) => setFigma(e.target.value)}
                  placeholder="ENTER YOUR FIGMA LINK"
                  className="mt-1 h-12 w-full border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-base text-black outline-none placeholder:text-black/50 focus:bg-white md:border-[4px]"
                />
              </div>

              {/* OTHER LINKS */}
              <div>
                <label
                  htmlFor="other-links"
                  className="block font-pixeboy text-xl text-black md:text-2xl"
                >
                  OTHER LINKS
                </label>
                <input
                  id="other-links"
                  type="url"
                  value={otherLinks}
                  disabled={isRejected}
                  onChange={(e) => setOtherLinks(e.target.value)}
                  placeholder="ENTER ANY OTHER LINK"
                  className="mt-1 h-12 w-full border-[3px] border-black bg-[#fbf7ee] px-4 font-pixeboy text-base text-black outline-none placeholder:text-black/50 focus:bg-white md:border-[4px]"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="mt-4 flex flex-col items-start gap-2">
                <button
                  type="submit"
                  disabled={isRejected}
                  className={`w-full rounded-full bg-[#107050] py-3 font-pixeboy text-xl text-white shadow-[2px_2px_0_#000] transition hover:scale-[1.02] hover:bg-[#138861] active:scale-[0.98] md:w-48 ${
                    isRejected
                      ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-[#107050]"
                      : ""
                  }`}
                >
                  SUBMIT
                </button>

                {submitted && (
                  <span className="font-pixeboy text-lg text-emerald-900 drop-shadow-[1px_1px_0_#fff]">
                    SUBMISSION SAVED
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}