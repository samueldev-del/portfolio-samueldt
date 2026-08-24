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
    "Portfolio von Samuel Djommou Thengho — Cloud & DevOps Engineer in Hamburg. Automatisierte Softwareauslieferung vom Commit bis zum Alarm: GitHub Actions, Terraform, AWS, Ansible, Kubernetes.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "Terraform",
    "STACKIT",
    "Docker",
    "Kubernetes",
    "Ansible",
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
      "Cloud & DevOps Engineer in Hamburg — CI/CD, Infrastructure as Code, Observability.",
    type: "website",
    locale: "de_DE",
    url: "https://samueldt.com",
    siteName: "Portfolio Samuel DT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Vorschau des Portfolios von Samuel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
    description:
      "Cloud & DevOps Engineer in Hamburg — CI/CD, Infrastructure as Code, Observability.",
    images: ["/og-image.png"],
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
