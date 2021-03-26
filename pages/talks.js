import React from 'react'
import RouterLink from 'next/link'
import Head from 'next/head'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

import Layout from '../components/Layout'
import Link from '../components/Link'

import manifest from '../data/talks-manifest.json'

export default function Page() {
  const { theme } = useFela()
  return (
    <>
      <Head>
        <title>Robin Weser | Talks</title>
        <meta name="title" content="Robin Weser | Talks" />
      </Head>

      <Layout paddingTop={12} paddingBottom={20}>
        <Box space={10}>
          {Object.keys(manifest)
            .reverse()
            .map((year) => (
              <Box key={year} space={1}>
                <Box
                  extend={{
                    color: theme.colors.foregroundGrey,
                    fontSize: 16,
                  }}>
                  {year}
                </Box>
                <Box space={3}>
                  {manifest[year].map((post) => (
                    <Link
                      key={post.id}
                      href={`/talks/${post.id}`}
                      style={{ fontSize: 20 }}>
                      {post.title}
                    </Link>
                  ))}
                </Box>
              </Box>
            ))}
        </Box>
      </Layout>
    </>
  )
}
