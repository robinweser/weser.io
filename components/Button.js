import React from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

export default function Button({ href, onClick, children }) {
  const { theme } = useFela()

  return (
    <Box
      as={href ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      alignSelf="flex-start"
      extend={{
        appearance: 'none',
        transition: '100ms all ease-in-out',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 14,
        paddingBottom: 14,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 500,
        border: 'none',
        backgroundColor: 'transparent',
        borderColor: theme.colors.foreground,
        borderWidth: 2,
        borderStyle: 'solid',
        ':hover': {
          color: theme.colors.background,
          backgroundColor: theme.colors.foreground,
        },
      }}>
      {children}
    </Box>
  )
}
