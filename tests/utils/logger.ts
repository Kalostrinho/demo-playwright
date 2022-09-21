/**
 * A simple yet colorful logger for those 
 * explicit side-notes
 */
import chalk from 'chalk'
import { test } from '@playwright/test'

/**
 * Prints an informational message to the console
 * @param {string} str - Message to output 
 */
export const info = async (str: string) => {
    await timestamp()
    await console.log(chalk.hex('#3355DD').bold(`🔵 ${str}`))
}

/**
 * Prints a success message to the console
 * @param {string} str - Message to output 
 */
export const pass = async (str: string) => {
    await timestamp()
    await console.log(chalk.hex('#01BB01').bold(`🟢 ${str}`))
}

/**
 * Prints a warning message to the console
 * @param {string} str - Message to output 
 */
export const warning = async (str: string) => {
    await timestamp()
    await console.log(chalk.hex('#FFA500').bold(`🟠 ${str}`))
}

/**
 * Prints an error message to the console
 * @param {string} str - Message to output 
 */
export const error = async (str: string) => {
    await timestamp()
    await console.log(chalk.hex('#EE6969').bold(`🔴 ${str}`))
}

/**
 * Prints a low-key message to the console
 * @param {string} str - Message to output 
 */
export const unnoticed = async (str: string) => {
    await timestamp()
    await console.log(chalk.hex('#FDFDAF').dim.bold(`🟤 ${str}`))
}

/**
 * Prints the content of a response body as formatted JSON
 * To get the response body: `await response.json()`
 * @param {Object} json - The "response.json()" object to output
 */
export const reqResponse = async (json: Object) => {
    await timestamp()
    await console.log(chalk.hex('#AACCFF').bold(`⚪️ Response:\n${JSON.stringify(json, null, 2)}`))
}

/**
 * Returns a formatted timestamp for logging on the console
 * @returns {Promise<string>} - The promisified timestamp string
 */
const timestamp = async ():Promise<void> => {
    const testInfo = test.info()
    let tmpDate = new Date()
    await console.log(chalk.dim.white('= '.repeat(60) + '\n🔳 [' + tmpDate.getFullYear() + '-' + 
        ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + 
        ('0' + tmpDate.getDate()).slice(-2) + '---' + 
        ('0' + tmpDate.getHours()).slice(-2) + ':' + 
        ('0' + tmpDate.getMinutes()).slice(-2) + ':' + 
        ('0' + tmpDate.getSeconds()).slice(-2) + ']---(Worker: ' +
        testInfo.workerIndex + ')---[' +
        testInfo.project.name + ' > ' + 
        testInfo.title + ']:'))
}
