import { test, expect } from '@playwright/test'
import { instant } from '@next/playwright'

const BANNED_PHRASES = [
  'Zero Employees',
  'zero employees',
  'Math works in your favor',
  '24/7',
  'autonomous',
  'dozens',
  'AI Venture Factory',
  'every venture is real',
]

test.describe('Home (/)', () => {
  test('is instant on an initial page load and carries the truth-labeled positioning', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/')
        await expect(page.locator('h1')).toContainText('labeled honestly')
        await expect(page.getByRole('link', { name: 'Propose a product wedge' })).toBeVisible()
      },
      { baseURL },
    )

    const bodyText = await page.locator('body').innerText()
    for (const phrase of BANNED_PHRASES) {
      expect(bodyText).not.toContain(phrase)
    }
  })

  test('links to /ventures and /co-build', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'Ventures', exact: true }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Co-build', exact: true }).first()).toBeVisible()
  })
})
