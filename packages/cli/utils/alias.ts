import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getLocalTemplatePath } from './config'
import { getFolders } from './fs'

export const root = process.cwd()

export function getTemplateRoot() {
  // Try to get user-configured local template path
  const localPath = getLocalTemplatePath()
  if (localPath)
    return localPath
  // Fallback to default
  return fileURLToPath(import.meta.resolve('@inkart/temps'))
}

export const subFolders = getFolders(resolve(getTemplateRoot(), '../'))

/**
 * get target path
 * @param projectName
 */
export const getTargetPath = (projectName: string): string => resolve(root, projectName)

/**
 * get template path
 * @param templateName
 */
export const getTemplatePath = (templateName: string): string => resolve(getTemplateRoot(), `../${templateName}`)
