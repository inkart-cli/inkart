import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import prompts from 'prompts'
import { copyDirectory, defaultName, existsFile, getFolders } from '../utils'

export const cmd = 'create [projectName]'
export const cmdDesc = 'create new template'
export const opt = ''
export const optDesc = ''
const root = process.cwd()
const inkartTemps = fileURLToPath(import.meta.resolve('@inkart/temps'))
const subFolders = getFolders(path.resolve(inkartTemps, '../'))

export async function action(projectName: string): Promise<void> {
  // User input info
  projectName = await resolveProjectName(projectName)
  const template = await selectProjectTemplate()

  // template path && write target path
  const targetPath = path.resolve(root, projectName)
  const tempPath = path.resolve(inkartTemps, `../${template}`)

  if (!existsFile(tempPath))
    return console.log(chalk.red(`Template "${template}" not found.`))
  if (existsFile(targetPath))
    return console.log(chalk.yellow(`Project "${projectName}" already exists.`))
  // Create project directory
  fs.mkdirSync(targetPath, { recursive: true })

  copyDirectory(tempPath, targetPath)
}

/**
 * @name resolveProjectName
 * @param projectName
 * @returns Promise<string>
 *
 * @description get project name
 */
function resolveProjectName(projectName: string): Promise<string> {
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

/**
 * @name selectProjectTemplate
 * @returns Promise<string>
 *
 * @description selected project template
 */
function selectProjectTemplate(): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(subFolders)
      const { template } = await prompts({
        type: 'select',
        name: 'template',
        message: chalk.cyan('🍟 Please select the project template'),
        hint: `- choose: ⬆ + ⬇; Enter: selected.`,
        choices: subFolders,
        initial: 0,
      })

      resolve(template)
    }
    catch (error) {
      reject(error)
    }
  })
}
