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
  title: "Samuel Djommou Thengho — Cloud & DevOps Engineer | Fullstack Developer",
  description:
    "Portfolio of Samuel Djommou Thengho — Cloud & DevOps Engineer and Fullstack Developer based in Hamburg. 5+ years building secure, production-grade systems.",
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "Fullstack Developer",
    "Azure",
    "Kubernetes",
    "Docker",
    "Next.js",
    "React",
    "Hamburg",
  ],
  authors: [{ name: "Samuel Djommou Thengho" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Samuel Djommou Thengho — Cloud & DevOps | Fullstack",
    description:
      "5+ years building secure, production-grade cloud infrastructure and fullstack applications.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#060810] text-[#f0f2f8]">
        {children}
      </body>
    </html>
  );
}
