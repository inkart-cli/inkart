import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getFolders } from './fs'

export const root = process.cwd()
export const inkartTemps = fileURLToPath(import.meta.resolve('@inkart/temps'))
export const subFolders = getFolders(resolve(inkartTemps, '../'))

/**
 * get target path
 * @param projectName
 */
export const getTargetPath = (projectName: string): string => resolve(root, projectName)

/**
 * get template path
 * @param templateName
 */
export const getTemplatePath = (templateName: string): string => resolve(inkartTemps, `../${templateName}`)
