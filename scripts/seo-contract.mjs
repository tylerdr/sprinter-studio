#!/usr/bin/env node

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(ROOT, relativePath), 'utf8')

const nextConfig = read('next.config.ts')
const layout = read('app/layout.tsx')
const sitemap = read('app/sitemap.ts')
const robots = read('app/robots.ts')

assert.match(nextConfig, /value:\s*['"]www\.sprinter\.studio['"]/)
assert.match(nextConfig, /destination:\s*['"]https:\/\/sprinter\.studio\/:path\*['"]/)
assert.match(nextConfig, /www\.sprinter\.studio[\s\S]*?permanent:\s*true/)

assert.match(layout, /metadataBase:\s*new URL\(['"]https:\/\/sprinter\.studio['"]\)/)
assert.match(layout, /alternates:\s*\{\s*canonical:\s*['"]\/['"]\s*\}/)
assert.match(layout, /['"]@type['"]:\s*['"]Organization['"]/)
assert.match(layout, /['"]@type['"]:\s*['"]WebSite['"]/)

assert.doesNotMatch(sitemap, /lastModified/)
assert.doesNotMatch(sitemap, /new Date\(/)
assert.match(sitemap, /const baseUrl = ['"]https:\/\/sprinter\.studio['"]/)

assert.match(robots, /host:\s*baseUrl/)
assert.match(robots, /disallow:\s*['"]\/api\/['"]/)
assert.match(robots, /sitemap:\s*`\$\{baseUrl\}\/sitemap\.xml`/)

process.stdout.write('Sprinter Studio SEO contract PASS\n')
