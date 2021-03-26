import * as React from 'react'
import { Box } from 'kilvin'

export default function Moon({ size = 20, ...props }) {
  return (
    <Box as="svg" viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </Box>
  )
}
