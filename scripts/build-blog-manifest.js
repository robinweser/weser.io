import { outputFileSync, readFileSync, readdir } from 'fs-extra'
import { join } from 'path'

function getFullTime({ year, month, day }) {
  return new Date([year, month, day].join('-')).getTime()
}

function buildManifest(folderPath, outputPath) {
  readdir(join(__dirname, '../', folderPath), (err, files) => {
    if (err) {
      console.error(error)
    }

    const manifest = {}

    files.forEach((file) => {
      const filePath = join(__dirname, '../', folderPath, file)

      const data = readFileSync(filePath, 'utf-8')

      const post = eval(
        '(' + data.split('export default')[0].split('meta = ')[1] + ')'
      )

      if (!manifest[post.date.year]) {
        manifest[post.date.year] = []
      }

      manifest[post.date.year].push({
        ...post,
        id: file.replace('.mdx', ''),
      })
    })

    for (let year in manifest) {
      manifest[year] = manifest[year].sort((a, b) =>
        getFullTime(a.date) > getFullTime(b.date) ? -1 : 1
      )
    }

    outputFileSync(
      join(__dirname, '../', outputPath),
      JSON.stringify(manifest),
      (err) => {
        if (err) {
          console.error(err)
        }

        console.log('Blog Manifest has been updated.')
      }
    )
  })
}

buildManifest('pages/blog/', 'data/blog-manifest.json')
