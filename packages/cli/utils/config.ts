import fs from 'node:fs'
import path from 'node:path'

const CONFIG_FILE = path.resolve(__dirname, '../../config.json')

interface Config {
  localTemplatePath?: string
}

function readConfig(): Config {
  if (!fs.existsSync(CONFIG_FILE))
    return {}

  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf-8')
    return JSON.parse(raw)
  }
  catch {
    return {}
  }
}

function writeConfig(config: Config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8')
}

export function setLocalTemplatePath(localPath: string) {
  const config = readConfig()
  config.localTemplatePath = localPath
  writeConfig(config)
}

export function getLocalTemplatePath(): string | undefined {
  const config = readConfig()
  return config.localTemplatePath
}
