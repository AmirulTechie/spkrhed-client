import { Poppins, Anton_SC, Playwrite_US_Trad, Alex_Brush } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/smooth-scroll/SmoothScroll";
import ScrollToTopButton from "@/components/scroll-to-top/ScrollToTopButton";
import Loader from "@/components/loader/Loader";
import { LoaderTimingProvider } from "@/components/loader/LoaderTimingContext";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const antonSC = Anton_SC({
  variable: "--font-anton-sc",
  subsets: ["latin"],
  weight: "400",
});

const playwriteUSTrad = Playwrite_US_Trad({
  variable: "--font-playwrite-us-trad",
  weight: "400",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const DEFAULT_DESCRIPTION =
  "SPKRHED is not another agency. We are a movement to put the human back into how companies grow — real people, real conversations, real trust, starting on LinkedIn.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      suppressHydrationWarning
      lang="en"
      className={`${poppins.variable} ${antonSC.variable} ${playwriteUSTrad.variable} ${alexBrush.variable} min-h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col overflow-x-hidden bg-background text-foreground font-poppins"
      >
        <LoaderTimingProvider>
          <SmoothScroll>
            <Loader />
            <Navbar />
            {children}
            <Footer />
            <ScrollToTopButton />
          </SmoothScroll>
        </LoaderTimingProvider>
      </body>
    </html>
  );
}
