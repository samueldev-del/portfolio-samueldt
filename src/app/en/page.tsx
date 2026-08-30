import type { Metadata } from "next";

import PortfolioClient from "@/components/PortfolioClient";

/**
 * The same page, opened in English.
 *
 * The language toggle is client state, so a single URL can only ever carry one
 * set of meta tags. This route exists so the English description is a real,
 * indexable document rather than something a crawler has to infer — it renders
 * the identical component with the toggle already flipped, and the two pages
 * declare each other through `alternates.languages`.
 */
export const metadata: Metadata = {
  title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
  description:
    "Cloud & DevOps Engineer in Hamburg — from the commit to the alarm: CI/CD with GitHub Actions, Terraform on AWS, Kubernetes with Helm and ArgoCD, monitoring with Prometheus and Grafana.",
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
  alternates: {
    canonical: "/en",
    languages: {
      "de-DE": "/",
      "en-GB": "/en",
    },
  },
  openGraph: {
    title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
    description:
      "CI/CD, infrastructure as code and GitOps: GitHub Actions and Terraform on AWS, Kubernetes with Helm and ArgoCD, observability with Prometheus and Grafana.",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["de_DE"],
    url: "https://samueldt.com/en",
    siteName: "Portfolio Samuel DT",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Preview of Samuel's portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Djommou Thengho | Cloud & DevOps Engineer",
    description:
      "CI/CD, infrastructure as code and GitOps: GitHub Actions and Terraform on AWS, Kubernetes with Helm and ArgoCD, observability with Prometheus and Grafana.",
    images: ["/og-image.png"],
  },
};

export default function HomeEnglish() {
  return <PortfolioClient initialLang="en" />;
}
