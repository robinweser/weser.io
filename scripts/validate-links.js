import { readFileSync } from 'fs-extra'
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

function validateLinks(file) {
  const errors = []

  const addError = (error) => errors.push(error)

  const components = {
    ...ignoreComponents,
    a: ({ href, children }) => {
      if (!href) {
        addError(`The link for "${getStringyChildren(children)}" is missing`)
      }

      if (!children) {
        addError(`The link ${href} is missing a title`)
      }

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

    let didError = false
    // `files` is an array of file paths
    files.forEach((file) => {
      const errors = validateLinks(file)

      if (errors.length > 0) {
        didError = true
        console.log()
        console.log(
          '\x1b[33m%s\x1b[0m',
          `The following link errors were found in ${file}:`
        )

        errors.forEach((error, index) => {
          console.log('\x1b[31m%s\x1b[0m', `${index + 1}. ${error}`)
        })

        console.log()
      }
    })
  })
}

validate('pages/blog')
