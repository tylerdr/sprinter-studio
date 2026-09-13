import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * The site's Fraunces / Geist / Geist Mono for ImageResponse. Satori needs
 * TTF/OTF (not woff2), so these are Latin subsets (~48KB total) of the
 * Google Fonts builds. Passing `fonts` replaces next/og's default font, so
 * Geist is loaded explicitly too.
 * ponytail: subset covers ASCII plus § · — ’ “ ” … → ≥; add codepoints if
 * venture copy grows beyond that.
 */
export async function loadOgFonts() {
  const dir = join(process.cwd(), 'assets/og-fonts')
  const [fraunces, geist, geistMono] = await Promise.all([
    readFile(join(dir, 'Fraunces-Medium-subset.ttf')),
    readFile(join(dir, 'Geist-Regular-subset.ttf')),
    readFile(join(dir, 'GeistMono-Regular-subset.ttf')),
  ])
  return [
    { name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' },
    { name: 'Geist', data: geist, weight: 400, style: 'normal' },
    { name: 'Geist Mono', data: geistMono, weight: 400, style: 'normal' },
  ] as const
}
