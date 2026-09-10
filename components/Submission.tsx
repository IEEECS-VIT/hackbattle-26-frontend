"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

const TRACK_SUBTRACKS_MAP: Record<string, string[]> = {
  "AI / ML": [
    "Computer Vision & Pattern Recognition",
    "Natural Language Processing (NLP)",
    "Generative AI & LLM Applications",
    "Predictive Analytics & Forecasting",
  ],

  Web3: [
    "DeFi (Decentralized Finance)",
    "NFTs & Gaming",
    "DAO & Governance",
    "Smart Contract Infrastructure",
  ],

  Healthcare: [
    "Remote Patient Monitoring",
    "AI Diagnostics",
    "Mental Health & Wellness",
    "Medical Records & Privacy",
  ],

  FinTech: [
    "Micro-investing & Wealthtech",
    "Fraud Detection",
    "Payment Gateway Innovations",
    "Personal Finance Management",
  ],

  OpenInnovation: [
    "General Problem Solving",
    "Social Good & Sustainability",
    "EduTech & E-learning",
  ],
};

/* ----------------------------- */
/* URL VALIDATION                 */
/* ----------------------------- */

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isGithubUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      (url.hostname === "github.com" ||
        url.hostname === "www.github.com")
    );
  } catch {
    return false;
  }
}

function isFigmaUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" &&
      (url.hostname === "figma.com" ||
        url.hostname === "www.figma.com")
    );
  } catch {
    return false;
  }
}

