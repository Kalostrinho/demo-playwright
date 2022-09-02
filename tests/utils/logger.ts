/**
 * A simple yet colorful logger for those 
 * explicit side-notes
 */
import chalk from 'chalk'
import { WorkerInfo } from '@playwright/test'

export const info = async (str: string) => {
    await console.log(chalk.hex('#3030FF').bold(await timestamp() + str))
}

export const pass = async (str: string) => {
    await console.log(chalk.hex('#50FFA0').bold(await timestamp() + str))
}

export const warning = async (str: string) => {
    await console.log(chalk.hex('#FFA500').bold(await timestamp() + str))
}

export const error = async (str: string) => {
    await console.log(chalk.hex('#EE6969').bold(await timestamp() + str))
}

export const unnoticed = async (str: string) => {
    await console.log(chalk.hex('#AAABBB').dim.bold(await timestamp() + str))
}

const timestamp = async () => {
    let tmpDate = new Date()
    return await '[' + tmpDate.getFullYear() + '-' + 
        ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + 
        ('0' + tmpDate.getDate()).slice(-2) + '---' + 
        ('0' + tmpDate.getHours()).slice(-2) + ':' + 
        ('0' + tmpDate.getMinutes()).slice(-2) + ':' + 
        ('0' + tmpDate.getSeconds()).slice(-2) + ']: '
}
