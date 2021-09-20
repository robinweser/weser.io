import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useFela } from 'react-fela'
import { Box, Spacer } from 'kilvin'

import Template from '../components/Template'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Button from '../components/Button'

export default function Page() {
  const { theme } = useFela()

  return (
    <>
      <Head>
        <title>Robin Weser | Frontend Architect & Freelancer</title>
        <meta
          name="title"
          content="Robin Weser | Frontend Architect & Freelancer"
        />
      </Head>
      <Layout paddingTop={14} marginBottom={-18}>
        <Box
          direction={['column', , 'row']}
          alignItems={['flex-start', , 'center']}
          space={4}>
          <Box justifyContent="center" grow={1} shrink={1} space={1}>
            <Box
              as="h1"
              extend={{
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1.5,
              }}>
              Hi! I'm Robin.
            </Box>

            <Box as="p" extend={{ fontSize: 24, lineHeight: 1.5 }}>
              A frontend architect based in Karlsruhe, Germany.
              <br />I focus on design systems, user experience and performance.
            </Box>
            <Spacer size={3} />
            <Button href="mailto:contact@weser.io">Hire Me</Button>
          </Box>

          <Box extend={{ position: 'relative', zIndex: 20, top: 60 }}>
            <Image
              width={300}
              height={450}
              quality={60}
              src="/me.jpg"
              alt="Picture of Robin Weser"
              loading="eager"
            />
          </Box>
        </Box>
      </Layout>
      <Box
        extend={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 0 100px 100vw',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: theme.colors.backgroundAlternate,
          borderLeftColor: 'transparent',
        }}
      />
      <Box
        paddingTop={25}
        paddingBottom={[15, , , 25]}
        extend={{
          backgroundColor: theme.colors.backgroundAlternate,
        }}>
        <Layout space={6}>
          <Box>
            <Box as="h2" extend={{ fontWeight: 500 }}>
              About Me
            </Box>
            <Box
              width={55}
              height={2}
              extend={{ backgroundColor: theme.colors.foreground }}
            />
          </Box>
          <Box
            as="p"
            extend={{
              display: 'inline',
              fontSize: 20,
              lineHeight: 1.5,
              maxWidth: 700,
            }}>
            I love creating beautiful, interactive user interfaces.
            <br />
            Frontend architecture and design systems are my passion.
            <br />
            Designing scalable, performant and accessible products is my goal.
            <br />
            Additionally, I also do workshops and coach frontend teams.
            <br /> <br />I believe writing apps should be joyful - not painful.
            <br />
            I'm using technology such as React, ReasonML and GraphQL combined
            with functional programming paradigms to achieve that.
            <br />
            <br />
            In my leisure time, I enjoy long trail runs, play several
            instruments and love reading books. I try my best living a{' '}
            <Link href="https://www.instagram.com/weser.farm/">
              self-sufficient life
            </Link>
            .<br />I study psychology, learn swedish language and do my master's
            in practical computer science.
          </Box>
        </Layout>
      </Box>
      <Box
        extend={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '50px 100vw 0 0',
          borderTopColor: theme.colors.backgroundAlternate,
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        }}
      />
    </>
  )
}
