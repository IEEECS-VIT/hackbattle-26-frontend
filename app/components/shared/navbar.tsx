import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "PROBLEM STATEMENTS", href: "/problems" },
  { label: "JUDGE", href: "/judge" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        z-50

        h-[80px]

        border-b
        border-white/40

        backdrop-blur-xl
        bg-white/5
      "
    >
      <div className="flex h-full items-center justify-between px-[26px]">

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
  <Image
    src="/Navbar/ieee-cs_logo.svg"
    alt="IEEE Computer Society Logo"
    width={37}
    height={40}
    priority
    className="
      w-7
      lg:w-8
      xl:w-9
      2xl:w-[37px]
      h-auto
    "
  />

  <Image
    src="/Navbar/ieee-cs_text.svg"
    alt="IEEE Computer Society"
    width={92}
    height={40}
    priority
    className="
      w-16
      lg:w-20
      xl:w-24
      2xl:w-[92px]
      h-auto
    "
  />
</Link>

        {/* Navigation */}
        <div className="
                flex
                items-center
                gap-3
                lg:gap-5
                xl:gap-7
                2xl:gap-10
              ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                font-pixeboy
                text-[26px]
                lg:text-[30px]
                xl:text-[36px]
                2xl:text-[42px]
                leading-none
                uppercase
                text-white
                transition-all
                duration-300
              "
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login */}        
       <Link
          href="/login"
          aria-label="Login"
          className="
            relative
            h-[38px]
            w-[90px]
            lg:w-[100px]
            xl:w-[110px]
            2xl:w-[118px]
            flex-shrink-0
          "
        >
        <Image
          src="/Navbar/profile_icon.svg"
          alt="Profile"
          width={118}
          height={43}
          className="
            absolute
            inset-0
            w-full
            h-auto
          "
        />

        <Image
          src="/Navbar/pokeball.svg"
          alt=""
          width={36}
          height={36}
          className="
            absolute
            right-[4px]
            top-[3px]
            w-6
            lg:w-7
            xl:w-[32px]
            2xl:w-[34px]
            h-auto
          "
        />
      </Link>
      </div>
    </nav>
  );
}