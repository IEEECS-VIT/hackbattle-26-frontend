"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/#about" },
  { label: "TRACKS", href: "/#problems" },
  { label: "JUDGE", href: "/#judge" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  if (pathname === "/submission") {
    return null;
  }

  // existing return below

  return (
    <>
      {}
      <nav
        aria-label="Mobile navigation"
        className="site-navigation fixed inset-x-0 top-0 z-50 select-none border-b border-white/30 bg-gradient-to-b from-[#167f91]/90 to-[#095d70]/85 shadow-[0_8px_30px_rgba(4,45,61,0.18)] backdrop-blur-xl lg:hidden"
      >
        <div className="flex h-16 items-center justify-between gap-2 px-3 sm:h-[72px] sm:px-6">
          <Link
            href="/"
            aria-label="HackBattle home"
            className="flex shrink-0 items-center gap-1"
            onClick={() => setMenuOpen(false)}
          >
            {/* IEEE CS Logos */}
            <Image
              src="/Navbar/ieee-cs_logo.svg"
              alt=""
              width={92}
              height={40}
              priority
              className="h-auto w-6"
            />
            <Image
              src="/Navbar/ieee-cs_text.svg"
              alt="IEEE Computer Society"
              width={92}
              height={40}
              priority
              className="h-auto w-[70px]"
            />

            {/* Divider Line */}
            <span className="mx-1 h-5 w-[1px] bg-white/30" aria-hidden="true" />

            <Image
              src="/bob.png"
              alt="Bank of Baroda"
              width={82}
              height={10}
              className="h-auto w-[clamp(6rem,32vw,9rem)] object-contain drop-shadow-[2px_2px_0_#1a4a60]"
              priority
            />
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((open) => !open)}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform active:translate-y-0.5"
          >
            <Image
              src="/Navbar/pokeball.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 drop-shadow-[0_3px_0_#173c50]"
            />
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-white/20 transition-[max-height,opacity] duration-300 ease-out ${
            menuOpen
              ? "max-h-[440px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="grid gap-1 bg-[#075568]/95 px-4 py-4 shadow-2xl sm:px-6">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-pixeboy group flex items-center justify-between rounded-xl px-3 py-2.5 text-[30px] leading-none text-white hover:bg-white/10 hover:text-[#ffdf50]"
              >
                <span>
                  <span className="mr-3 text-[#77dce7]">0{index + 1}</span>
                  {item.label}
                </span>
                <span aria-hidden="true" className="text-[#ffdf50]">
                  ›
                </span>
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="font-pixeboy mt-2 flex h-12 items-center justify-center rounded-xl border-2 border-[#163e54] bg-[#ffdb37] text-[29px] leading-none text-[#153e53] shadow-[0_4px_0_#163e54]"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </nav>

      {/* Original desktop navigation — intentionally unchanged */}
      {/* Original desktop navigation — updated for centered links */}
      <nav
        className="
          fixed
          top-0
          left-0
          right-0
          z-50

          h-[84px]

          border-b
          border-white/40

          backdrop-blur-[70px]

          bg-gradient-to-b
          from-[#1B7C8C]/70
          to-[#0F6775]/70
          site-navigation
          select-none
          hidden lg:block
        "
      >
        <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-3 sm:px-6 md:px-[26px] gap-3">
          {/* Left Column: Logos */}
          <Link
            href="/"
            className="flex items-center shrink-0 justify-self-start"
          >
            <Image
              src="/Navbar/ieee-cs_logo.svg"
              alt="IEEE Computer Society Logo"
              width={92}
              height={40}
              priority
              className="w-7 lg:w-8 xl:w-9 2xl:w-[37px] h-auto"
            />
            <Image
              src="/Navbar/ieee-cs_text.svg"
              alt="IEEE Computer Society"
              width={92}
              height={40}
              priority
              className="w-16 lg:w-20 xl:w-24 2xl:w-[92px] h-auto"
            />
            <span
              className="mx-2 md:mx-3 h-5 w-[1px] bg-white/30"
              aria-hidden="true"
            />

            {/* Bank of Baroda Logo */}
            <Image
              src="/bob.png"
              alt="Bank of Baroda"
              width={92}
              height={40}
              priority
              className="h-auto w-26 md:w-40 object-contain ml-1"
            />
          </Link>

          {/* Center Column: Navigation Links */}
          <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-pixeboy shrink-0 whitespace-nowrap rounded-xl border border-transparent px-3 py-2 text-[26px] leading-none uppercase text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:shadow-[0_6px_20px_rgba(3,35,46,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] hover:backdrop-blur-sm sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[36px] 2xl:text-[42px]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Column: Profile/Login Icon */}
          <Link
            href="/login"
            aria-label="Login"
            className="relative block h-[38px] w-[90px] lg:w-[100px] xl:w-[110px] 2xl:w-[118px] flex-shrink-0 justify-self-end"
          >
            <Image
              src="/Navbar/profile_icon.svg"
              alt="Profile"
              width={118}
              height={43}
              className="absolute inset-0 h-auto w-full 2xl:h-[43px] 2xl:w-[118px]"
            />
            <Image
              src="/Navbar/pokeball.svg"
              alt=""
              width={36}
              height={36}
              className="absolute right-[4px] top-[3px] w-6 lg:w-7 xl:w-[32px] 2xl:w-[34px] h-auto"
            />
          </Link>
        </div>
      </nav>
    </>
  );
}
