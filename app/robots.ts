import type { MetadataRoute } from 'next'

const baseUrl = 'https://sprinter.studio'

/**
 * AI answer engines and LLM crawlers get explicit allow groups (web family
 * brief, 2026-11-23). A named group ignores the `*` group, so each one
 * repeats the /api/ disallow.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: aiCrawlers,
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
