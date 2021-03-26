import { readFileSync } from 'fs-extra'
import { join } from 'path'
import recursive from 'recursive-readdir'

import React from 'react'
import TestRenderer from 'react-test-renderer'
import MDX from '@mdx-js/runtime'
import spellChecker from 'spell-checker-js'

export function getStringyChildren(children) {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(getStringyChildren).join('')
  }

  if (typeof children === 'object') {
    if (children.props && children.props.children) {
      if (children.props.mdxType === 'inlineCode') {
        return ''
      }

      return getStringyChildren(children.props.children)
    }

    return ''
  }
}

spellChecker.load('en')

const ignoreComponents = {
  Button: () => null,
  FelaLogo: () => null,
  Box: () => null,
}

const whitelist = [
  'stylesheet',
  'shorthands',
  'plugin',
  'plugins',
  'macbook',
  'iphone',
  'instagram',
  'apps',
  'quicktime',
  'microsoft',
  'skype',
  'github',
  'fela',
  'monorepo',
  'xcode',
  'webcam',
  'javascript',
  'nicolas',
  'gallagher',
  'blog',
  'menubar',
  'shuttercast',
  'npm',
  'apple',
  'autofix',
  'hellofresh',
  'cloudflare',
  'volvo',
  'refactoring',
  'toolbelt',
  'backend',
  'frontend',
  'ninjaconcept',
  'd3',
  'ecmascript',
  'svg',
  'html',
  'https',
  'css-in-js',
  'javascript-based',
  'javascript-land',
  'codebase',
  'code',
  'codemods',
  'refactor',
  'workflow',
  'flexbox',
  'viewport',
  'viewports',
  'dropdown',
  'keyframes',
  'hyperlapse',
  'chedeau',
  'vjeux',
  'website',
  'websites',
  'bostock',
  'voilà',
  'downsides',
  'diffs',
  'rerenders',
  'refactored',
  'reinitialises',
]

const filters = [
  // uppercase abreviations
  (word) => {
    if (word.length >= 3 && word.toUpperCase() === word) {
      return false
    }

    return true
  },
  // length values
  (word) => word.match(/^[0-9]+(px|em|pt|vw|vh)$/gi) === null,
  // pure numbers
  (word) => parseFloat(word) != word,
  // whitelist
  (word) => whitelist.indexOf(word.toLowerCase()) === -1,
  // package name
  (word) => {
    if (word.toLowerCase() === word && word.indexOf('-') !== -1) {
      return false
    }
    return true
  },

  // camelcase
  (word) => word.match(/^[A-Za-z][a-z]*([A-Z][a-z]*){1,}$/) === null,

  // camelcase + dashed addition
  (word) => {
    if (
      word.indexOf('-') !== -1 &&
      word.match(/[A-Za-z][a-z]*([A-Z][a-z]*){1,}/) !== null
    ) {
      return false
    }
    return true
  },
]

function validateText(file) {
  const errors = []

  const addError = (error) => errors.push(error)

  const components = {
    ...ignoreComponents,
    inlineCode: () => null,
    code: () => null,
    p: ({ children }) => {
      const text = getStringyChildren(children)

      const check = spellChecker.check(text)

      check.forEach((error) => addError(error))

      return null
    },
  }

  const content = readFileSync(file, 'utf-8')
  const contentWithoutImports = content.split('</BlogLayout>')[1]

  TestRenderer.create(
    <MDX components={components}>{contentWithoutImports}</MDX>
  )

  return errors
}

function validate(filePath) {
  recursive(join(__dirname, '../', filePath), (err, files) => {
    if (err) {
      throw err
    }

    // `files` is an array of file paths
    files.forEach((file) => {
      const spellingErrors = validateText(file)

      const uniqueErrors = spellingErrors.filter(
        (error, index, arr) => arr.indexOf(error) === index
      )

      const filteredErrors = filters.reduce(
        (errors, filter) => errors.filter(filter),
        uniqueErrors
      )

      if (filteredErrors.length > 0) {
        console.log()
        console.log(
          '\x1b[33m%s\x1b[0m',
          `The following spelling errors were found in ${file}:`
        )

        console.log(filteredErrors.join(', '))
        console.log()
      }
    })
  })
}

validate('pages/blog')
