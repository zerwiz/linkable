import { MetadataRoute } from "next";

const baseUrl = "https://linkable.se";
const locales = ["en", "sv"] as const;
const pages = ["", "projects", "how-it-works", "why-linkable"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const path = page ? `/${page}` : "";
    const url = `${baseUrl}${path}`;

    const alternates: Record<string, string> = {};
    for (const locale of locales) {
      alternates[locale] = `${baseUrl}/${locale}${path}`;
    }

    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
      alternates: { languages: alternates },
    });

    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
