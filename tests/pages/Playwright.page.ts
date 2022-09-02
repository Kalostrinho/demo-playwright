import { Locator, Page } from '@playwright/test'
import { BasePage } from './Base.page'
import { unnoticed } from '../utils/logger'

export class PlaywrightPage extends BasePage {
    readonly page: Page
    readonly url: string
    readonly getStartedLink: Locator
    readonly homeLink: Locator
    readonly installationTitle: Locator
    readonly nextTopicLink: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.url = 'https://playwright.dev/'
        this.getStartedLink = page.locator('.getStarted_Sjon')
        this.homeLink = page.locator('.navbar__title')
        this.installationTitle = page.locator('text=Installation').first()  // << Locator strictness avoided 
        this.nextTopicLink = page.locator('.pagination-nav__link--next')
    }

    async open() {
        await super.open(this.url)
    }

    async hasGetStartedLink() {
        return await this.getStartedLink.isVisible()
    }

    async hasInstallationTitle() {
        return await this.installationTitle.isVisible()
    }

    async navigateToGetStarted() {
        await this.getStartedLink.click()
        await this.page.waitForLoadState('domcontentloaded')
        await unnoticed('Clicked on the [Get Started] button...')
    }

    
    

}
