import { Problem } from "../types/problem";

// NOTE: `position` values are percentages against the full-screen MapScene
// background. Retune by hand if you swap the background art or notice
// drift at very wide/narrow viewports.
//
// stageSize (px, island platform footprint) and ballSize (px, ball icon on
// that platform) are per-problem overrides — every asset has its own
// native crop/proportions, so one shared constant never fit all seven.
//
// NEW in this pass: ballOffsetTop/Left (where the ball sits ON its
// island, as a % of the stage box — was hardcoded 40%/60% for every
// island) and numberX/numberY (px offset of the "01".."07" label from the
// stage box's top-left corner — was hardcoded -4/-4). Demoed with real
// non-default values on problem #1 below; the rest fall back to the old
// defaults until you decide they need nudging too.
//
// ALSO NEW: revealTop/revealLeft/revealStageSize/revealClosedBallSize/
// revealOpenBallSize were previously copy-pasted as the IDENTICAL block
// onto all seven problems -- meaning the reveal panel looked the same
// regardless of which card you opened, which is almost certainly what
// read as "not changing." Each problem below now has its own distinct
// values so you can actually see the difference when clicking between
// them, and use these seven as a spread of reference points rather than
// one copy-pasted example.
//
// TODO: replace description text for #2-#7. Only #1 is a real problem
// statement right now -- the rest are placeholders so you don't
// accidentally ship duplicate/fake copy.
export const problems: Problem[] = [
  {
    id: "offline-mesh-chat",
    index: 1,
    title: "OFFLINE MESH CHAT",
    description: "TODO: replace with real problem statement #1.",
    ballColor: "white_ball",
    island: "/stages/stone_palace.svg",
    position: { top: "23.46%", left: "-4.2648%" },
    ballSize: 132.23,
    stageSize: 200,
    reverseOpen: true,

    // DEMO: ball nudged off the 40%/60% default, number nudged off the
    // -4/-4 default -- so you can see both actually move independently
    // of the island art itself changing.
    ballOffsetTop: "48%",
    ballOffsetLeft: "60%",
    numberX: 10,
    numberY: 16,

    // DEMO: this reveal panel sits smaller and further left than the
    // others below, and its ball is bigger closed than open (rare, but
    // shows the two aren't secretly linked).
    revealTop: "-2%",
    revealLeft: "30%",
    revealStageSize: 1000,
    revealClosedBallSize: 900,
    revealOpenBallSize: 900,
  },
  {
    id: "todo-problem-2",
    index: 2,
    title: "TODO",
    description:
      "TODO: replace with real problem statement #2. (Placeholder Lorem Ipsum removed -- this was a copy-paste leftover, not a real description; don't ship it as-is.)",
    ballColor: "red_ball",
    island: "/stages/drylands.svg",
    position: { top: "33.548%", left: "14.48%" },
    ballSize: 134.36,
    stageSize: 198.45,
    reverseOpen: true,
    ballOffsetTop: "48%",
    ballOffsetLeft: "60%",
    numberX: 20,
    numberY: 16,

    // DEMO: noticeably bigger reveal ball than #1, sitting more central.
    revealTop: "5%",
    revealLeft: "30%",
    revealStageSize: 1000,
    revealClosedBallSize: 900,
    revealOpenBallSize: 1580,
  },
  {
    id: "todo-problem-3",
    index: 3,
    title: "TODO",
    description: "TODO: replace with real problem statement #3.",
    ballColor: "green_ball",
    island: "/stages/plain_lands.svg",
    position: { top: "42.241%", left: "0.02%" },
    ballSize: 194.27,
    stageSize: 190,
    reverseOpen: true,
    ballOffsetTop: "45%",
    ballOffsetLeft: "60%",
    numberX: 1,
    numberY: 10,

    // DEMO: pushed further right than #1/#2, smallest reveal ball of the
    // seven.
    revealTop: "-25%",
    revealLeft: "20%",
    revealStageSize: 1500,
    revealClosedBallSize: 1060,
    revealOpenBallSize: 700,
  },
  {
    id: "todo-problem-4",
    index: 4,
    title: "TODO",
    description: "TODO: replace with real problem statement #4.",
    ballColor: "purple_ball",
    island: "/stages/volcano.svg",
    position: { top: "52%", left: "14.08%" },
    ballSize: 79.25,
    stageSize: 200,
    reverseOpen: true,
    ballOffsetTop: "48%",
    ballOffsetLeft: "55%",
    numberX: 24,
    numberY: 13,

    revealTop: "5%",
    revealLeft: "36%",
    revealStageSize: 900,
    revealClosedBallSize: 600,
    revealOpenBallSize: 800,
  },
  {
    id: "todo-problem-5",
    index: 5,
    title: "TODO",
    description: "TODO: replace with real problem statement #5.",
    ballColor: "white_black_ball",
    island: "/stages/tropic.svg",
    position: { top: "60.568%", left: "-2.04%" },
    ballSize: 78.64,
    stageSize: 225,
    reverseOpen: true,
    ballOffsetTop: "48%",
    ballOffsetLeft: "60%",
    numberX: 1,
    numberY: 10,

    // DEMO: the biggest reveal ball of the seven, both closed and open.
    revealTop: "0.586%",
    revealLeft: "38%",
    revealStageSize: 900,
    revealClosedBallSize: 560,
    revealOpenBallSize: 750,
  },
  {
    id: "todo-problem-6",
    index: 6,
    title: "TODO",
    description: "TODO: replace with real problem statement #6.",
    ballColor: "blue_red",
    island: "/stages/glacier.svg",
    position: { top: "71.67%", left: "19.547%" },
    ballSize: 78.89,
    stageSize: 220,
    reverseOpen: true,
    ballOffsetTop: "46%",
    ballOffsetLeft: "58%",
    numberX: 32,
    numberY: 30,

    revealTop: "10%",
    revealLeft: "42%",
    revealStageSize: 900,
    revealClosedBallSize: 650,
    revealOpenBallSize: 1050,
  },
  {
    id: "todo-problem-7",
    index: 7,
    title: "TODO",
    description: "TODO: replace with real problem statement #7.",
    ballColor: "black_ball",
    island: "/stages/stone_land.svg",
    position: { top: "78.3268%", left: "-3.75%" },
    ballSize: 78.89,
    stageSize: 237,
    reverseOpen: true,
    ballOffsetTop: "48%",
    ballOffsetLeft: "60%",
    numberX: 55,
    numberY: 16,

    // DEMO: reveal panel shifted up (revealTop < 50%) rather than left/
    // right, to show that axis is adjustable too, not just left/right.
    revealTop: "5%",
    revealLeft: "39%",
    revealStageSize: 840,
    revealClosedBallSize: 500,
    revealOpenBallSize: 1050,
  },
];