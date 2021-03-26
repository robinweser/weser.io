import { outputFileSync, readFileSync } from 'fs-extra'
import { join } from 'path'
import recursive from 'recursive-readdir'

import React from 'react'
import TestRenderer from 'react-test-renderer'
import MDX from '@mdx-js/runtime'

import { getId, getStringyChildren } from '../components/Heading'

const ignoreComponents = {
  Button: () => null,
  FelaLogo: () => null,
  Box: () => null,
}

function generateData(file) {
  const headings = []
  let duration = 0

  function Heading({ level, children, addHeading }) {
    const text = getStringyChildren(children)
    const id = getId(text, level)

    if (level === 1 || level === 2) {
      duration += 10 / 60
    } else {
      duration += 5 / 60
    }

    if (level > 1) {
      headings.push([text, id, level])
    }

    return null
  }

  const components = {
    ...ignoreComponents,
    p: ({ children }) => {
      const text = getStringyChildren(children)

      const words = text
        .split(/ /gi)
        .map((w) => w.trim())
        .filter((w) => w.length > 0)
      duration += words.length / 250

      return children
    },
    code: ({ children }) => {
      const lineCount = children.split('\n').length
      duration += lineCount / 30

      return children
    },
    h1: ({ children }) => <Heading level={1}>{children}</Heading>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,
    h6: ({ children }) => <Heading level={6}>{children}</Heading>,
    img: () => {
      duration += 20 / 60
      return null
    },
  }

  const content = readFileSync(file, 'utf-8')
  const contentWithoutImports = content.split('</BlogLayout>')[1]

  const post = eval(
    '(' + content.split('export default')[0].split('meta = ')[1] + ')'
  )

  TestRenderer.create(
    <MDX components={components}>{contentWithoutImports}</MDX>
  )

  return { ...post, headings, duration: Math.ceil(duration) }
}

function buildPosts(filePath, dataPath) {
  recursive(join(__dirname, '../', filePath), (err, files) => {
    if (err) {
      throw err
    }

    // `files` is an array of file paths
    files.forEach((file) => {
      const data = generateData(file)

      const outputPath = file.replace(filePath, dataPath)

      outputFileSync(
        outputPath.replace('.mdx', '.json'),
        JSON.stringify(data, null, 2)
      )
    })
  })
}

buildPosts('pages/blog', 'data/posts')
