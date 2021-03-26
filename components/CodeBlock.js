import React, { useState, useEffect, useContext } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'
import copyToClipboard from 'copy-to-clipboard'

import { ModeContext } from './ModeProvider'

const CopyIcon = () => (
  <Box
    as="svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    extend={{ marginLeft: 0.5 }}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
    />
  </Box>
)

const CheckIcon = () => (
  <Box
    as="svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    extend={{ marginTop: 1 }}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </Box>
)

export default function CodeBlock({ children, className = '', copy, name }) {
  const { theme } = useFela()
  const [copied, setCopied] = useState(false)
  const { mode, setMode } = useContext(ModeContext)
  const language = className.replace(/language-/, '')

  // Remove newline from end of code
  const code = children.replace(/\n$/g, '')

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000)
    }
  }, [copied])

  return (
    <>
      <Box
        marginLeft={[-5, , 0]}
        marginRight={[-5, , 0]}
        maxWidth={['calc(100% + 40px)', , '100%']}
        extend={{
          fontFamily: 'Inter',
        }}>
        {name && (
          <Box
            as="p"
            direction="row"
            space={2}
            paddingTop={2}
            paddingBottom={2}
            paddingRight={2}
            paddingLeft={[5, , 2]}
            extend={{
              fontSize: 14,
              lineHeight: 1,
              fontWeight: 700,
              backgroundColor: theme.colors.backgroundCodeTitle,
            }}>
            {name}
          </Box>
        )}
        <Box>
          {copy && (
            <Box
              alignSelf="flex-end"
              alignItems="center"
              space={2}
              extend={{
                position: 'absolute',
                marginTop: name ? -20 : -14,
                transform: 'translateX(-20px)',
                medium: {
                  transform: 'translateX(-10px)',
                },
              }}>
              <Box
                as="button"
                width={34}
                height={34}
                padding={1.7}
                onClick={() => {
                  setCopied(true)
                  copyToClipboard(children)
                }}
                disabled={copied}
                extend={{
                  cursor: 'pointer',
                  borderRadius: 20,
                  border: 0,
                  outline: 0,

                  backgroundColor: 'rgba(149, 199, 198, 0.5)',
                  transition:
                    'background-color 100ms ease-out, transform 100ms ease-out',
                  '> svg': {
                    stroke: theme.colors.foreground,
                    transition: 'stroke 100ms ease-out',
                  },
                  extend: {
                    condition: !copied,
                    style: {
                      ':hover': {
                        backgroundColor: theme.colors.foregroundLight,
                        '> svg': {
                          stroke: theme.colors.background,
                        },
                      },
                      ':active': {
                        transform: 'scale(0.95, 0.95)',
                      },
                    },
                  },
                }}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Box>
            </Box>
          )}
          <Highlight
            {...defaultProps}
            theme={mode === 'light' ? github : nightOwl}
            code={code}
            language={language}>
            {({ tokens, getTokenProps }) => (
              <Box
                as="pre"
                paddingTop={[copy ? 8 : 3.5, , 3.5]}
                paddingBottom={3.5}
                paddingRight={4}
                paddingLeft={[5, , 4]}
                extend={{
                  backgroundColor: theme.colors.backgroundCode,
                  overflow: 'auto',
                }}>
                <Box
                  as="code"
                  extend={{
                    fontSize: 16,
                    fontFamily:
                      'dm, Dank, Dank Mono, Fira Code, Hack, Consolas, monospace',
                    textRendering: 'optimizeLegibility',
                  }}>
                  {tokens.map((line, i) => (
                    <div key={i}>
                      {line.map((token, key) => {
                        const props = getTokenProps({ token, key })

                        if (key === 0 && !props.children && line.length !== 1) {
                          return null
                        }

                        return (
                          <Box
                            as="span"
                            extend={{
                              display: 'inline',
                              backgroundColor: 'transparent !important',
                            }}
                            key={key}
                            data-key={key}
                            {...props}>
                            {/* {props.children || ' '} */}
                          </Box>
                        )
                      })}
                    </div>
                  ))}
                </Box>
              </Box>
            )}
          </Highlight>
        </Box>
      </Box>
    </>
  )
}
