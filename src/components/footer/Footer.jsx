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
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
        <div className="flex flex-col justify-between gap-10 p-8 lg:p-12">
          <Image
            src="/images/spkrhed-logo.png"
            alt="SPKRHED"
            width={358}
            height={58}
            className="h-auto w-32 object-contain object-left"
          />

          <div className="flex flex-col gap-6">
            <p className="text-xs text-white/40">How to cooperate?</p>
            <p className="text-sm font-bold uppercase tracking-widest">
              info@speakerhead.com
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-widest">
            Quick Links
          </p>
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
          <p className="text-sm font-bold uppercase tracking-widest">
            Socials
          </p>
          <div className="flex flex-col gap-4">
            {SOCIALS.map((social) => (
              <SocialLink key={social.label} social={social} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-5 sm:flex-row lg:px-12">
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
