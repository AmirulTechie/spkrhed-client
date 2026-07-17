#!/usr/bin/env node
/**
 * Screenshot a route (or one element on it) from the local dev server.
 *
 * Usage:
 *   node scripts/screenshot.js <path> [selector] [outFile]
 *
 * Examples:
 *   node scripts/screenshot.js /services
 *   node scripts/screenshot.js /services "section:last-of-type"
 *   node scripts/screenshot.js /services "#pricing" scripts/.screenshots/pricing.png
 *
 * Env vars:
 *   BASE_URL          default http://localhost:3000 (dev server must already be running)
 *   CHROME_PATH       path to a Chrome/Chromium/Edge executable (auto-detected if unset)
 *   SCREENSHOT_SETTLE_MS  extra wait after network-idle for animations/loaders (default 4000)
 */
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");

const CANDIDATE_CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
];

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const found = CANDIDATE_CHROME_PATHS.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      "No Chrome/Edge executable found. Set CHROME_PATH to your browser's executable.",
    );
  }
  return found;
}

async function main() {
  const [, , routePath, selector, outFileArg] = process.argv;
  if (!routePath) {
    console.error("Usage: node scripts/screenshot.js <path> [selector] [outFile]");
    process.exit(1);
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const settleMs = Number(process.env.SCREENSHOT_SETTLE_MS || 4000);
  const url = new URL(routePath, baseUrl).toString();

  const slug =
    (routePath.replace(/^\/|\/$/g, "") || "home").replace(/[^\w-]+/g, "-") +
    (selector ? "--" + selector.replace(/[^\w-]+/g, "-") : "");
  const outFile = outFileArg || path.join("scripts", ".screenshots", `${slug}.png`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
    defaultViewport: { width: 1440, height: 1000 },
  });

  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
    });

    await page.goto(url, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, settleMs));

    if (selector) {
      await page.waitForSelector(selector, { timeout: 10000 });
      // Puppeteer's `clip` is relative to the full document, not the
      // current scroll position — so no scrolling is needed at all, which
      // sidesteps both the Lenis-fights-scrollIntoView problem and the old
      // bug where resizing the viewport to fit the element reflowed any
      // h-screen/100vh ancestor earlier on the page and shifted everything
      // below it before the shot was taken.
      const clip = await page.evaluate((sel) => {
        const r = document.querySelector(sel).getBoundingClientRect();
        return {
          x: r.left + window.scrollX,
          y: r.top + window.scrollY,
          width: r.width,
          height: r.height,
        };
      }, selector);
      await page.screenshot({ path: outFile, clip });
    } else {
      await page.screenshot({ path: outFile, fullPage: true });
    }

    console.log(`Saved: ${outFile}`);
    const realErrors = errors.filter((e) => !e.includes("favicon.ico"));
    if (realErrors.length) {
      console.log("Console/page errors:");
      realErrors.forEach((e) => console.log(" -", e));
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
