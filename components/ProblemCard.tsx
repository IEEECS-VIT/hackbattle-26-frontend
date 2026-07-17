interface Props {
  image: string;
  text: string;
  color: string;
  reverse?: boolean;
  scale: number;
}

export default function ProblemCard({
  image,
  text,
  color,
  reverse = false,
  scale,
}: Props) {
  return (
    <div
      className={`
        w-full
        min-h-[270px]
        flex
        items-center
        overflow-hidden
        ${reverse ? "flex-row-reverse" : ""}
      `}
      style={{
        backgroundColor: `${color}AA`,
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={`
          w-[26%]
          h-[270px]
          flex
          items-center
          shrink-0
          ${reverse ? "justify-end pr-6" : "justify-start pl-6"}
        `}
      >
        <img
          src={image}
          alt="eeveelution"
          className="object-contain"
          style={{
            width: "220px",
            height: "220px",
            transform: `scale(${scale})`,
            transformOrigin: "center",
          }}
        />
      </div>

      <div
        className="
          flex-1
          px-10
          text-white
          pixeboy
          text-[31px]
          leading-[1.35]
          tracking-wide
        "
      >
        {text}
      </div>
    </div>
  );
}