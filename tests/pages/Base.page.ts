import { Page } from '@playwright/test'
import { unnoticed } from '../utils/logger'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async open(url: string) {
        await this.page.goto(url)
        await this.page.waitForLoadState('domcontentloaded')
        await unnoticed(`Opened webpage [${url}]`)
    }

    async reload() {
        await unnoticed('Reloading page...')
        await this.page.reload()
        await this.page.waitForLoadState('networkidle')
    }

}
