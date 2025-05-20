import fs from 'node:fs'
import path from 'node:path'

export function readdirList(targetDir: string) {
  return fs.readdirSync(targetDir).filter(dir => fs.statSync(path.join(targetDir, dir)).isDirectory());
}