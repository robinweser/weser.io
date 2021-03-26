import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import NextLink from 'next/link'

import useScreenReaderOnly from '../utils/useScreenReaderOnly'

export default function Link({
  href,
  children,
  showExternIcon = true,
  underline = true,
  ...props
}) {
  const { theme } = useFela()
  const screenReaderOnly = useScreenReaderOnly()

  const isExtern = href.indexOf('http') === 0

  const style = {
    display: 'inline',
    alignSelf: 'flex-start',
    textDecoration: 'none',
    color: theme.colors.foregroundLight,
    ':hover': {
      color: theme.colors.foreground,
    },
    extend: {
      condition: underline,
      style: {
        textDecorationLine: 'underline',
        textDecorationColor: theme.colors.foregroundTransparent,
        textUnderlineOffset: 2,
        ':hover': {
          textDecorationColor: theme.colors.foreground,
        },
      },
    },
  }

  if (isExtern) {
    return (
      <Box
        {...props}
        as="a"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        extend={style}>
        {children}
        <span title="Opens a new tab">
          <Box
            as="svg"
            display={!showExternIcon ? 'none' : 'inline-block'}
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            extend={{
              marginLeft: -2,
              color: 'inherit',
              width: 16,
              height: 16,
              stroke: theme.colors.foreground,
              strokeWidth: 2,
            }}>
            <path d="M22 11L10.5 22.5M10.44 11H22v11.56" fill="none" />
          </Box>
          <Box as="span" extend={screenReaderOnly.style}>
            (new tab)
          </Box>
        </span>
      </Box>
    )
  }

  return (
    <NextLink href={href} passHref>
      <Box {...props} as="a" extend={style}>
        {children}
      </Box>
    </NextLink>
  )
}
