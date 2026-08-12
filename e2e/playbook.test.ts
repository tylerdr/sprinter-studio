import { test, expect } from '@playwright/test'
import { instant } from '@next/playwright'

const BANNED_PHRASES = ['$50K MRR', '$10K MRR', '$1K MRR', 'AI Agents Run Everything', 'in real time']

test.describe('Playbook (/playbook)', () => {
  test('is instant and free of MRR-target and autonomy claims', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/playbook')
        await expect(page.locator('h1')).toContainText('The Anti-Hustle Thesis')
      },
      { baseURL },
    )

    const bodyText = await page.locator('body').innerText()
    for (const phrase of BANNED_PHRASES) {
      expect(bodyText).not.toContain(phrase)
    }
  })
})

test.describe('Co-build (/co-build)', () => {
  test('is instant and states the fit criteria', async ({ page, baseURL }) => {
    await instant(
      page,
      async () => {
        await page.goto('/co-build')
        await expect(page.locator('h1')).toContainText('Propose a product wedge')
        await expect(page.getByText('This fits if')).toBeVisible()
        await expect(page.getByText("This doesn't fit if")).toBeVisible()
      },
      { baseURL },
    )
  })
})
