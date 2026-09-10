import type { Problem } from "@/types/problem";

export const problems: Problem[] = [
  {
    id: "track-01",
    index: 1,
    title: "AI & AUTOMATION",
    description:
      "The Problem: The great tragedy of artificial intelligence is that we taught rocks to think, and now we exclusively use them to write mediocre apologies to our clients.\n\nThe Challenge: Rescue AI from the chat window. Give it hands, memory, and a sense of boundaries so it can actually interact with the real world without needing constant adult supervision.\n\nSubtracks: Agentic Workflows, Self-Learning & Adaptation, Guardrails & Trust.",
    ballColor: "black_ball",
    island: "glacier",
    smokeColor: "#85c9ed",
  },
  {
    id: "track-02",
    index: 2,
    title: "SYSTEMS & INFRASTRUCTURE",
    description:
      'The Problem: We romantically call it "the cloud", but it is merely someone else\'s computer, and they are almost certainly overcharging you to keep it running.\n\nThe Challenge: Engineer the invisible plumbing. Build tools that make deploying code faster, networks more resilient, or data syncing seamless when the connection inevitably drops.\n\nSubtracks: Cloud & Deployment Automation, Decentralization & Protocols, Core Systems & Data Engines.',
    ballColor: "blue_red",
    island: "stone_land",
    smokeColor: "#579df0",
  },
  {
    id: "track-03",
    index: 3,
    title: "DEVELOPER TOOLING",
    description:
      "The Problem: To have one browser tab open is a necessity; to have one hundred and fifty is a cry for help. Engineers spend more time fighting their environment than actually building in it.\n\nThe Challenge: Build the exact tools you wish you had at 3 AM when your codebase was on fire and your RAM was begging for mercy.\n\nSubtracks: Terminal & Shell Tooling, Codebase Intelligence & Navigation, Workflow & Context Management.",
    ballColor: "white_ball",
    island: "volcano",
    smokeColor: "#9955d9",
  },
  {
    id: "track-04",
    index: 4,
    title: "CYBERSECURITY & PRIVACY",
    description:
      "The Problem: Privacy is the one thing modern society claims to value above all else, yet we willingly trade it away every morning for a slightly personalized social media feed.\n\nThe Challenge: Lock down the digital ecosystem. Protect the user, assume the network is already hostile, or build a spotlight that exposes the invisible data-harvesting machines.\n\nSubtracks: Local-First Privacy, Defense & Sandboxing, Surveillance Transparency.",
    ballColor: "purple_ball",
    island: "tropic",
    smokeColor: "#be8cdb",
  },
  {
    id: "track-05",
    index: 5,
    title: "OPEN INNOVATION",
    description:
      "If none of the other tracks spark your imagination, this is your playground to build something completely new over the weekend. Whether you want to wire up Hardware & IoT, break reality with AR/VR, dive into Web3, craft an immersive new game, or code something delightfully bizarre that defies all categories, this is where your wildest ideas get built.",
    ballColor: "red_ball",
    island: "drylands",
    smokeColor: "#ee9b46",
  },
];
