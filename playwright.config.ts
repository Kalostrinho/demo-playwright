import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const baseDir: string = './pw-results'
const testDir: string = `${baseDir}/tests`
const reportsDir: string = `${baseDir}/reports`
const config: PlaywrightTestConfig = {
  testDir: './tests',
  outputDir: testDir,
  testMatch: /.*\.spec\.ts/,
  timeout: 180 * 1000,  // << 3 minutes
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,  // << To identify flakiness
  workers: process.env.CI ? 10 : undefined,
  reporter: [
    ['junit', { outputFile: `${reportsDir}/pw-junit-report.xml` }],
    ['json', { outputFile: `${reportsDir}/pw-json-report.json` }],
    ['html', { outputFolder: `${reportsDir}/html-report`, open: 'never' }],
    ['dot']
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'demo-api',
      use: {
        baseURL: 'http://localhost:3000',
        extraHTTPHeaders: {
          'Accept': 'application/json',
        },
        
      }
    }
  ],
  use: {
    navigationTimeout: 30000,
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
}
export default config
