import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="
        relative
        w-full
        h-[clamp(130px,10vw,200px)]
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
          justify-between
          px-8
          pb-5
          md:px-12
          lg:px-8
        "
      >
        {/* IEEE CS Branding */}
        <div className="flex items-center">
          <Image
            src="/Footer/iee-cs_logo_footer.svg"
            alt="IEEE CS Logo"
            width={61}
            height={65}
            priority
            className="h-auto w-[clamp(36px,4vw,61px)]"
          />

          <Image
            src="/Footer/iee-cs_text_footer.svg"
            alt="IEEE Computer Society"
            width={150}
            height={65}
            priority
            className="h-auto w-[clamp(90px,10vw,150px)]"
          />
        </div>

        {/* IEEE CS Socials */}
        <div className="flex flex-col items-center gap-3">
          {/* Message */}
  

          {/* Social links */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            <a
              href="https://www.instagram.com/ieeecs_vit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT Instagram"
              className="
        rounded-md
        border
        border-white/20
        bg-black/25
        px-5
        py-2.5
        font-pixeboy
        text-lg
        leading-none
        text-white
        shadow-[0_2px_6px_rgba(0,0,0,0.2)]
        backdrop-blur-[2px]
        transition-all
        duration-200
        hover:bg-black/65
        hover:border-white/40
        hover:text-[#FFD84D]
        hover:-translate-y-0.5
        md:text-xl
        lg:text-2xl
      "
            >
              INSTAGRAM
            </a>

            <a
              href="https://www.linkedin.com/company/ieee-cs-vit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT LinkedIn"
              className="
        rounded-md
        border
        border-white/20
        bg-black/25
        px-5
        py-2.5
        font-pixeboy
        text-lg
        leading-none
        text-white
        shadow-[0_2px_6px_rgba(0,0,0,0.2)]
        backdrop-blur-[2px]
        transition-all
        duration-200
        hover:bg-black/65
        hover:border-white/40
        hover:text-[#FFD84D]
        hover:-translate-y-0.5
        md:text-xl
        lg:text-2xl
      "
            >
              LINKEDIN
            </a>

            <a
              href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT YouTube"
              className="
        rounded-md
        border
        border-white/20
        bg-black/25
        px-5
        py-2.5
        font-pixeboy
        text-lg
        leading-none
        text-white
        shadow-[0_2px_6px_rgba(0,0,0,0.2)]
        backdrop-blur-[2px]
        transition-all
        duration-200
        hover:bg-black/65
        hover:border-white/40
        hover:text-[#FFD84D]
        hover:-translate-y-0.5
        md:text-xl
        lg:text-2xl
      "
            >
              YOUTUBE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
