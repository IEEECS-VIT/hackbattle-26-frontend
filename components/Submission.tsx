"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
export default function Submission() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [track, setTrack] = useState("");
  const [github, setGithub] = useState("");
  const [figma, setFigma] = useState("");
  const [otherLinks, setOtherLinks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { getIdToken } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!description.trim() || !github.trim()) {
    alert("Project Description and GitHub Link are required.");
    return;
  }

  try {
    setSubmitted(false);

    const token = await getIdToken();

    if (!token) {
      alert("Please log in before submitting.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/teams/project/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          problem_stmt: description.trim(),
          github_link: github.trim(),
          figma_link: figma.trim(),
          other_files: otherLinks.trim(),
        }),
      }
    );

    let data: { message?: string } = {};

    try {
      data = await response.json();
    } catch {
      // Some error responses may not contain JSON.
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Submission failed (${response.status})`
      );
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Submission error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Unable to submit project. Please try again."
    );
  }
}

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
        {/* =====================================================
            BACKGROUND VIDEO
        ====================================================== */}

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

        {/* =====================================================
            LOGOS
        ====================================================== */}

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

        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="absolute inset-0 z-10"
        >
          {/* ===================================================
              TITLE
          ==================================================== */}

          <h1
            className="
              absolute
              left-[7%]
              top-[7%]
              whitespace-nowrap
              font-pixeboy
              text-[clamp(3.8rem,15vw,5.2rem)]
              leading-none
              tracking-wide
              text-[#f4c51e]
              [-webkit-text-stroke:3px_#111]
              drop-shadow-[4px_4px_0_#111]

              md:left-[5%]
              md:top-[9%]
              md:text-[clamp(4rem,8vw,8rem)]
              md:[-webkit-text-stroke:4px_#111]
              md:drop-shadow-[5px_5px_0_#111]
            "
          >
            SUBMISSION
          </h1>

          {/* ===================================================
              DESKTOP DIVIDER
          ==================================================== */}

          <div
            className="
              absolute
              left-[52%]
              top-[17%]
              hidden
              h-[66%]
              w-[3px]
              -translate-x-1/2
              bg-black

              md:block
            "
          />

          {/* ===================================================
              PROJECT NAME
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[17%]
              w-[84%]

              md:left-[7%]
              md:top-[25%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="project-name"
              className="
                block
                font-pixeboy
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              PROJECT NAME
            </label>

            <input
              id="project-name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setSubmitted(false);
              }}
              className="
                mt-[1.5%]
                h-[42px]
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
                md:h-[clamp(44px,3.3vw,58px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(1.1rem,1.5vw,1.7rem)]
              "
            />
          </div>

          {/* ===================================================
              PROJECT DESCRIPTION
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[28%]
              w-[84%]

              md:left-[7%]
              md:top-[43%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="project-description"
              className="
                block
                font-pixeboy
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              PROJECT DESCRIPTION
            </label>

            <textarea
              id="project-description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setSubmitted(false);
              }}
              className="
                mt-[1.5%]
                h-[105px]
                w-full
                resize-none
                border-[3px]
                border-black
                bg-white/20
                px-3
                py-2
                font-pixeboy
                text-[1rem]
                leading-tight
                text-black
                outline-none
                focus:bg-white/40

                md:mt-[1%]
                md:h-[clamp(145px,14vw,185px)]
                md:border-[4px]
                md:px-5
                md:py-4
                md:text-[clamp(1.1rem,1.5vw,1.7rem)]
              "
            />
          </div>

          {/* ===================================================
              TRACK
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[45%]
              w-[84%]

              md:left-[7%]
              md:top-[71%]
              md:w-[44%]
            "
          >
            <label
              htmlFor="track"
              className="
                block
                font-pixeboy
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              TRACK
            </label>

            <input
              id="track"
              value={track}
              onChange={(e) => {
                setTrack(e.target.value);
                setSubmitted(false);
              }}
              className="
                mt-[1.5%]
                h-[42px]
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
                md:h-[clamp(44px,3.3vw,58px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(1.1rem,1.5vw,1.7rem)]
              "
            />
          </div>

          {/* ===================================================
              GITHUB
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[56%]
              w-[84%]

              md:left-[53.5%]
              md:top-[25%]
              md:w-[39%]
            "
          >
            <label
              htmlFor="github"
              className="
                block
                font-pixeboy
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              GITHUB LINK
            </label>

            <input
              id="github"
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="ENTER YOUR GITHUB LINK"
              className="
                mt-[1.5%]
                h-[38px]
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
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* ===================================================
              FIGMA
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[66%]
              w-[84%]

              md:left-[53.5%]
              md:top-[38%]
              md:w-[39%]
            "
          >
            <label
              htmlFor="figma"
              className="
                block
                font-pixeboy
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              FIGMA LINK
            </label>

            <input
              id="figma"
              type="url"
              value={figma}
              onChange={(e) => setFigma(e.target.value)}
              placeholder="ENTER YOUR FIGMA LINK"
              className="
                mt-[1.5%]
                h-[38px]
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
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* ===================================================
              OTHER LINKS
          ==================================================== */}

          <div
            className="
              absolute
              left-[8%]
              top-[76%]
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
                text-[clamp(1.05rem,4vw,1.35rem)]
                leading-none
                text-black

                md:text-[clamp(1.6rem,2.4vw,2.8rem)]
              "
            >
              OTHER LINKS
            </label>

            <input
              id="other-links"
              type="url"
              value={otherLinks}
              onChange={(e) => setOtherLinks(e.target.value)}
              placeholder="ENTER ANY OTHER LINK"
              className="
                mt-[1.5%]
                h-[38px]
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
                md:h-[clamp(40px,3vw,52px)]
                md:border-[4px]
                md:px-5
                md:text-[clamp(0.9rem,1.1vw,1.2rem)]
              "
            />
          </div>

          {/* ===================================================
              SUBMIT
          ==================================================== */}

          <button
            type="submit"
            className="
              absolute
              left-[50%]
              top-[90%]
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

              md:left-[67%]
              md:top-[63%]
              md:w-[13%]
              md:translate-x-0
              md:py-[0.8%]
              md:text-[clamp(1rem,1.3vw,1.5rem)]
            "
          >
            SUBMIT
          </button>

          {/* ===================================================
              SUCCESS MESSAGE
          ==================================================== */}

          {submitted && (
            <div
              className="
                absolute
                bottom-[1.5%]
                left-[50%]
                -translate-x-1/2
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