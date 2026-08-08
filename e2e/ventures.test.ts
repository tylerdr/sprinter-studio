import { test, expect } from '@playwright/test'
import { instant } from '@next/playwright'
import { listedVentures } from '../app/data/ventures'

test.describe('Ventures index (/ventures)', () => {
  test('is instant and shows one card per listed venture', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/ventures')
        await expect(page.locator('h1')).toContainText('Ventures')
      },
      { baseURL },
    )

    if (listedVentures.length === 0) {
      await expect(page.getByText('No portfolio items are listed publicly right now.')).toBeVisible()
    } else {
      await expect(page.getByRole('link').filter({ hasText: 'Last verified' })).toHaveCount(listedVentures.length)
    }
  })
})

test.describe('Venture detail (/ventures/[slug])', () => {
  test('renders a listed venture with a public state and evidence section', async ({ page }) => {
    test.skip(listedVentures.length === 0, 'No ventures are publicly listed yet — nothing to assert on.')
    const venture = listedVentures[0]
    await page.goto(`/ventures/${venture.slug}`)
    await expect(page.locator('h1')).toContainText(venture.name)
    await expect(page.getByText('Evidence')).toBeVisible()
    await expect(page.getByText(`Last verified ${venture.lastVerified}`)).toBeVisible()
  })

  test('an unknown slug returns a real 404', async ({ page }) => {
    const response = await page.goto('/ventures/this-slug-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toContainText('This venture is not publicly listed.')
  })
})
