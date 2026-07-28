"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import gsap from "gsap";

const SCROLL_THRESHOLD = 80;

// Matches Loader.jsx's TOTAL_DURATION so the navbar's entrance starts the
// instant the preloader finishes sliding away, same as the page heroes.
const LOADER_DURATION = 3.5;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: FaLinkedin },
  { label: "Instagram", href: "#", icon: SiInstagram },
];

const MotionLink = motion.create(Link);

const underlineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } },
};

const mobileListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: {},
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: "easeInOut" } },
};

const WORLD_CLOCK_ZONES = [
  { key: "nyc", label: "NYC", timeZone: "America/New_York" },
  { key: "sf", label: "SF", timeZone: "America/Los_Angeles" },
  { key: "paris", label: "Paris", timeZone: "Europe/Paris" },
];

function useWorldClocks() {
  const [times, setTimes] = useState(null);

  useEffect(() => {
    const formatters = WORLD_CLOCK_ZONES.map(({ key, timeZone }) => ({
      key,
      formatter: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone,
      }),
    }));

    const tick = () => {
      const now = new Date();
      setTimes(
        formatters.reduce((acc, { key, formatter: fmt }) => {
          acc[key] = fmt.format(now);
          return acc;
        }, {}),
      );
    };
    tick();
    const interval = setInterval(tick, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return times;
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
      className={`relative inline-flex items-center gap-1.5 ${
        isActive ? "text-white" : ""
      }`}
    >
      {children}
      <Underline />
    </MotionLink>
  );
}

function Logo({ innerRef }) {
  return (
    <Link href="/" ref={innerRef} className="block shrink-0 opacity-0">
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
  const isWorkPage = pathname === "/work";
  const worldTimes = useWorldClocks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollRef = useRef(0);

  const logoRef = useRef(null);
  const navListRef = useRef(null);
  const rightGroupRef = useRef(null);
  const menuButtonRef = useRef(null);

  const lenis = useLenis(({ scroll, direction }) => {
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

    // Lenis drives scroll itself (wheel/touch on the window), so locking
    // body overflow alone doesn't stop it — the instance must be paused too.
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = overflow;
    };
  }, [isMenuOpen, lenis]);

  // Navbar lives in the root layout and never unmounts, so unlike the page
  // heroes it has to re-key its entrance off pathname to replay on every
  // route change. Logo drops in first, then the links and the NYC/CTA group
  // stagger in right behind it — same fade + power3.out language as the
  // heroes, timed to start the instant the preloader finishes.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const linkItems = navListRef.current
        ? [...navListRef.current.children]
        : [];
      const rightItems = rightGroupRef.current
        ? [...rightGroupRef.current.children]
        : [];
      const targets = [
        logoRef.current,
        menuButtonRef.current,
        ...linkItems,
        ...rightItems,
      ].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: -14 });

      gsap
        .timeline({ delay: LOADER_DURATION })
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          menuButtonRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "<",
        )
        .to(
          linkItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.35",
        )
        .to(
          rightItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-99999"
      initial={false}
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className={`relative z-10 mx-auto flex items-center justify-between gap-x-4 px-8 py-8 text-white sm:px-12 lg:px-6 2xl:px-16 ${
          isWorkPage ? "backdrop-blur-md" : ""
        }`}
        initial={false}
        animate={{
          backgroundColor: isWorkPage
            ? "rgba(0,0,0,0.45)"
            : isScrolled
              ? "rgba(0,0,0,1)"
              : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-[clamp(12px,1.8vw,56px)]">
          <Logo innerRef={logoRef} />

          <ul
            ref={navListRef}
            className="hidden items-center gap-[clamp(8px,1vw,28px)] text-[clamp(13px,0.9vw,20px)] font-semibold text-white/90 xl:flex"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="opacity-0">
                <AnimatedNavLink href={href} isActive={pathname === href}>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-white" />
                  {label}
                </AnimatedNavLink>
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={rightGroupRef}
          className="hidden shrink-0 items-center gap-[clamp(12px,2.2vw,64px)] whitespace-nowrap text-[clamp(13px,0.9vw,20px)] font-semibold text-white/90 xl:flex"
        >
          <div className="flex items-center gap-[clamp(8px,1vw,20px)] opacity-0">
            {WORLD_CLOCK_ZONES.map(({ key, label }) => (
              <span key={key}>
                {worldTimes ? `(${label}) ${worldTimes[key]}` : " "}
              </span>
            ))}
          </div>
          <PlantYourSeedButton className="whitespace-nowrap opacity-0" />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="text-white opacity-0 xl:hidden"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileOverlayVariants}
            className="fixed inset-0 z-0 h-dvh w-full overflow-hidden bg-black xl:hidden"
          >
            <Image
              src="/images/Home/Hero-banner-grids.png"
              alt=""
              fill
              sizes="100vw"
              className="pointer-events-none select-none object-cover opacity-[0.06]"
            />

            <div className="relative flex h-full flex-col justify-between overflow-y-auto px-8 pt-32 pb-10">
              <motion.ul
                variants={mobileListVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                {NAV_LINKS.map(({ label, href }, index) => {
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      variants={mobileItemVariants}
                      className="border-b border-white/10 py-4 first:pt-0"
                    >
                      <Link
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center justify-between gap-4 font-anton-sc text-[clamp(28px,9vw,44px)] uppercase leading-none transition-colors duration-300 ${
                          isActive ? "text-[#AC40FF]" : "text-white/90 hover:text-white"
                        }`}
                      >
                        {label}
                        <span
                          aria-hidden
                          className={`font-poppins text-xs font-semibold transition-colors duration-300 ${
                            isActive
                              ? "text-[#AC40FF]"
                              : "text-white/30 group-hover:text-white/60"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-6 border-t border-white/10 pt-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    {SOCIALS.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-white/50 transition-colors duration-300 hover:text-[#AC40FF]"
                      >
                        <Icon size={18} />
                      </Link>
                    ))}
                  </div>
                  {worldTimes && (
                    <span className="font-poppins text-sm font-semibold text-white/50">
                      (NYC) {worldTimes.nyc}
                    </span>
                  )}
                </div>

                <PlantYourSeedButton
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-center"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
