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
    <p className="flex items-center gap-2.5 font-anton-sc text-3xl uppercase tracking-wide text-white lg:text-4xl">
      <Image
        src="/images/Home/leaf-2.png"
        alt=""
        width={24}
        height={24}
        className="brightness-0 invert h-6 w-6"
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
        size={26}
        className="text-white/50 transition-colors duration-300 group-hover:text-[#AC40FF]"
      />
      <span className="text-xl text-white/50 transition-colors duration-300 group-hover:text-white lg:text-2xl">
        {social.label}
      </span>
    </Link>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/work") return null;

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background Image at full opacity and correctly aligned to the bottom-right corner */}
      <Image
        src="/images/footer_bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      {/* Black overlay mask layer to darken the entire background graphic */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-1" />

      <div className="relative mx-auto max-w-[1440px] flex-col z-10">
        <div className="grid flex-1 grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
          <div className="flex flex-col justify-center gap-8 px-6 py-16 lg:px-10 lg:py-28">
            <Image src="/images/spkrhed-logo.png" alt="SPKRHED" width={358} height={58} className="h-auto w-56 object-contain object-left lg:w-72" />
            <div className="flex flex-col gap-3">
              <p className="text-base uppercase tracking-widest text-white/40">How to cooperate?</p>
              <Link href="mailto:info@speakerhead.com" className="font-anton-sc text-3xl uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#AC40FF] lg:text-4xl">
                info@speakerhead.com
              </Link>
            </div>
          </div>

          {/* Quick Links Column left-aligned */}
          <div className="flex flex-col justify-center gap-5 px-6 py-16 lg:px-10 lg:py-28">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="flex flex-col gap-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xl text-white transition-colors duration-300 hover:text-[#AC40FF] lg:text-2xl">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Column left-aligned */}
          <div className="flex flex-col justify-center gap-5 px-6 py-16 lg:px-10 lg:py-28">
            <ColumnHeading>Socials</ColumnHeading>
            <div className="flex flex-col gap-4">
              {SOCIALS.map((social) => (
                <SocialLink key={social.label} social={social} />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 lg:px-10">
          <p className="text-center text-sm text-white">
            Copyright &copy; {new Date().getFullYear()} SPKRHED. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}