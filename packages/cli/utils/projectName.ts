import chalk from 'chalk'
import prompts from 'prompts'
import { defaultName } from './var'

/**
 * @name resolveProjectName
 * @param projectName
 * @returns Promise<string>
 *
 * @description get project name
 */
export function resolveProjectName(projectName: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      if (projectName != undefined) {
        return resolve(projectName)
      }

      const { name } = await prompts({
        type: 'text',
        name: 'name',
        message: chalk.cyan('🚧 Project name:'),
        initial: defaultName,
        style: 'default',
        format: (value: string) => value.trim(),
      })
      resolve(name)
    }
    catch (error) {
      reject(error)
    }
  })
}
