import readline from 'node:readline'
import chalk from 'chalk'
import { defaultName } from './var'

/**
 * @name resolveProjectName
 * @param projectName
 * @returns Promise<string>
 *
 * @description get project name
 */
export function resolveProjectName(projectName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (projectName != undefined) {
        return resolve(projectName)
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rl.question(chalk.cyan('🍔 Please enter project name: ') + chalk.gray(`${defaultName}`), (input: string) => {
        projectName = input.trim() || defaultName
        rl.close()
        resolve(projectName)
      })
    }
    catch (error) {
      reject(error)
    }
  })
}
