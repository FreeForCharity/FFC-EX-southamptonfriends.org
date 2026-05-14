import { test, expect } from '@playwright/test'

/**
 * Smoke tests for the Southampton Friends Meeting site.
 *
 * These confirm that the static export renders the core information a
 * visitor needs: who we are, when worship is, and how to find or contact us.
 */

test.describe('Home page', () => {
  test('renders the meeting name and welcome heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Southampton Friends Meeting/i)
    await expect(
      page.getByRole('heading', {
        name: /Southampton Monthly Meeting of the Religious Society of Friends/i,
      })
    ).toBeVisible()
  })

  test('shows Sunday worship time and meetinghouse address', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText(/10:00 AM/i).first()).toBeVisible()
    await expect(page.getByText(/710 Gravel Hill Road/i).first()).toBeVisible()
    await expect(page.getByText(/Southampton, PA 18966/i).first()).toBeVisible()
  })

  test('has a phone link to the meeting', async ({ page }) => {
    await page.goto('/')
    const phoneLink = page.locator('a[href="tel:+12153640581"]').first()
    await expect(phoneLink).toBeVisible()
  })

  test('links to Philadelphia Yearly Meeting and Bucks Quarterly Meeting', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="https://www.pym.org/"]').first()).toBeVisible()
    await expect(page.locator('a[href="http://www.quakersbucks.org/"]').first()).toBeVisible()
  })

  test('links to the meeting Facebook page', async ({ page }) => {
    await page.goto('/')
    const fb = page.locator('a[href*="facebook.com/SouthamptonQuakers"]').first()
    await expect(fb).toBeVisible()
  })

  test('has no console errors on load', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    expect(errors).toEqual([])
  })
})

test.describe('Policy pages', () => {
  test('privacy policy renders', async ({ page }) => {
    await page.goto('/privacy-policy')
    await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible()
  })

  test('terms of service renders', async ({ page }) => {
    await page.goto('/terms-of-service')
    await expect(page.getByRole('heading', { name: /Terms of Service/i })).toBeVisible()
  })
})
