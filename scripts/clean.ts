import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'

const result = execSync('git clean -Xdn', { encoding: 'utf-8' })

const items = result.split('\n')
  .map(i => i.replace('Would remove ', '').trim())
  .filter(Boolean)
  .filter(i => !['node_modules', '.eslintcache', '.md', 'public'].some(j => i.includes(j)))

;(async () => {
  for (const item of items) {
    try {
      console.log(`Removing ${item}`)
      await fs.rm(item, { force: true, recursive: true })
    }
    catch (error) {
      console.error(`Failed to remove ${item}:`, error)
    }
  }
})()
