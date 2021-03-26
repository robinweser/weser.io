import React, { useState, useContext } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Sun from './icons/Sun'
import Moon from './icons/Moon'

import { ModeContext } from './ModeProvider'

export default function ThemeToggle() {
  const { mode, setMode } = useContext(ModeContext)
  const { theme } = useFela()

  return (
    <Box
      padding={2.5}
      extend={{ cursor: 'pointer' }}
      onClick={() =>
        window.__setPreferredTheme(mode === 'dark' ? 'light' : 'dark')
      }>
      {mode == 'light' ? (
        <Moon size={20} stroke={theme.colors.foreground} />
      ) : (
        <Sun
          size={20}
          fill={theme.colors.foreground}
          stroke={theme.colors.foreground}
        />
      )}
    </Box>
  )
}
