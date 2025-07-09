import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import { setLocalTemplatePath } from '../utils/config'

export const cmd = 'local <url>'
export const cmdDesc = 'Set local template folder path'
export const opt = ''
export const optDesc = ''

export async function action(url: string): Promise<void> {
  const absPath = path.resolve(url)
  if (!fs.existsSync(absPath) || !fs.statSync(absPath).isDirectory()) {
    console.log(chalk.red(`Path "${absPath}" does not exist or is not a directory.`))
    return
  }
  setLocalTemplatePath(absPath)
  console.log(chalk.green(`Local template path set to: ${absPath}`))
}
