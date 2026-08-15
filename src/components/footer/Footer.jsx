"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/speakerhead",
    icon: FaLinkedin,
  },
];
function ColumnHeading({ children }) {
  return (
    <p className="flex items-center gap-2 font-anton-sc text-xl uppercase tracking-wide text-white lg:text-2xl">
      <Image
        src="/images/Home/leaf-2.png"
        alt=""
        width={18}
        height={18}
        className="brightness-0 invert h-4 w-4"
      />
      {children}
    </p>
  );
}

function SocialLink({ social }) {
  const Icon = social.icon;

  return (
    <Link
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3.5"
    >
      <Icon
        size={20}
        className="text-white transition-colors duration-300 group-hover:text-[#AC40FF]"
      />
      <span className="text-base text-white transition-colors duration-300 group-hover:text-white lg:text-lg">
        {social.label}
      </span>
    </Link>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/work") return null;

  return (
    <footer className="relative w-full border-t border-white/10 bg-black text-white overflow-hidden">
      {/* Background image — overflow-hidden scoped here so the plant can bleed above */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/footer_bg_full_plain.png"
          alt=""
          fill
          priority={true}
          sizes="100vw"
          className="select-none object-cover object-bottom-right"
        />
      </div>
      {/* Plant — outside overflow-hidden so it overlaps the section above the footer */}
      <div
        className="pointer-events-none absolute z-20 hidden lg:block"
        style={{
          width: "clamp(850px, 70vw, 1400px)",
          right: "clamp(-260px, calc(-12vw - 30px), -100px)",
          bottom: "clamp(-100px, -5vw, -40px)",
        }}
      >
        <Image
          src="/images/Home/plant-out-bean.png"
          alt=""
          width={1530}
          height={1024}
          priority={true}
          className="pointer-events-none h-auto w-full object-contain"
        />
      </div>
      <div className="relative mx-auto max-w-360 flex-col z-10">
        <div className="grid flex-1 grid-cols-1 divide-y divide-white/10 sm:divide-y-0 sm:divide-x sm:grid-cols-[2fr_3fr]">
          {/* Logo & Contact */}
          <div className="flex flex-col justify-center gap-5 px-6 py-8 lg:px-10 lg:py-12">
            <Image src="/images/spkrhed-logo.png" alt="SPKRHED" width={358} height={58} className="h-auto w-40 object-contain object-left lg:w-52" />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs uppercase tracking-widest text-white/40">How to cooperate?</p>
              <Link href="mailto:info@speakerhead.com" className="font-anton-sc text-xl uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#AC40FF] lg:text-2xl">
                info@speakerhead.com
              </Link>
            </div>
          </div>

          {/* Quick Links + Socials combined column */}
          <div className="flex flex-col justify-center gap-6 px-6 py-8 lg:px-10 lg:py-12">
            <div className="flex flex-col gap-3">
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="flex flex-col gap-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-base text-white transition-colors duration-300 hover:text-[#AC40FF] lg:text-lg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <ColumnHeading>Socials</ColumnHeading>
              <div className="flex flex-col gap-2">
                {SOCIALS.map((social) => (
                  <SocialLink key={social.label} social={social} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-3 lg:px-10">
          <p className="text-center text-xs text-white">
            Copyright &copy; {new Date().getFullYear()} SPKRHED. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}