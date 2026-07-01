import { ventures } from '@/app/data/ventures'
import type { MetadataRoute } from 'next'

const lastModified = new Date('2026-07-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sprinter.studio'

  const venturePages = ventures.map((v) => ({
    url: `${baseUrl}/ventures/${v.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/playbook`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...venturePages,
  ]
}
