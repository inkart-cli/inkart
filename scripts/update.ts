import fs from 'node:fs'
import path from 'node:path'
import packageJSON from '../package.json'
import cliJSON from '../packages/cli/package.json'
import tempJSON from '../packages/templates/package.json'

console.info(`update version to v${packageJSON.version}`)
const { version } = packageJSON
cliJSON.version = version
tempJSON.version = version

fs.writeFileSync(path.resolve('packages/cli', 'package.json'), `${JSON.stringify(cliJSON, null, 2)}\n`)
fs.writeFileSync(path.resolve('packages/templates', 'package.json'), `${JSON.stringify(tempJSON, null, 2)}\n`)
