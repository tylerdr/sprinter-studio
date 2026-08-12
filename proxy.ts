import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { listedVentures } from '@/app/data/ventures'

const listedSlugs = new Set(listedVentures.map((venture) => venture.slug))

export function proxy(request: NextRequest) {
  const slug = decodeURIComponent(request.nextUrl.pathname.slice('/ventures/'.length))

  if (slug && !slug.includes('/') && !listedSlugs.has(slug)) {
    return new NextResponse(
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Venture not found</title></head><body><main><p>404</p><h1>This venture is not publicly listed.</h1><p>Sprinter Studio only publishes portfolio records with a current public state and evidence.</p><p><a href="/ventures">View the public portfolio</a> · <a href="/">Back to Sprinter Studio</a></p></main></body></html>',
      {
        status: 404,
        headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
      },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/ventures/:slug',
}
