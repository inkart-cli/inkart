import chalk from 'chalk'
import {
  copyDirectory,
  createProjectFile,
  existsFile,
  getTargetPath,
  getTemplatePath,
  resolveProjectName,
  selectProjectTemplate,
  subFolders,
} from '../utils'

export const cmd = 'create [projectName]'
export const cmdDesc = 'create new template'
export const opt = ''
export const optDesc = ''

export async function action(projectName: string): Promise<void> {
  // User input info
  projectName = await resolveProjectName(projectName)
  const template = await selectProjectTemplate(subFolders)

  // template path && write target path
  const targetPath = getTargetPath(projectName)
  const tempPath = getTemplatePath(template)

  if (!existsFile(tempPath))
    return console.log(chalk.red(`Template "${template}" not found.`))
  if (existsFile(targetPath))
    return console.log(chalk.yellow(`Project "${projectName}" already exists.`))
  // Create project directory
  createProjectFile(targetPath)

  copyDirectory(tempPath, targetPath)
}
