import { listedVentures } from '@/app/data/ventures'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sprinter.studio'
  const homeLastModified = listedVentures.reduce(
    (latest, v) => (v.lastVerified > latest ? v.lastVerified : latest),
    '2026-08-07',
  )

  const venturePages = listedVentures.map((v) => ({
    url: `${baseUrl}/ventures/${v.slug}`,
    lastModified: new Date(v.lastVerified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(homeLastModified),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ventures`,
      lastModified: new Date(homeLastModified),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/co-build`,
      lastModified: new Date('2026-08-07'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/playbook`,
      lastModified: new Date('2026-08-07'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...venturePages,
  ]
}
