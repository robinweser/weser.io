import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import NextLink from 'next/link'
import { useFela } from 'react-fela'
import { Box, Spacer } from 'kilvin'
import { MDXProvider } from '@mdx-js/react'
import YouTube from 'react-youtube'

import Template from './Template'
import Layout from './Layout'
import Link from './Link'
import Button from './Button'
import CodeBlock from './CodeBlock'
import Heading from './Heading'
import PreloadStyleSheet from './PreloadStyleSheet'

import Twitter from './icons/Twitter'

import months from '../data/months.json'

const TWEET = 'https://twitter.com/intent/tweet?text='

export default function BlogLayout({
  title,
  date,
  headings = [],
  duration,
  children,
}) {
  const router = useRouter()
  const { theme, css, renderer } = useFela()
  const headingsRef = useRef()

  const id = router.pathname.substr(6)

  const isTalk = router.pathname.indexOf('/talks') !== -1
  const isPost = router.pathname.indexOf('/blog') !== -1

  if (isTalk) {
    renderer.renderStatic({ maxWidth: '100%' }, '.video-box')
  }

  // sticky headings
  useEffect(() => {
    const resizeListener = () => {
      if (window.scrollY >= 110) {
        headingsRef.current.style.position = 'fixed'
        headingsRef.current.style.top = 0
      }

      if (window.scrollY < 110) {
        headingsRef.current.style.position = 'absolute'
        headingsRef.current.style.top = '110px'
      }
    }

    window.addEventListener('scroll', resizeListener)
    return () => window.removeEventListener('scroll', resizeListener)
  }, [])

  return (
    <Layout small paddingTop={6} paddingBottom={[20, , , 30]}>
      <Head>
        <PreloadStyleSheet href="/fonts/dank/dmvendor.css" />
      </Head>

      <Box
        padding={4}
        paddingLeft={8}
        display={['none', , , 'flex']}
        ref={headingsRef}
        extend={{
          lineHeight: 1.8,
          position: 'absolute',
          left: 'calc(100% / 2 + 350px)',
          right: 0,
          top: 110,
        }}>
        {headings.map(([heading, id, level]) => (
          <Box paddingLeft={3 * (level - 2)}>
            <Box
              onClick={() => false}
              id={'anchor-' + id}
              href={'#' + id}
              as="a"
              extend={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: theme.colors.foregroundDark,
                fontSize: level === 2 ? 14 : 12,
                ':hover': {
                  color: theme.colors.foregroundDark + '!important',
                },
              }}>
              {heading}
            </Box>
          </Box>
        ))}
      </Box>

      <Link href={isTalk ? '/talks' : '/blog'}>
        <Box direction="row" alignItems="center" space={1}>
          <Box
            as="svg"
            height={20}
            width={20}
            marginRight={1}
            marginTop={-0.5}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </Box>
          <Box as="span">Back</Box>
        </Box>
      </Link>
      <Spacer size={[6, , 10]} />
      <h1>{title}</h1>
      <Spacer size={2} />
      <Box as="p" direction="row" alignItems="center">
        <Box
          as="svg"
          height={20}
          width={20}
          marginRight={1}
          marginTop={-0.5}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </Box>
        {duration}min • {date.day} {months[date.month - 1]} {date.year}
      </Box>
      <Spacer size={14} />
      <MDXProvider
        components={{
          a: Link,
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
          strong: ({ children }) => (
            <Box as="strong" extend={{ display: 'inline', fontWeight: 500 }}>
              {children}
            </Box>
          ),
          pre: ({ children }) => (
            <pre
              className={css({
                '& + pre': {
                  marginTop: 10,
                },
                '& + p': {
                  marginTop: 8,
                },
              })}>
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <Box
              as="ul"
              space={1}
              marginTop={2.5}
              marginBottom={2.5}
              paddingLeft={4.5}
              extend={{ lineHeight: 1.5 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box
              as="ol"
              space={1}
              marginTop={2.5}
              marginBottom={2.5}
              paddingLeft={6}
              extend={{ lineHeight: 1.5 }}>
              {children}
            </Box>
          ),

          blockquote: ({ children, ...props }) => (
            <Box
              className="note"
              extend={{
                padding: 10,
                backgroundColor: theme.colors.highlight,
                marginTop: 10,
                marginBottom: 10,
                position: 'relative',
                borderLeft: '3px solid rgba(149, 199, 198, 0.8)',
                '& p': {
                  color: theme.colors.foregroundLight,
                  marginBottom: 0,
                  marginTop: 0,
                },
              }}>
              {children}
            </Box>
          ),
          inlineCode: ({ children }) => (
            <code
              className={css({
                backgroundColor: 'rgba(0,0,0,0.07)',
                fontFamily:
                  'dm, Dank, Dank Mono, Fira Code, Hack, Consolas, monospace',
                textRendering: 'optimizeLegibility',
                whiteSpace: 'nowrap',
              })}>
              {children}
            </code>
          ),
          code: CodeBlock,
          p: ({ children }) => (
            <Box
              as="p"
              marginTop={1}
              marginBottom={3}
              extend={{
                display: 'inline',
                lineHeight: 1.5,
                color: theme.colors.foreground,
                '& + ul': {
                  marginTop: -6,
                },
                '& + ol': {
                  marginTop: -6,
                },
                '& + .note': {
                  marginTop: 0,
                },
              }}>
              {children}
            </Box>
          ),
          img: ({ src, title, alt }) => (
            <Box
              as="img"
              marginLeft={[-5, , 0]}
              marginRight={[-5, , 0]}
              maxWidth={['calc(100% + 40px)', , '100%']}
              src={'/posts/' + id + '/' + src}
            />
          ),
        }}>
        {children}
      </MDXProvider>
      <Spacer size={15} />
      <Box extend={{ borderBottom: '1px solid rgb(200, 200, 200)' }} />
      <Spacer size={15} />
      <Box space={2} direction="row" alignItems="center">
        <Twitter size={20} fill={theme.colors.foreground} />
        <Link
          showExternIcon={false}
          href={`${TWEET}Check out "${encodeURIComponent(
            title + '" by @robinweser - https://weser.io' + router.pathname
          )}`}>
          Share on Twitter
        </Link>
      </Box>
      <Box
        paddingTop={12}
        direction={['column', , 'row']}
        space={5}
        alignItems={['flex-start', , 'center']}>
        <Box
          as="img"
          src="/avatar.jpg"
          height={120}
          width={120}
          extend={{ borderRadius: 120 }}
        />
        <Box space={3} shrink={1}>
          <Box as="p" extend={{ fontSize: 20, fontWeight: 500 }}>
            Thanks for {isTalk ? 'watching' : 'reading'}!
          </Box>
          <Box as="p" shrink={1} extend={{ display: 'block', lineHeight: 1.5 }}>
            I’m Robin, Freelancer & Frontend Architect from Germany.
            <br />
            Any question regarding this {isTalk ? 'talk' : 'article'}? Reach out
            to me on{' '}
            <Link href="https://twitter.com/robinweser" showExternIcon={false}>
              Twitter
            </Link>
            ! You can also find me on{' '}
            <Link href="https://github.com/robinweser" showExternIcon={false}>
              GitHub
            </Link>
            .
          </Box>
        </Box>
      </Box>
      <Box paddingTop={[15, , , 20]}>
        <Button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }}>
          <Box direction="row" alignItems="center" space={2}>
            <Box
              as="svg"
              height={20}
              width={20}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </Box>
            <Box>To The Top</Box>
          </Box>
        </Button>
      </Box>
    </Layout>
  )
}
