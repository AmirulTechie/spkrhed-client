"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

const SCROLL_THRESHOLD = 80;

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const MotionLink = motion.create(Link);

const underlineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

function useNycTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/New_York",
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function Underline() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-current"
      variants={underlineVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  );
}

function AnimatedNavLink({ href, children, onClick, isActive = false }) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      initial="rest"
      animate={isActive ? "hover" : "rest"}
      whileHover="hover"
      className={`relative inline-flex items-center gap-2 ${
        isActive ? "text-white" : ""
      }`}
    >
      {children}
      <Underline />
    </MotionLink>
  );
}

function Logo() {
  return (
    <Link href="/" className="block">
      <Image
        src="/images/spkrhed-logo.png"
        alt="SPKRHED"
        width={358}
        height={58}
        priority
        className="h-auto w-[clamp(124px,12.4243vw,248px)]"
      />
    </Link>
  );
}

function LongArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 47 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7H44M44 7L37 1M44 7L37 13"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlantYourSeedButton({ onClick, className = "" }) {
  return (
    <MotionLink
      href="#contact"
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={`flex items-center gap-3 text-[clamp(16px,1.1111vw,20px)] font-semibold ${className}`}
    >
      <span className="relative inline-flex">
        Plant Your Seed
        <Underline />
      </span>
      <span className="flex h-5 items-center justify-center rounded-sm bg-[#AC40FF] px-2 text-white">
        <LongArrowIcon className="h-3 w-11" />
      </span>
    </MotionLink>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const nycTime = useNycTime();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollRef = useRef(0);

  useLenis(({ scroll, direction }) => {
    setIsScrolled(scroll > SCROLL_THRESHOLD);

    if (scroll <= SCROLL_THRESHOLD) {
      setIsHidden(false);
    } else if (direction === 1 && scroll - lastScrollRef.current > 0) {
      setIsHidden(true);
    } else if (direction === -1) {
      setIsHidden(false);
    }

    lastScrollRef.current = scroll;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isMenuOpen) setIsHidden(false);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-99999"
      initial={false}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className="relative z-10 mx-auto flex items-center justify-between px-8 py-8 text-white sm:px-12 lg:px-16"
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-[clamp(32px,4.4444vw,96px)]">
          <Logo />

          <ul className="hidden items-center gap-[clamp(32px,4.4444vw,96px)] text-[clamp(16px,1.1111vw,20px)] font-semibold text-white/90 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <AnimatedNavLink href={href} isActive={pathname === href}>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-white" />
                  {label}
                </AnimatedNavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-[clamp(48px,8.4722vw,180px)] text-[clamp(16px,1.1111vw,20px)] font-semibold text-white/90 md:flex">
          {nycTime && <span>(NYC) {nycTime}</span>}
          <PlantYourSeedButton />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="text-white md:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-0 flex h-dvh w-full flex-col justify-between overflow-y-auto bg-black px-8 pt-32 pb-12 md:hidden"
        >
          <ul className="flex flex-col gap-6 text-3xl font-semibold text-white/90">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <AnimatedNavLink
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  isActive={pathname === href}
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  {label}
                </AnimatedNavLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 text-base font-semibold text-white/90">
            {nycTime && <span>(NYC) {nycTime}</span>}
            <PlantYourSeedButton onClick={() => setIsMenuOpen(false)} />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
