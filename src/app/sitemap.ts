import { MetadataRoute } from "next";
import { PROJECT_IDS } from "@/lib/projects";

const baseUrl = "https://linkable.se";
const locales = ["en", "sv", "fi"] as const;
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

  for (let i = 0; i < PROJECT_IDS.length; i++) {
    const numericId = String(i + 1);
    for (const locale of locales) {
      const path = `/projects/${numericId}`;
      const alternates: Record<string, string> = {};
      for (const loc of locales) {
        alternates[loc] = `${baseUrl}/${loc}${path}`;
      }

      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
