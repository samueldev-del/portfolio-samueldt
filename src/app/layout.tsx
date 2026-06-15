import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samuel Djommou Thengho | Junior DevOps / Cloud Engineer",
  description:
    "Portfolio von Samuel Djommou Thengho — Quereinsteiger im DevOps-/Cloud-Bereich mit zertifizierten Grundlagen (STACKIT) und mehreren selbst deployten Live-Projekten. Next.js, Vercel, Docker, Kubernetes.",
  keywords: [
    "Junior DevOps",
    "Cloud Engineer",
    "Quereinsteiger",
    "STACKIT",
    "Azure",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Next.js",
    "Samuel Djommou Thengho",
  ],
  authors: [{ name: "Samuel Djommou Thengho" }],
  metadataBase: new URL("https://samueldt.com"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Samuel Djommou Thengho | Junior DevOps / Cloud Engineer",
    description:
      "Quereinsteiger im DevOps-Bereich — zertifizierte Grundlagen, Live-Projekte, ehrliches Profil.",
    type: "website",
    locale: "de_DE",
    url: "https://samueldt.com",
    siteName: "Portfolio Samuel DT",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Vorschau des Portfolios von Samuel",
      },
    ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#060810] text-[#f0f2f8]">
        {children}
      </body>
    </html>
  );
}
