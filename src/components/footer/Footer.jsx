"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
  { label: "Instagram", href: "#", icon: SiInstagram },
];

function ColumnHeading({ children }) {
  return (
    <p className="flex items-center gap-2 font-anton-sc text-lg uppercase tracking-wide text-white">
      <Image
        src="/images/Home/leaf-2.png"
        alt=""
        width={16}
        height={16}
        className="brightness-0 invert"
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
      className="group flex items-center gap-3"
    >
      <Icon
        size={18}
        className="text-white/50 transition-colors duration-300 group-hover:text-[#AC40FF]"
      />
      <span className="text-sm text-white/50 transition-colors duration-300 group-hover:text-white">
        {social.label}
      </span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-[0.08]"
      />

      <div className="relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
        <div className="flex flex-col justify-between gap-10 p-8 lg:p-12">
          <Image
            src="/images/spkrhed-logo.png"
            alt="SPKRHED"
            width={358}
            height={58}
            className="h-auto w-32 object-contain object-left"
          />

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40">
              How to cooperate?
            </p>
            <Link
              href="mailto:info@speakerhead.com"
              className="font-anton-sc text-xl uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#AC40FF]"
            >
              info@speakerhead.com
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8 lg:p-12">
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="flex flex-col gap-4">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 p-8 lg:p-12">
          <ColumnHeading>Socials</ColumnHeading>
          <div className="flex flex-col gap-4">
            {SOCIALS.map((social) => (
              <SocialLink key={social.label} social={social} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-5 sm:flex-row lg:px-12">
        <p className="text-xs text-white/30">
          Copyright &copy; {new Date().getFullYear()} SPKRHED. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-xs text-white/30 transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-white/30 transition-colors hover:text-white"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
