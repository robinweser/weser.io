import React, { useContext, useState } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import Link from 'next/link'

import Layout from './Layout'
import ThemeToggle from './ThemeToggle'

function NavBarItem({ href, children }) {
  const { theme } = useFela()

  return (
    <Link href={href} passHref>
      <Box
        as="a"
        padding={2.5}
        extend={{
          textTransform: 'lowercase',
          color: theme.colors.foreground,
          textDecoration: 'none',
        }}>
        {children}
      </Box>
    </Link>
  )
}

export default function Header() {
  const [mode, setMode] = useState('light')
  const { theme } = useFela()

  return (
    <Layout
      paddingTop={4}
      paddingBottom={4}
      extend={{
        color: theme.colors.foreground,
      }}>
      <Box direction="row" justifyContent="space-between">
        <Box>
          <Link href="/" passHref>
            <Box
              as="a"
              padding={2.5}
              display={['none', , 'flex']}
              extend={{
                textTransform: 'lowercase',
                color: theme.colors.background,
                backgroundColor: theme.colors.foregroundLight,
                textDecoration: 'none',
                letterSpacing: 1,
                fontWeight: 500,
              }}>
              weser.io
            </Box>
          </Link>
        </Box>
        <Box direction="row" space={2}>
          <NavBarItem href="/">About</NavBarItem>
          <NavBarItem href="/blog">Thoughts</NavBarItem>
          <NavBarItem href="/talks">Talks</NavBarItem>
          <Box marginTop={0.25}>
            <ThemeToggle />
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
