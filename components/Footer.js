import NextLink from 'next/link'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from './Layout'
import Link from './Link'

import GitHub from './icons/GitHub'
import LinkedIn from './icons/LinkedIn'
import Instagram from './icons/Instagram'
import Twitter from './icons/Twitter'
import Xing from './icons/Xing'

import useIconLink from '../utils/useIconLink'

export default function Footer() {
  const { theme } = useFela()
  const linkedIn = useIconLink(
    'LinkedIn',
    'https://www.linkedin.com/in/robin-weser-93a832a5/'
  )
  const xing = useIconLink('Xing', 'https://www.xing.com/profile/Robin_Weser')
  const github = useIconLink('GitHub', 'https://github.com/robinweser')
  const twitter = useIconLink('Twitter', 'https://twitter.com/robinweser')
  const instagram = useIconLink(
    'Instagram',
    'https://www.instagram.com/robin.weser/'
  )

  const year = new Date().getFullYear()

  return (
    <Layout paddingTop={20} paddingBottom={20} space={6}>
      <Box as="p">Copyright &copy; {year} Robin Weser</Box>
      <Box space={8}>
        <Box space={8} direction="row">
          <Link underline={false} href="/legal">
            Legal Notice
          </Link>
          <Link underline={false} href="mailto:contact@weser.io">
            Contact
          </Link>
        </Box>
        <Box space={6} direction="row">
          <Link underline={false} showExternIcon={false} {...twitter.linkProps}>
            <Twitter
              size={[30, , 20]}
              fill={theme.colors.foreground}
              {...twitter.iconProps}
            />
            {twitter.label}
          </Link>
          <Link
            underline={false}
            showExternIcon={false}
            {...instagram.linkProps}>
            <Instagram
              size={[30, , 20]}
              fill={theme.colors.foreground}
              {...instagram.iconProps}
            />
            {instagram.label}
          </Link>
          <Link underline={false} showExternIcon={false} {...github.linkProps}>
            <GitHub
              size={[30, , 20]}
              fill={theme.colors.foreground}
              {...github.iconProps}
            />
            {github.label}
          </Link>
          <Link
            underline={false}
            showExternIcon={false}
            {...linkedIn.linkProps}>
            <LinkedIn
              size={[30, , 20]}
              fill={theme.colors.foreground}
              {...linkedIn.iconProps}
            />
            {linkedIn.label}
          </Link>
          <Link underline={false} showExternIcon={false} {...xing.linkProps}>
            <Xing
              size={[30, , 20]}
              fill={theme.colors.foreground}
              {...xing.iconProps}
            />
            {xing.label}
          </Link>
        </Box>
      </Box>
    </Layout>
  )
}
