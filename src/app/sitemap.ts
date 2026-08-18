import type { MetadataRoute } from 'next';

// The app only exposes one crawlable URL: sections (Works, Chronicle, Summon,
// Tome) are client-side view state inside <Portfolio />, not routed pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shikkari.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
