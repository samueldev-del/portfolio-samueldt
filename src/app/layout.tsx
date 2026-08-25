import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * The display serif carries most of the warmth. Optical sizing is left to the
 * browser, and the soft axis is dialled up so the letterforms read closer to
 * letterpress than to a UI font.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

/** Matches the paper ground, so the browser chrome does not fight the page. */
export const viewport: Viewport = {
  themeColor: "#faf6f0",
};

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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full bg-paper text-ink-2">
        {children}
      </body>
    </html>
  );
}
