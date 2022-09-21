/**
 * A simple yet colorful logger for those 
 * explicit side-notes
 */
import chalk from 'chalk'
import { test } from '@playwright/test'

export const info = async (str: string) => {
    await timestamp()
    await console.log(chalk.dim.whiteBright('> ') + chalk.hex('#0944AA').bold(str))
}
export const pass = async (str: string) => {
    await timestamp()
    await console.log(chalk.dim.whiteBright('> ') + chalk.hex('#50FFA0').bold(str))
}
export const warning = async (str: string) => {
    await timestamp()
    await console.log(chalk.dim.whiteBright('> ') + chalk.hex('#FFA500').bold(str))
}
export const error = async (str: string) => {
    await timestamp()
    await console.log(chalk.dim.whiteBright('> ') + chalk.hex('#EE6969').bold(str))
}
export const unnoticed = async (str: string) => {
    await timestamp()
    await console.log(chalk.dim.whiteBright('> ') + chalk.hex('#8890FF').dim.bold(str))
}

/**
 * Returns a formatted timestamp for logging on the console
 * @returns {Promise<string>} - The promisified timestamp string
 */
const timestamp = async ():Promise<void> => {
    const testInfo = test.info()
    let tmpDate = await new Date()
    await console.log(chalk.italic.dim.white('= '.repeat(60) + '\n[' + tmpDate.getFullYear() + '-' + 
        ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + 
        ('0' + tmpDate.getDate()).slice(-2) + '---' + 
        ('0' + tmpDate.getHours()).slice(-2) + ':' + 
        ('0' + tmpDate.getMinutes()).slice(-2) + ':' + 
        ('0' + tmpDate.getSeconds()).slice(-2) + '---(Worker: ' +
        testInfo.workerIndex + ')---[' +
        testInfo.project.name + ' > ' + 
        testInfo.title + ']:'))
}
