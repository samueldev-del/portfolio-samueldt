import type { MetadataRoute } from "next";

/**
 * Both language versions are listed, each declaring the other as its alternate,
 * so a crawler that finds one is told the other exists rather than treating it
 * as a duplicate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "de-DE": "https://samueldt.com",
    "en-GB": "https://samueldt.com/en",
  };

  return [
    {
      url: "https://samueldt.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: "https://samueldt.com/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
