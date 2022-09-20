import { Locator, Page } from '@playwright/test'
import { BasePage } from './Base.page'
import { unnoticed } from '../utils/logger'

/**
 * A demo page just to show Page Object pattern capabilities 
 * on Playwright framework.
 */
export class PlaywrightPage extends BasePage {
    readonly page: Page
    readonly url: string
    readonly getStartedLink: Locator
    readonly homeLink: Locator
    readonly docsLink: Locator
    readonly apiLink: Locator
    readonly installationTitle: Locator
    readonly nextTopicLink: Locator

    /**
     * Initializes all locators
     * @param {Page} page - The class to interact with the page of the Browser context
     */
    constructor(page: Page) {
        super(page)
        this.page = page
        this.url = 'https://playwright.dev/'
        this.getStartedLink = page.locator('.getStarted_Sjon')
        this.homeLink = page.locator('.navbar__title')
        this.docsLink = page.locator('.navbar__link', { hasText: 'Docs'})
        this.apiLink = page.locator('.navbar__link', { hasText: 'API'})
        this.installationTitle = page.locator('h1:has-text("Installation")')
        this.nextTopicLink = page.locator('.pagination-nav__link--next')
    }

    /**
     * Launches the browser specified by the config and loads a URL
     */
    async open() {
        await super.open(this.url)
    }

    /**
     * Verifies whether the home link is visible
     * @returns {boolean} - Whether element is visible
     */
    async hasHomeLink():Promise<boolean> { 
        return await this.homeLink.isVisible()
    }

    /**
     * Verifies whether the docs link is visible
     * @returns {boolean} - Whether element is visible
     */
    async hasDocsLink():Promise<boolean> {
        return await this.docsLink.isVisible()
    }

    /**
     * Verifies whether the API link is visible
     * @returns {boolean} - Whether element is visible
     */
    async hasAPILink():Promise<boolean> {
        return await this.apiLink.isVisible()
    }

    /**
     * Verifies whether the "Get Started" link is visible
     * @returns {boolean} - Whether element is visible
     */
    async hasGetStartedLink():Promise<boolean> {
        return await this.getStartedLink.isVisible()
    }

    /**
     * Verifies whether the "Installation" title is visible
     * @returns {boolean} - Whether element is visible
     */
    async hasInstallationTitle():Promise<boolean> {
        return await this.installationTitle.isVisible()
    }

    /**
     * Navigates to the home page
     */
    async navigateToHome() {
        await this.homeLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await unnoticed('Clicked on the [Home] link...')
    }

    /**
     * Navigates to the "Get Started" page 
     */
    async navigateToGetStarted() {
        await this.getStartedLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await unnoticed('Clicked on the [Get Started] button...')
    }
        
}
