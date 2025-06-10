import type { Choice } from 'prompts'
import chalk from 'chalk'
import prompts from 'prompts'

/**
 * @name selectProjectTemplate
 * @returns Promise<string>
 *
 * @description selected project template
 */
export function selectProjectTemplate(folder: Choice[]): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const { template } = await prompts({
        type: 'select',
        name: 'template',
        message: chalk.cyan('🍟 Please select the project template'),
        hint: `- choose: ⬆ + ⬇; Enter: selected.`,
        choices: folder,
        initial: 0,
      })

      resolve(template)
    }
    catch (error) {
      reject(error)
    }
  })
}
