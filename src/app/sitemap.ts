import type { MetadataRoute } from 'next'
import { getEvents } from '@/lib/events'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://festivals-morocco.vercel.app'
  const locales = ['en', 'fr', 'es', 'ar']
  const events = getEvents()

  // Static pages
  const staticPages = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/${locale}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}/regions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  // Event pages
  const eventPages = events.flatMap((event) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/event/${event.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  )

  return [...staticPages, ...eventPages]
}
