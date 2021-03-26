import * as React from 'react'
import { Box } from 'kilvin'

export default function Warning({ size = 20, ...props }) {
  return (
    <Box
      as="svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Box>
  )
}