export default function Submission() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [track, setTrack] = useState("");
  const [subtrack, setSubtrack] = useState("");

  const [github, setGithub] = useState("");
  const [figma, setFigma] = useState("");
  const [otherLinks, setOtherLinks] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loadingSubmission, setLoadingSubmission] = useState(true);

  const { showToast } = useToast();

  const availableSubtracks = useMemo(() => {
    return TRACK_SUBTRACKS_MAP[track] || [];
  }, [track]);

  /* --------------------------------------------- */
  /* LOAD EXISTING SUBMISSION                      */
  /* --------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    const loadExistingSubmission = async () => {
      try {
        setLoadingSubmission(true);

        const { data, status } = await api.getTeam();

        if (cancelled) return;

        // User is not currently in a team.
        if (
          status === 204 ||
          status === 403 ||
          status === 404
        ) {
          setLoadingSubmission(false);
          return;
        }

        // Authentication is invalid.
        if (status === 401) {
          setLoadingSubmission(false);
          return;
        }

        // Unexpected API response.
        if (status !== 200 || !data) {
          setLoadingSubmission(false);
          return;
        }

        /*
         * Restore values actually stored by the backend.
         */
        setDescription(data.problem_stmt ?? "");
        setGithub(data.github_link ?? "");
        setFigma(data.figma_link ?? "");
        setOtherLinks(data.other_files ?? "");

        /*
         * projectName / track / subtrack are not part of the
         * current backend submission payload.
         *
         * Keep them locally, scoped to this team.
         */
        try {
          const storageKey =
            `hackbattle-submission-meta-${data.id}`;

          const savedMeta =
            window.localStorage.getItem(storageKey);

          if (savedMeta) {
            const meta = JSON.parse(savedMeta) as {
              projectName?: string;
              track?: string;
              subtrack?: string;
            };

            setProjectName(meta.projectName ?? "");
            setTrack(meta.track ?? "");
            setSubtrack(meta.subtrack ?? "");
          }
        } catch (storageError) {
          console.error(
            "Failed to restore submission metadata:",
            storageError
          );
        }

        /*
         * If the backend already has a submission,
         * show the saved state.
         */
        if (
          data.problem_stmt ||
          data.github_link ||
          data.figma_link ||
          data.other_files
        ) {
          setSubmitted(true);
        }
      } catch (error) {
        console.error(
          "Failed to load existing submission:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoadingSubmission(false);
        }
      }
    };

    void loadExistingSubmission();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleTrackChange = (selectedTrack: string) => {
    setTrack(selectedTrack);
    setSubtrack("");
    setSubmitted(false);
  };

  /* --------------------------------------------- */
  /* SUBMIT                                         */
  /* --------------------------------------------- */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const cleanProjectName = projectName.trim();
    const cleanDescription = description.trim();
    const cleanTrack = track.trim();
    const cleanSubtrack = subtrack.trim();

    const cleanGithub = github.trim();
    const cleanFigma = figma.trim();
    const cleanOtherLinks = otherLinks.trim();

    /* BUG 5
       Require all mandatory project information.
    */
    if (
      !cleanProjectName ||
      !cleanDescription ||
      !cleanTrack ||
      !cleanSubtrack ||
      !cleanGithub
    ) {
      showToast(
        "Project Name, Description, Track, Subtrack and GitHub Link are required.",
        "error"
      );
      return;
    }

    /* BUG 14
       GitHub must actually be a GitHub URL.
    */
    if (!isGithubUrl(cleanGithub)) {
      showToast(
        "Please enter a valid GitHub repository URL.",
        "error"
      );
      return;
    }

    /* Figma is optional, but if supplied it must be Figma. */
    if (
      cleanFigma &&
      !isFigmaUrl(cleanFigma)
    ) {
      showToast(
        "Please enter a valid Figma URL.",
        "error"
      );
      return;
    }

    /* Other links are optional HTTPS URLs. */
    if (
      cleanOtherLinks &&
      !isHttpsUrl(cleanOtherLinks)
    ) {
      showToast(
        "Other Links must be a valid HTTPS URL.",
        "error"
      );
      return;
    }

    try {
      setSubmitted(false);

      /*
       * IMPORTANT:
       *
       * Backend expects:
       *   problem_stmt
       *   github_link
       *   figma_link
       *   other_files
       *
       * It does NOT expect:
       *   project_desc
       *   track
       *   subtrack
       */
      const { data, status } =
        await api.submitProject({
          problem_stmt: cleanDescription,
          github_link: cleanGithub,
          figma_link: cleanFigma,
          other_files: cleanOtherLinks,
        });

      if (
        status === 200 ||
        status === 201
      ) {
        /*
         * Save UI-only metadata locally.
         *
         * This does NOT replace backend persistence.
         * The actual submission is stored by the backend.
         */
        try {
          const teamResponse =
            await api.getTeam();

          if (
            teamResponse.status === 200 &&
            teamResponse.data?.id
          ) {
            window.localStorage.setItem(
              `hackbattle-submission-meta-${teamResponse.data.id}`,
              JSON.stringify({
                projectName: cleanProjectName,
                track: cleanTrack,
                subtrack: cleanSubtrack,
              })
            );
          }
        } catch (storageError) {
          console.error(
            "Failed to save submission metadata:",
            storageError
          );
        }

        setSubmitted(true);

        showToast(
          data?.message ||
            "Project submitted successfully!",
          "success"
        );

        return;
      }

      /* Authentication */
      if (status === 401) {
        showToast(
          "Please log in before submitting.",
          "error"
        );
        return;
      }

      /* Not team leader */
      if (status === 403) {
        showToast(
          "Only the team leader can submit the project.",
          "error"
        );
        return;
      }

      /* Backend returned an actual error */
      throw new Error(
        data?.message ||
          `Submission failed (${status})`
      );
    } catch (error) {
      console.error(
        "Submission error:",
        error
      );

      showToast(
        error instanceof Error
          ? error.message
          : "Failed to submit project. Please try again.",
        "error"
      );
    }
  }

  /* --------------------------------------------- */
  /* UI                                              */
  /* --------------------------------------------- */

  return (
    <main className="w-full min-h-screen bg-black p-0">
      <section
        className="
          relative
          mx-auto
          w-full
          min-h-screen
          overflow-hidden
          bg-black

          md:aspect-[1305/734]
          md:min-h-0
        "
      >
        {/* BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="
            absolute
            inset-0
            z-0
            h-full
            w-full
            object-cover
            object-center
          "
        >
          <source
            src="/submission/video/pikachu_motion.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 z-[1] bg-white/[0.06]" />

        {/* IEEE CS LOGO */}
        <img
          src="/submission/HTML UI/IEEE_CS_logo.svg"
          alt="IEEE Computer Society"
          className="
            absolute
            left-[4%]
            top-[2.5%]
            z-20
            h-auto
            w-[22%]
            max-w-[115px]

            md:left-[3%]
            md:top-[3%]
            md:w-[12%]
            md:max-w-[160px]
          "
        />

        {/* HACKBATTLE LOGO */}
        <img
          src="/submission/HTML UI/HACKBATTLE.svg"
          alt="HackBattle"
          className="
            absolute
            right-[4%]
            top-[2.5%]
            z-20
            h-auto
            w-[12%]
            max-w-[65px]

            md:right-[3%]
            md:top-[3%]
            md:w-[8%]
            md:max-w-[105px]
          "
        />

        {/* BUG 1:
            Directly goes to the team page. */}
        <Link
  href="/team"
  className="
    absolute
    z-30
    rounded-full
    bg-[#397b68]
    px-6
    py-3
    font-pixeboy
    text-xl
    text-white
    transition
    hover:scale-105
    hover:bg-[#316b5b]

    right-[5%]
    top-[17%]

    max-md:left-1/2
    max-md:right-auto
    max-md:top-[94%]
    max-md:-translate-x-1/2
    max-md:px-5
    max-md:py-2
    max-md:text-base
    max-md:whitespace-nowrap
  "
>
  GO TO TEAM PAGE
</Link>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="absolute inset-0 z-10"
        >
          {/* TITLE */}
          <h1
            className="
              absolute
              left-[7%]
              top-[5%]
              whitespace-nowrap
              font-pixeboy
              text-[clamp(3.5rem,14vw,5rem)]
              leading-none
              tracking-wide
              text-[#f4c51e]
              [-webkit-text-stroke:3px_#111]
              drop-shadow-[4px_4px_0_#111]

              md:left-[5%]
              md:top-[8%]
              md:text-[clamp(4rem,7vw,7.5rem)]
              md:[-webkit-text-stroke:4px_#111]
              md:drop-shadow-[5px_5px_0_#111]
            "
          >
            SUBMISSION
          </h1>

          {/* DESKTOP DIVIDER */}
          <div
            className="
              absolute
              left-[52%]
              top-[17%]
              hidden
              h-[76%]
              w-[3px]
              -translate-x-1/2
              bg-black
              md:block
            "
          />

          {/* PROJECT NAME */}
          <div
            className="
              absolute
              left-[8%]
              top-[15%]
              w-[84%]

              md:left-[7%]
              md:top-[22%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="project-name"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              PROJECT NAME
            </label>

            <input
              id="project-name"
              required
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setSubmitted(false);
              }}
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[38px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[1rem]
                text-black
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(1.1rem,1.4vw,1.6rem)]
              "
            />
          </div>

          {/* PROJECT DESCRIPTION */}
          <div
            className="
              absolute
              left-[8%]
              top-[25%]
              w-[84%]

              md:left-[7%]
              md:top-[38%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="project-description"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              PROJECT DESCRIPTION
            </label>

            <textarea
              id="project-description"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSubmitted(false);
              }}
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[85px]
                w-full
                resize-none
                border-[3px]
                border-black
                bg-white/20
                px-3
                py-2
                font-pixeboy
                text-[0.95rem]
                leading-tight
                text-black
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(115px,11vw,150px)]
                md:border-[4px]
                md:px-5
                md:py-3
                md:text-[clamp(1rem,1.3vw,1.5rem)]
              "
            />
          </div>

          {/* TRACK */}
          <div
            className="
              absolute
              left-[8%]
              top-[40%]
              w-[84%]

              md:left-[7%]
              md:top-[64%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="track"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              TRACK
            </label>

            <select
              id="track"
              required
              value={track}
              onChange={(e) =>
                handleTrackChange(e.target.value)
              }
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[38px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[0.95rem]
                text-black
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(1rem,1.3vw,1.5rem)]
              "
            >
              <option
                value=""
                disabled
                className="bg-white text-black"
              >
                SELECT TRACK
              </option>

              {Object.keys(
                TRACK_SUBTRACKS_MAP
              ).map((t) => (
                <option
                  key={t}
                  value={t}
                  className="bg-white text-black"
                >
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* SUBTRACK */}
          <div
            className="
              absolute
              left-[8%]
              top-[50%]
              w-[84%]

              md:left-[7%]
              md:top-[79%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="subtrack"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              SUBTRACK
            </label>

            <select
              id="subtrack"
              required
              value={subtrack}
              disabled={
                loadingSubmission ||
                availableSubtracks.length === 0
              }
              onChange={(e) => {
                setSubtrack(e.target.value);
                setSubmitted(false);
              }}
              className="
                mt-[1%]
                h-[38px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[0.95rem]
                text-black
                outline-none
                focus:bg-white/40
                disabled:opacity-50

                md:mt-[1%]
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(1rem,1.3vw,1.5rem)]
              "
            >
              <option
                value=""
                disabled
                className="bg-white text-black"
              >
                {track
                  ? "SELECT SUBTRACK"
                  : "SELECT A TRACK FIRST"}
              </option>

              {availableSubtracks.map(
                (st) => (
                  <option
                    key={st}
                    value={st}
                    className="bg-white text-black"
                  >
                    {st}
                  </option>
                )
              )}
            </select>
          </div>

          {/* GITHUB LINK */}
          <div
            className="
              absolute
              left-[8%]
              top-[60%]
              w-[84%]

              md:left-[53.5%]
              md:top-[22%]
              md:w-[39%]
            "
          >
            <label
              htmlFor="github"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              GITHUB LINK
            </label>

            <input
              id="github"
              type="url"
              required
              value={github}
              onChange={(e) => {
                setGithub(e.target.value);
                setSubmitted(false);
              }}
              placeholder="ENTER YOUR GITHUB LINK"
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[36px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[0.8rem]
                text-black
                placeholder:text-black
                focus:placeholder-transparent
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(38px,2.8vw,48px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* FIGMA LINK */}
          <div
            className="
              absolute
              left-[8%]
              top-[69%]
              w-[84%]

              md:left-[53.5%]
              md:top-[36%]
              md:w-[39%]
            "
          >
            <label
              htmlFor="figma"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              FIGMA LINK
            </label>

            <input
              id="figma"
              type="url"
              value={figma}
              onChange={(e) => {
                setFigma(e.target.value);
                setSubmitted(false);
              }}
              placeholder="ENTER YOUR FIGMA LINK"
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[36px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[0.8rem]
                text-black
                placeholder:text-black
                focus:placeholder-transparent
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(38px,2.8vw,48px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* OTHER LINKS */}
          <div
            className="
              absolute
              left-[8%]
              top-[78%]
              w-[84%]

              md:left-[53.5%]
              md:top-[50%]
              md:w-[39%]
            "
          >
            <label
              htmlFor="other-links"
              className="
                block
                font-pixeboy
                text-[clamp(1rem,3.8vw,1.3rem)]
                leading-none
                text-black

                md:text-[clamp(1.5rem,2.2vw,2.5rem)]
              "
            >
              OTHER LINKS
            </label>

            <input
              id="other-links"
              type="url"
              value={otherLinks}
              onChange={(e) => {
                setOtherLinks(e.target.value);
                setSubmitted(false);
              }}
              placeholder="ENTER ANY OTHER LINK"
              disabled={loadingSubmission}
              className="
                mt-[1%]
                h-[36px]
                w-full
                border-[3px]
                border-black
                bg-white/20
                px-3
                font-pixeboy
                text-[0.8rem]
                text-black
                placeholder:text-black
                focus:placeholder-transparent
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(38px,2.8vw,48px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loadingSubmission}
            className="
              absolute
              left-[50%]
              top-[89%]
              w-[32%]
              -translate-x-1/2
              rounded-full
              bg-[#397b68]
              py-[1.5%]
              font-pixeboy
              text-[1rem]
              text-white
              transition

              hover:scale-[1.03]
              hover:bg-[#316b5b]

              active:scale-[0.98]

              disabled:cursor-not-allowed
              disabled:opacity-50

              md:left-[67%]
              md:top-[65%]
              md:w-[13%]
              md:translate-x-0
              md:py-[0.8%]
              md:text-[clamp(1rem,1.3vw,1.5rem)]
            "
          >
            {loadingSubmission
              ? "LOADING..."
              : "SUBMIT"}
          </button>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div
              className="
                absolute
                bottom-[1.5%]
                left-[50%]
                -translate-x-1/2
                rounded-md
                bg-white/70
                px-3
                py-1
                font-pixeboy
                text-[0.9rem]
                text-green-900

                md:bottom-[3%]
                md:left-auto
                md:right-[3%]
                md:translate-x-0
                md:text-[clamp(0.9rem,1.1vw,1.3rem)]
              "
            >
              SUBMISSION SAVED
            </div>
          )}
        </form>
      </section>
    </main>
  );
}