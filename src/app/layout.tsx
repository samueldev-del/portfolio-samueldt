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

/**
 * German is the document language, so the metadata here is German. The English
 * equivalents live on /en, which renders the same page with the toggle already
 * flipped — that is what gives search engines an English description to index
 * instead of a translated guess. Both pages point at each other through
 * `alternates.languages`.
 */
export const metadata: Metadata = {
  title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
  description:
    "Cloud & DevOps Engineer in Hamburg — vom Commit bis zum Alarm: CI/CD mit GitHub Actions, Terraform auf AWS, Kubernetes mit Helm und ArgoCD, Monitoring mit Prometheus und Grafana.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "Kubernetes",
    "Helm",
    "ArgoCD",
    "GitOps",
    "Prometheus",
    "Grafana",
    "PromQL",
    "Terraform",
    "AWS",
    "Ansible",
    "Docker",
    "CI/CD",
    "GitHub Actions",
    "STACKIT",
    "Hamburg",
    "Samuel Djommou Thengho",
  ],
  authors: [{ name: "Samuel Djommou Thengho" }],
  metadataBase: new URL("https://samueldt.com"),
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-GB": "/en",
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
    description:
      "CI/CD, Infrastructure as Code und GitOps: GitHub Actions und Terraform auf AWS, Kubernetes mit Helm und ArgoCD, Observability mit Prometheus und Grafana.",
    type: "website",
    locale: "de_DE",
    alternateLocale: ["en_GB"],
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
      "CI/CD, Infrastructure as Code und GitOps: GitHub Actions und Terraform auf AWS, Kubernetes mit Helm und ArgoCD, Observability mit Prometheus und Grafana.",
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
