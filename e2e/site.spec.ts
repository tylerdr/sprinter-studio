import { expect, test } from '@playwright/test'
import { instant } from '@next/playwright'
import { archivedVentures, ventures } from '../app/data/ventures'

test('home exposes the Studio role without overstating venture proof', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.getByText(/published while unproven/i).first()).toBeVisible()
  await expect(page.locator('main')).toHaveCount(1)
})

test('home is instant on initial load', async ({ page, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop-only Instant Navigation check')
  await instant(
    page,
    async () => {
      await page.goto('/')
      await expect(page.locator('h1')).toBeVisible()
    },
    { baseURL },
  )
})

test('home to playbook is instant on client navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop-only navigation check')
  await page.goto('/')
  await instant(page, async () => {
    await page
      .locator('nav a[href="/playbook"]')
      .first()
      .click()
    await page.waitForURL((url) => url.pathname === '/playbook')
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /Amble → Sprint → Sail is a decision system/i,
      }),
    ).toBeVisible()
  })
})

test('partner incubations have their own tracked inquiry route', async ({ page }) => {
  await page.goto('/')
  const cta = page.locator('#partner-incubations a[href^="mailto:"]')
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('data-analytics-event', 'outbound_click')
})

test('playbook diagram shows one layout at every width; marker is hidden at rest', async ({ page }) => {
  await page.goto('/playbook')
  const diagram = page.getByRole('img', { name: /decision framework/i })
  await expect(diagram.locator('svg:visible')).toHaveCount(1)
  // Playwright runs with reducedMotion: 'reduce'
  for (const marker of await page.locator('.pd-marker').all()) {
    await expect(marker).toBeHidden()
  }
})

test('venture records link only to live destinations', async ({ page }) => {
  // An entry that links its own domain must be marked live, never archived or offline.
  for (const venture of ventures.filter((v) => v.url?.includes(v.domain))) {
    expect(venture.stage, venture.slug).not.toBe('archived')
    // "offline kit" describes a downloadable product, not a site that is down.
    expect(venture.status, venture.slug).not.toMatch(/\boffline\b(?!\s+(?:tool)?kit)/i)
  }

  await page.goto('/ventures/portcoaudit')
  await expect(page.locator('main a[href="https://portcoaudit.com"]')).toBeVisible()
  await expect(page.locator('main')).not.toContainText(/retired/i)

  for (const venture of archivedVentures) {
    await page.goto(`/ventures/${venture.slug}`)
    await expect(page.locator(`main a[href*="${venture.domain}"]`)).toHaveCount(0)
  }
})

test('niche ventures are labeled standalone brands, not Sprinter offers', async ({ page }) => {
  const niche = ventures.filter((v) => v.standaloneBrand).map((v) => v.slug)
  expect(niche.sort()).toEqual(['getfoundinchat', 'portcoaudit'])

  for (const slug of niche) {
    await page.goto(`/ventures/${slug}`)
    const main = page.locator('main')
    await expect(main.getByText('Standalone brand · backed by Sprinter')).toBeVisible()
    await expect(
      main.getByText('Its offers and prices are its own; they are not Sprinter offers.'),
    ).toBeVisible()
  }
})

test('build door routes to the Product Wedge Review; routing block names no niche brand', async ({ page }) => {
  await page.goto('/')
  const routes = page.locator('#working-with-sprinter')
  const door = routes.locator(
    'a[href="https://sprinter.ai/product-wedge-review?utm_source=studio&utm_medium=site"]',
  )
  await expect(door).toBeVisible()
  await expect(door).toContainText('Funding a product of your own?')
  await expect(door).toHaveAttribute('data-analytics-event', 'outbound_click')
  await expect(routes).not.toContainText(/portco|getfoundinchat/i)

  await expect(
    page.locator('#partner-incubations a[href^="https://sprinter.ai/product-wedge-review"]'),
  ).toContainText('Want to fund and own the build instead?')
})

test('mobile navigation opens and remains usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only menu check')
  await page.goto('/')
  await page.getByRole('button', { name: /open menu/i }).click()
  await expect(page.locator('#studio-mobile-nav')).toBeVisible()
  await expect(page.locator('#studio-mobile-nav a[href="/playbook"]')).toBeVisible()
})

test('header routes to the on-page Work with Sprinter router, not a single offer', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop header check')
  await page.goto('/ventures/closekit')
  const cta = page.locator('header a', { hasText: 'Work with Sprinter' })
  await expect(cta).toHaveAttribute('href', '/#working-with-sprinter')
  await expect(page.locator('header')).not.toContainText('Executive AI Accelerator')

  await page.goto('/')
  const routes = page.locator('#working-with-sprinter')
  await expect(routes.locator('a[href^="https://sprinterconsulting.com/executive-ai-accelerator"]')).toBeVisible()
  await expect(routes.locator('a[href^="https://sprinterdataworks.com"]')).toBeVisible()
  await expect(routes.locator('a[href^="mailto:hi@sprinter.ai"]')).toBeVisible()
})

test('footer lists the four-site Sprinter family with the canonical lines', async ({ page }) => {
  await page.goto('/playbook')
  const family = page.locator('footer section[aria-labelledby="sprinter-family"]')
  await expect(family.getByRole('heading', { name: 'The Sprinter family' })).toBeVisible()
  for (const line of [
    'Vertical AI products, built with the people who know the work.',
    'Hands-on AI enablement and workflow implementation for leaders and operating teams.',
    'Understand, prepare and license your business data to help fund your AI work.',
    'Our venture studio: partner incubations and internal experiments, published in public.',
  ]) {
    await expect(family.getByText(line)).toBeVisible()
  }
  await expect(family.locator('li')).toHaveCount(4)
})
