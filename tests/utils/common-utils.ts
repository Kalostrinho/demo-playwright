/**
 * Common utilities for the framework would live here
 * Most of this will get consumed by any given test or page.
 */
import { unnoticed } from './logger'

export const transformIntoSnakeCase = async (textToTransform: string) => {
    let tmpStr = textToTransform.toLowerCase()
    tmpStr = tmpStr.replace(/\/|\\|\.|_|-/g, '')
    tmpStr = tmpStr.replace(/\s/g, '-')
    await unnoticed(`Transformed [${textToTransform}] into [${tmpStr}]`)
    return await tmpStr
}