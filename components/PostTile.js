import NextLink from 'next/link'
import { Box } from 'kilvin'

import Link from './Link'

export default function PostTile({ title, id, path }) {
  return (
    <Box extend={{ fontSize: 18, lineHeight: 1.5 }}>
      <NextLink href={path + id} passHref>
        <Link h>{title}</Link>
      </NextLink>
    </Box>
  )
}
