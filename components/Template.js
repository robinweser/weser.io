import React from 'react'
import { useFela } from 'react-fela'
import { Box, Spacer } from 'kilvin'

import Header from './Header'
import Footer from './Footer'

export default function Template({ children }) {
  const { theme } = useFela()

  return (
    <Box>
      <Box minHeight="100vh">
        <Header />
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
