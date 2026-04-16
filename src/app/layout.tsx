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
  title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
  description:
    "Portfolio von Samuel Djommou Thengho, Cloud & DevOps Engineer und Fullstack-Entwickler. Expertise in Azure/STACKIT/AWS-Infrastruktur, Security und Next.js/Python-Architekturen.",
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "Fullstack",
    "Terraform",
    "Azure",
    "STACKIT",
    "AWS",
    "Kubernetes",
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
    title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
    description:
      "Konzeption, Security und Deployment hochverfugbarer Systeme.",
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
