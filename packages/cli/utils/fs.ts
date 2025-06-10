import fs from 'node:fs'
import path from 'node:path'
import { upperCaseFirstWord } from './caseKey'

/**
 * Check if a file exists
 */
export function existsFile(filePath: string): boolean {
  return fs.existsSync(filePath)
}

/**
 * Recursively copy a directory
 */
export function copyDirectory(source: string, destination: string) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  // Read source directory
  const files = fs.readdirSync(source)

  // Copy each file/directory
  for (const file of files) {
    const srcPath = path.join(source, file)
    const destPath = path.join(destination, file)

    const stat = fs.statSync(srcPath)

    if (stat.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectory(srcPath, destPath)
    }
    else {
      // Copy files
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/**
 * Get path sub folders
 */
interface FolderInfo {
  title: string
  value: string
}
export function getFolders(target: string): FolderInfo[] {
  const subFolders = []
  const files = fs.readdirSync(target)
  for (const file of files) {
    const filePath = path.join(target, file)
    const fileStat = fs.statSync(filePath)// 文件信息
    if (fileStat.isDirectory()) {
      subFolders.push({ title: upperCaseFirstWord(file), value: file })
    }
  }
  return subFolders
}
