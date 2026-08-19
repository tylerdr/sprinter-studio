import { expect, test } from '@playwright/test'
import { instant } from '@next/playwright'

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

test('mobile navigation opens and remains usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only menu check')
  await page.goto('/')
  await page.getByRole('button', { name: /open menu/i }).click()
  await expect(page.locator('#studio-mobile-nav')).toBeVisible()
  await expect(page.locator('#studio-mobile-nav a[href="/playbook"]')).toBeVisible()
})
