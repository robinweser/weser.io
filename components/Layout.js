import React from 'react'
import { Box } from 'kilvin'

export default function Layout({ children, small, ...props }) {
  return (
    <Box alignItems="center">
      <Box
        maxWidth={small ? 700 : 1200}
        width="100%"
        paddingLeft={[5, , , 4]}
        paddingRight={[5, , , 4]}
        {...props}>
        {children}
      </Box>
    </Box>
  )
}
