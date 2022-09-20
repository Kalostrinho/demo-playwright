import { Page } from '@playwright/test'
import { unnoticed } from '../utils/logger'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Launches the browser specified by the config and loads a URL
     * Waits for all DOM content to be loaded.
     */
    async open(url: string) {
        await this.page.goto(url)
        await this.page.waitForLoadState('domcontentloaded')
        await unnoticed(`Opened webpage [${url}]`)
    }

    /**
     * Reloads a page based on the Browser context.
     * Waits for the network to be done with all requests.
     */
    async reload() {
        await this.page.reload()
        await this.page.waitForLoadState('networkidle')
        await unnoticed('Page reloaded!')
    }

}
