import ProblemCard from "./ProblemCard";

const description =
  "Build a secure offline communication platform capable of functioning without internet connectivity while maintaining encrypted peer-to-peer messaging and file transfer capabilities.";

export default function ProblemStatement() {
  const cards = [
    {
      image: "/evolution_images/Vaporeon.svg",
      color: "#67B5DA",
      reverse: false,
      scale: 0.90,
    },
    {
      image: "/evolution_images/Jolteon.svg",
      color: "#D8CB55",
      reverse: true,
      scale: 0.85,
    },
    {
      image: "/evolution_images/Flareon.svg",
      color: "#D88D5E",
      reverse: false,
      scale: 1.45,
    },
    {
      image: "/evolution_images/Espeon.svg",
      color: "#C57AC8",
      reverse: true,
      scale: 1.55,
    },
    {
      image: "/evolution_images/Umbreon.svg",
      color: "#606060",
      reverse: false,
      scale: 1.25,
    },
    {
      image: "/evolution_images/Leafeon.svg",
      color: "#67B97B",
      reverse: true,
      scale: 1.2,
    },
    {
      image: "/evolution_images/Glaceon.svg",
      color: "#67B8D9",
      reverse: false,
      scale: 1.3,
    },
  ];

  return (
    <section className="pb-[120px]">
      {cards.map((card, index) => (
        <ProblemCard
          key={index}
          image={card.image}
          text={description}
          color={card.color}
          reverse={card.reverse}
          scale={card.scale}
        />
      ))}
    </section>
  );
}