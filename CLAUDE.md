# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js version warning

This project runs **Next.js 16.2.10** — newer than your training data, with breaking changes to APIs, conventions, and file structure. Before writing App Router code (routing, metadata, data fetching, config), check `node_modules/next/dist/docs/` (especially `01-app/`) rather than relying on prior knowledge. Heed any deprecation notices found there.

## Commands

```
npm run dev      # start dev server
npm run build     # production build
npm run start     # run production build
npm run lint      # eslint (eslint-config-next/core-web-vitals)
```

There is no test suite configured.

## Stack

- Next.js App Router, JSX only — no TypeScript
- Tailwind CSS v4 (imported via `@import "tailwindcss"` in `src/app/globals.css`, no tailwind.config file)
- React Compiler enabled (`reactCompiler: true` in `next.config.mjs`, via `babel-plugin-react-compiler`)
- GSAP + ScrollTrigger for scroll animations
- Lenis for smooth scrolling
- Deploy target: Vercel
- Path alias `@/*` → `./src/*` (see `jsconfig.json`)

## Architecture

- App Router pages live under `src/app/<route>/page.jsx` (route folders: `about`, `services`, `work`; home is `src/app/page.js`). Page components are currently placeholder shells.
- Root layout is `src/app/layout.js`. It still has the default `create-next-app` scaffolding (Geist fonts, generic metadata) — this needs to be replaced with the project's actual fonts (Poppins / Anton SC / Playwrite US Trad via `next/font`) and per-page metadata.
- Shared components go in `src/components/<component-name>/`, e.g. `src/components/navbar/Navbar.jsx` (currently empty, not yet wired into the layout).
- Page-specific images go in `public/images/[page-name]/` (e.g. `public/images/Home/`).
- Large hero videos are hosted on Cloudinary, never committed locally.

## Pages

1. Home
2. About
3. Services
4. Portfolio (route: `work`)

## Design System

Fonts (load via `next/font`):
- Poppins — body text / UI
- Anton SC — bold display headings
- Playwrite US Trad — accent/decorative text

## Contact Form

Backend is TBD. Build the form UI now; keep submission logic decoupled (e.g. an isolated handler/service boundary) so swapping in a real backend later doesn't require UI changes.

## Rules

- No TypeScript, no ShadCN/Chakra
- Always use `next/image` for images, `next/font` for fonts
- Per-page metadata export for SEO (title, description, OG tags)
- Semantic HTML throughout
- Components in `src/components/`, page images in `public/images/[page-name]/`
- Large hero videos hosted on Cloudinary, never local
- Compress all images (Squoosh/TinyPNG) before importing
