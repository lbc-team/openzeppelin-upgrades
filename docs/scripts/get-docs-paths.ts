import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

export function getDocSlugs() {
  // Wagmi文档目录列表
  const docDirectories = [
    '../cli',
    '../core',
    '../react',
    '../vue',
    '../shared',
    '../dev',
  ]
  const allFiles: string[] = []

  // 遍历所有文档目录
  for (const docDir of docDirectories) {
    const docsDir = resolve(process.cwd(), docDir)
    try {
      const files = readdirSync(docsDir, { recursive: true })
      allFiles.push(...files.map((file) => `${docDir}/${file}`))
    } catch (_error) {
      console.warn(`警告: 无法读取目录 ${docDir}，跳过`)
    }
  }

  return allFiles
    .filter((file) => typeof file === 'string' && file.endsWith('.md'))
    .map((file) => {
      const path = file
        .replace(/\.md$/, '')
        .split('/')
        .filter((p) => p !== 'index')

      return { slug: path }
    })
}
