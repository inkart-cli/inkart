import chalk from 'chalk'
import prompts from 'prompts'
import { copyDirectory, createProjectFile, existsFile, getTargetPath, getTemplatePath, subFolders } from '../utils'

export const cmd = 'search [keyword]'
export const cmdDesc = 'Template Search'
export const opt = ''
export const optDesc = ''

export async function action(): Promise<void> {
  const { projectName, template } = await prompts([
    {
      type: 'autocomplete',
      name: 'template',
      message: chalk.cyan('👓 Please enter template keywords:'),
      choices: subFolders,
      suggest: (input, choices) => Promise.resolve(
        choices.filter(item => (item.title.toLowerCase().includes(input))),
      ),
      format: (value: string) => value.trim(),
      style: 'default',
    },
    {
      type: 'text',
      name: 'projectName',
      message: chalk.cyan('🍔 Please enter project name:'),
      initial: '',
      style: 'default',
      format: (value: string) => value.trim(),
      validate: (value: string) => {
        if (existsFile(getTargetPath(value)))
          return chalk.yellow(`Project "${value}" already exists.`)
        return true
      },
    },
  ])

  const targetPath = getTargetPath(projectName)
  createProjectFile(targetPath)

  copyDirectory(getTemplatePath(template), targetPath)
}
