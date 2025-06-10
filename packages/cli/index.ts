import cac from 'cac'
import cmdList from './commands'
import { version } from './package.json'

const cli = cac('@inkart/cli')

function init() {
  cmdList.forEach((cmd) => {
    cli.command(cmd?.cmd, cmd?.cmdDesc)
      .option(cmd?.opt, cmd?.optDesc)
      .action(cmd?.action)
  })
}

init()
cli.version(version)
cli.help()
cli.parse()
