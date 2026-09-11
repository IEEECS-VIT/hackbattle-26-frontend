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
          items-center
          justify-between
          px-8
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

        {/* Social Icons */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6">
            
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ieeecs_vit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT Instagram"
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <Image
                src="/Social/instagram.svg"
                alt="Instagram"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/ieee-cs-vit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT LinkedIn"
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <Image
                src="/Social/linkedin.svg"
                alt="LinkedIn"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE CS VIT YouTube"
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <Image
                src="/Social/youtube.svg"
                alt="YouTube"
                width={32}
                height={32}
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
