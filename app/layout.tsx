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
  applicationName: "Crimsonpolarbear Film Production",
  authors: [{ name: "Forest Wise", url: "https://crimsonpolarbear.com/crew" }],
  generator: "Next.js",
  keywords: [
    "film production",
    "independent films",
    "documentaries",
    "Cambodia",
    "storytelling",
    "cinema",
    "movies",
    "A Cambodian Winter",
    "Clever Creatures",
    "Hail Tiger King",
    "Slowmotion Superstars",
    "film services",
    "production services",
    "Southeast Asian cinema",
    "Siem Reap"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Forest Wise",
  publisher: "Crimsonpolarbear© Films",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: "entertainment",
  openGraph: {
    type: "website",
    siteName: "Crimsonpolarbear©",
    title: "Crimsonpolarbear© Films | Independent Film Production",
    description: "Crafting compelling narratives through innovative filmmaking in Southeast Asia. Explore our films, documentaries, and production services.",
    url: "https://crimsonpolarbear.com",
    determiner: "the",
    locale: "en_US",
    alternateLocale: ["km_KH"],
    countryName: "Cambodia",
    emails: ["contact@crimsonpolarbear.com"],
    phoneNumbers: ["+855 XXX XXX XXX"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crimsonpolarbear© Films - Independent Film Production",
        type: "image/png",
        secureUrl: "https://crimsonpolarbear.com/og-image.png"
      },
      {
        url: "/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png",
        width: 1200,
        height: 630,
        alt: "A Cambodian Winter Trilogy - Feature Film Series",
        type: "image/png",
        secureUrl: "https://crimsonpolarbear.com/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png"
      }
    ],
    videos: [
      {
        url: "https://vimeo.com/237324792",
        width: 1920,
        height: 1080,
        type: "video/mp4"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@crimsonpolarbear",
    creator: "@crimsonpolarbear",
    creatorId: "1234567890",
    title: "Crimsonpolarbear© Films | Independent Cinema from Cambodia",
    description: "Discover our unique storytelling through film. Based in Siem Reap, creating independent films with purpose & soul.",
    images: [
      {
        url: "/og-image.png",
        alt: "Crimsonpolarbear© Films - Visual Storytelling",
        width: 1200,
        height: 630
      },
      {
        url: "/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png",
        alt: "A Cambodian Winter Trilogy",
        width: 1200,
        height: 630
      }
    ],
  },
  other: {
    "facebook-domain-verification": "your-facebook-domain-verification-code",
    "google-site-verification": "your-google-site-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "baidu-site-verification": "your-baidu-verification-code",
    "yandex-verification": "your-yandex-verification-code",
    "pinterest": "your-pinterest-verification-code",
    "fb:app_id": "your-facebook-app-id",
    "fb:admins": "your-facebook-admin-id"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/launch.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://crimsonpolarbear.com",
    languages: {
      'en-US': 'https://crimsonpolarbear.com',
      'km-KH': 'https://crimsonpolarbear.com/km'
    },
    media: {
      'only screen and (max-width: 640px)': 'https://m.crimsonpolarbear.com'
    }
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["contact@crimsonpolarbear.com"],
      "facebook-domain-verification": ["your-facebook-domain-verification"]
    },
  },
  appleWebApp: {
    capable: true,
    title: "Crimsonpolarbear Films",
    statusBarStyle: "black-translucent",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
      },
      {
        url: "/apple-splash-1668-2388.png",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
      },
      {
        url: "/apple-splash-1536-2048.png",
        media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
      },
      {
        url: "/apple-splash-1125-2436.png",
        media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
      }
    ]
  },
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
