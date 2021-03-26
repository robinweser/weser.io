import * as React from 'react'
import { Box, Spacer } from 'kilvin'
import { useFela } from 'react-fela'

import Button from '../components/Button'
import Link from '../components/Link'

import Error from '../components/icons/Error'

export default function Page() {
  const { theme, css } = useFela()

  return (
    <Box grow={1} alignItems="center">
      <Box paddingTop="30vh" space={3}>
        <Box direction="row" alignItems="center" space={2}>
          <Error stroke={theme.colors.foreground} size={30} />
          <h1>Oh No!</h1>
        </Box>
        <p className={css({ lineHeight: 1.5 })}>
          We couldn't find the page you're looking for.
          <br />
          Either go back to home or contact me.
        </p>
        <Spacer size={4} />
        <Box direction="row" alignItems="center" space={6}>
          <Button href="/">Back To Home</Button>
          <Box>
            <Link href="mailto:contact@weser.io">Contact Me</Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
