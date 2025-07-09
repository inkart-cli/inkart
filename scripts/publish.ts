import { execSync } from 'node:child_process'
import { version } from '../package.json'
import cliJSON from '../packages/cli/package.json'
import temJSON from '../packages/templates/package.json'

const publishProjects = [cliJSON.name, temJSON.name]

publishProjects.forEach((project: string) => {
  let command = `pnpm --filter ${project} publish --access public --no-git-checks`
  if (version.includes('beta')) {
    command += ' --tag beta'
  }
  execSync(command, { stdio: 'inherit' })
})

// 发布完成后自动生成 changelog
execSync('pnpm changelog', { stdio: 'inherit' })
