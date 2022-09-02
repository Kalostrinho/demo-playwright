import { test, expect } from '@playwright/test'
import { info, pass, warning } from '../utils/logger'
import { PlaywrightPage } from '../pages/Playwright.page'
let pwPage: PlaywrightPage

/**
 * Demo suite for Playwright páge
 */
test.describe('Playwright demo suite', () => {

  test.beforeEach(async ({ page }) => { 
      pwPage = new PlaywrightPage(page)
      await pwPage.open()
  })

  test('should open Playwright page', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/)
    await expect(pwPage.hasGetStartedLink()).toBeTruthy()
  })

  test('should navigate to the documentation introduction', async ({ page }) => {
    await pwPage.navigateToGetStarted()
    await expect(pwPage.hasInstallationTitle()).toBeTruthy()
    // Alternatively... 
    await expect(page).toHaveURL(/.*docs\/intro.*/)
  })
})
