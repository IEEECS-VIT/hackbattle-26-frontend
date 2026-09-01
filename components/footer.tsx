import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        h-[clamp(100px,8vw,180px)]
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/Footer/footer_bg.svg')",
        }}
    >
      <div
        className="
            flex
            h-full
            items-end
            px-8
            pb-5
            md:px-12
            lg:px-8
        "
    >
        <div className="flex items-center">
            <Image
                src="/Footer/iee-cs_logo_footer.svg"
                alt="IEEE CS Logo"
                width={61}
                height={65}
                priority
                className="w-[clamp(36px,4vw,61px)] h-auto"
                />

            <Image
                src="/Footer/iee-cs_text_footer.svg"
                alt="IEEE Computer Society"
                width={150}
                height={65}
                priority
                className="w-[clamp(90px,10vw,150px)] h-auto"
                />
      </div>
      </div>
    </footer>
  );
}