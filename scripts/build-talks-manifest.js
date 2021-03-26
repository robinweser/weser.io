var fs = require('fs')

const blogDir = './pages/talks/'

function getFullTime({ year, month, day }) {
  return new Date([year, month, day].join('-')).getTime()
}

fs.readdir(blogDir, (err, files) => {
  if (err) {
    console.error(error)
  }

  const manifest = {}

  files.forEach((file) => {
    const data = fs.readFileSync(blogDir + file, 'utf-8')

    const post = eval(
      '(' + data.split('export default')[0].split('meta = ')[1] + ')'
    )

    if (!manifest[post.date.year]) {
      manifest[post.date.year] = []
    }

    manifest[post.date.year].push({ ...post, id: file.replace('.mdx', '') })
  })

  for (let year in manifest) {
    manifest[year] = manifest[year].sort((a, b) =>
      getFullTime(a.date) > getFullTime(b.date) ? -1 : 1
    )
  }

  fs.writeFile(
    './data/talks-manifest.json',
    JSON.stringify(manifest),
    (err) => {
      if (err) {
        console.error(err)
      }

      console.log('Talks Manifest has been updated.')
    }
  )
})
