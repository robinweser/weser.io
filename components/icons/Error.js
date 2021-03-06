import * as React from 'react'
import { Box } from 'kilvin'

export default function Error({ size = 20, ...props }) {
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
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </Box>
  )
}
