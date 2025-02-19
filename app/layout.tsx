import "../global.css";
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import NavigationWrapper from "./components/navigation-wrapper";
import FooterWrapper from "./components/footer-wrapper";

export const metadata: Metadata = {
  metadataBase: new URL('https://crimsonpolarbear.com'),
  title: {
    default: "Crimsonpolarbear© | Independent Film Production",
    template: "%s | Crimsonpolarbear©"
  },
  description: "Independent film production company crafting compelling narratives through innovative filmmaking. Specializing in feature films, documentaries, and television shows with purpose & soul.",
  openGraph: {
    title: "Crimsonpolarbear© Films",
    description: "Independent Film Production - Crafting Stories with Purpose",
    url: "https://crimsonpolarbear.com",
    siteName: "Crimsonpolarbear©",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "Crimsonpolarbear© Films"
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Crimsonpolarbear© Films",
    card: "summary_large_image",
    creator: "@crimsonpolarbear",
    images: ["/og-image.png"],
  },
  icons: {
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  keywords: ["film production", "independent films", "documentaries", "Cambodia", "storytelling", "cinema", "movies"],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={[inter.variable, calSans.variable].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <div className="relative min-h-screen">
          {/* Global background effects */}
          <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-zinc-900/90 pointer-events-none" />
          <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
          
          {/* Navigation */}
          <NavigationWrapper />
          
          {/* Main content */}
          <main className="relative">
            {children}
          </main>

          {/* Footer */}
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
