"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
  { label: "Instagram", href: "#", icon: SiInstagram },
];

function ColumnHeading({ children }) {
  return (
    <p className="flex items-center gap-2 font-anton-sc text-xs uppercase tracking-widest text-white/50">
      <span className="h-1 w-1 rounded-full bg-[#AC40FF]" />
      {children}
    </p>
  );
}

export default function Footer() {
  const pathname = usePathname();

  // The Work page is a full-bleed drag/scroll canvas (see WorkGrid) with no
  // natural end to scroll to, so the footer never has anywhere sensible to sit.
  if (pathname === "/work") return null;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070707] text-white">
      {/* Background graphic */}
      <Image
        src="/images/footer_bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-contain object-right opacity-30 mix-blend-screen"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
          
          {/* Left Side: Brand details & Big CTA (60% width) */}
          <div className="flex flex-col gap-8 lg:max-w-xl">
            {/* Live Availability Badge */}
            <div className="flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-950/10 px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-emerald-400 uppercase w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Selective Partnerships
            </div>

            <Image
              src="/images/spkrhed-logo.png"
              alt="SPKRHED"
              width={358}
              height={58}
              className="h-auto w-36 object-contain object-left"
            />

            <p className="font-poppins text-sm leading-relaxed text-white/60">
              A hybrid design & growth studio planting digital experiences that scale. We engineer premium brand identity, animations, and high-converting marketing frameworks.
            </p>

            <div className="flex flex-col gap-2.5">
              <p className="text-xs uppercase tracking-widest text-white/40 font-medium">
                Want to seed your project?
              </p>
              <Link
                href="mailto:info@speakerhead.com"
                className="group relative font-anton-sc text-xl lg:text-2xl uppercase tracking-wide text-white transition-colors duration-300 hover:text-[#AC40FF] w-fit"
              >
                info@speakerhead.com
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#AC40FF] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>

          {/* Right Side: Links columns (40% width) */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16 lg:shrink-0">
            {/* Quick Links Column */}
            <div className="flex flex-col gap-5">
              <ColumnHeading>Navigation</ColumnHeading>
              <ul className="flex flex-col gap-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative text-sm text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                      <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials Column */}
            <div className="flex flex-col gap-5">
              <ColumnHeading>Social Connect</ColumnHeading>
              <ul className="flex flex-col gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                      >
                        <Icon size={16} className="text-white/40 transition-colors duration-300 group-hover:text-[#AC40FF]" />
                        <span>{social.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

        </div>

        {/* Big stylized watermark behind bottom elements */}
        <div className="pointer-events-none mt-12 select-none text-center sm:mt-16 lg:mt-24">
          <span className="font-anton-sc text-[clamp(64px,14vw,220px)] uppercase leading-none tracking-tighter text-white/[0.02]">
            SPKRHED
          </span>
        </div>

        {/* Legal Bottom Bar */}
        <div className="mt-6 border-t border-white/5 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30 text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} SPKRHED. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-6 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
