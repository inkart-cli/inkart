import readline from 'node:readline'
import chalk from 'chalk'
import prompts from 'prompts'
import { defaultName, readdirList } from '../utils'
import path from 'node:path'

export const cmd = 'create [projectName]'
export const cmdDesc = 'create new template'
export const opt = ''
export const optDesc = ''
const root = process.cwd()

export async function action(projectName: string): Promise<void> {
  projectName = await resolveProjectName(projectName)
  const template = await selectProjectTemplate()

  const inkartTemps = path.resolve(root, 'node_modules', '@inkart/temps')
  const tempDirectories = readdirList(inkartTemps);

  // TODO：没有找到，记得加个提示
  if (!tempDirectories.includes(template)) return
  
  const tempPath = path.resolve(inkartTemps, template)
  
  // 将 tempPath 整个文件夹写入到用户当前目录下

  console.log(root, tempPath)
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
        projectName = input.trim() ?? defaultName
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
      const { template } = await prompts({
        type: 'select',
        name: 'template',
        message: chalk.cyan('🍟 Please select the project template'),
        hint: `- choose: ⬆ + ⬇; Enter: selected.`,
        choices: [{
          title: 'Monorepo',
          value: 'monorepo',
        }],
        initial: 0,
      })

      resolve(template)
    }
    catch (error) {
      reject(error)
    }
  })
}
