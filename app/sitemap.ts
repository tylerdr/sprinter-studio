import { ventures } from '@/app/data/ventures'
import type { MetadataRoute } from 'next'

const baseUrl = 'https://sprinter.studio'

export default function sitemap(): MetadataRoute.Sitemap {
  // A deploy is not a content modification. Venture records do not yet own an updatedAt field, so
  // omit lastmod until the ledger can publish a real substantive review clock per entry.
  const venturePages = ventures.map((venture) => ({
    url: `${baseUrl}/ventures/${venture.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/playbook`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...venturePages,
  ]
}
