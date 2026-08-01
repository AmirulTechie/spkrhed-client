"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoaderDuration } from "@/components/loader/LoaderTimingContext";
import { submitContactForm } from "@/lib/contact-form";

const DESCRIPTION_TEXT =
  "Whether you want to book a discovery call, explore a partnership, or simply ask a question — we genuinely look forward to hearing from you.";

const FIELDS = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "phone", label: "Phone", type: "tel" },
];

// Splits on words, keeping spaces as real text nodes between word-spans, and
// wraps each character in an individually animatable, opacity-only span —
// the typewriter treatment used across the other page heroes.
function TypewriterChars({ text, mirrorChar }) {
  const words = text.split(" ");
  const nodes = [];

  words.forEach((word, wi) => {
    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span
            key={ci}
            className={`typewriter-char inline-block opacity-0 ${
              char === mirrorChar ? "scale-x-[-1]" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </span>,
    );
    if (wi < words.length - 1) nodes.push(" ");
  });

  return nodes;
}

function SendArrowIcon({ className = "" }) {
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

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactHero() {
  const { total: loaderDuration } = useLoaderDuration();
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const emailRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  useLayoutEffect(() => {
    const typewriterChars = [
      ...headingRef.current.querySelectorAll(".typewriter-char"),
    ];

    const ctx = gsap.context(() => {
      gsap.set(typewriterChars, { opacity: 0 });
      gsap.set([descriptionRef.current, emailRef.current], {
        opacity: 0,
        y: 24,
      });
      gsap.set(formRef.current, { opacity: 0, x: 60 });

      gsap
        .timeline({ delay: loaderDuration })
        .to(typewriterChars, {
          opacity: 1,
          duration: 0.01,
          stagger: 0.02,
          ease: "none",
        })
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        )
        .to(
          emailRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        )
        .to(
          formRef.current,
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
    });

    return () => ctx.revert();
  }, [loaderDuration]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    try {
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        website: data.hp_confirm_2x,
        turnstileToken: data["cf-turnstile-response"],
      });
      setStatus("success");
      form.reset();
      window.turnstile?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden bg-black lg:items-end">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          async
          defer
        />
      )}

      <Image
        src="/images/Home/hero-banner-plain.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <Image
        src="/images/Home/Hero-banner-grids.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[45%] bg-linear-to-b from-black to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent to-black"
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-y-12 px-8 py-[clamp(96px,14vw,120px)] text-white sm:px-12 lg:grid-cols-2 lg:items-end lg:gap-x-[clamp(48px,8vw,120px)] lg:px-16 lg:py-[clamp(64px,8vw,112px)]">
        <div className="flex flex-col items-start">
          <h1
            ref={headingRef}
            className="font-anton-sc text-[clamp(40px,5.5556vw,80px)] uppercase leading-[0.97]"
          >
            <span className="block">
              <TypewriterChars text="Contact" />
            </span>
            <span className="block">
              <TypewriterChars text="SPKRHED" mirrorChar="E" />
            </span>
          </h1>

          <p
            ref={descriptionRef}
            className="mt-[clamp(16px,2.2222vw,32px)] max-w-121 font-poppins text-[clamp(15px,1.25vw,18px)] font-light leading-[1.35] text-white/80"
          >
            {DESCRIPTION_TEXT}
          </p>

          <div
            ref={emailRef}
            className="mt-[clamp(32px,4.4444vw,64px)] flex flex-col gap-1"
          >
            <p className="font-poppins text-sm font-light text-white/50">
              Email
            </p>
            <Link
              href="mailto:info@speakerhead.com"
              className="font-poppins text-lg text-white/90 transition-colors duration-300 hover:text-[#AC40FF]"
            >
              info@speakerhead.com
            </Link>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-[clamp(24px,3.3vw,40px)] lg:max-w-162"
        >
          {FIELDS.map(({ id, label, type }) => (
            <div
              key={id}
              className="border-b border-white/25 pb-3 transition-colors duration-300 focus-within:border-white"
            >
              <label htmlFor={id} className="sr-only">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={label}
                required={id !== "phone"}
                className="w-full bg-transparent font-poppins text-[clamp(18px,1.7361vw,25px)] font-light text-white placeholder-white/40 outline-none"
              />
            </div>
          ))}

          <div className="border-b border-white/25 pb-3 transition-colors duration-300 focus-within:border-white">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              required
              rows={1}
              className="w-full resize-none bg-transparent font-poppins text-[clamp(18px,1.7361vw,25px)] font-light text-white placeholder-white/40 outline-none"
            />
          </div>

          {/* Honeypot: hidden from real users, bots that auto-fill every field trip it.
              Field name deliberately avoids autofill-recognizable words like "website"
              or "url" — browser/password-manager autofill was populating it for real
              users, silently dropping their submissions. */}
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="hp_confirm_2x">Leave this field empty</label>
            <input
              id="hp_confirm_2x"
              name="hp_confirm_2x"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              data-lpignore="true"
              data-1p-ignore="true"
              data-bwignore="true"
            />
          </div>

          {turnstileSiteKey && (
            <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="dark" />
          )}

          <div className="mt-[clamp(8px,1.1vw,16px)] flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex cursor-pointer items-center gap-5 rounded-full border border-white px-10 py-3.5 font-poppins text-[clamp(18px,1.6667vw,24px)] font-semibold uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">
                {status === "submitting" ? "Sending" : "Send"}
              </span>
              <SendArrowIcon className="h-3 w-9 transition-transform duration-300 ease-out group-hover:-translate-x-2" />
            </button>

            {status === "success" && (
              <p className="font-poppins text-sm text-white/70">
                Thanks — we&rsquo;ll be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="font-poppins text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
