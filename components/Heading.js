import React, { useEffect, useRef } from 'react'
import { Box } from 'kilvin'
import { useFela } from 'react-fela'

export function beautifyId(text) {
  return text.replace(/( |:)/gi, '-').toLowerCase()
}

export function getStringyChildren(children) {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(getStringyChildren).join('')
  }

  if (typeof children === 'object') {
    if (children.props && children.props.children) {
      return getStringyChildren(children.props.children)
    }

    return ''
  }
}

export function getId(text, level) {
  if (level > 1) {
    return encodeURI(beautifyId(text))
  }
}

export default function Heading({ level, children }) {
  const { theme } = useFela()
  const id = getId(getStringyChildren(children), level)
  const ref = useRef()

  useEffect(() => {
    const anchorElement = document.getElementById('anchor-' + id)

    if (!anchorElement) {
      return
    }

    // transparent on render to support no-js environments
    anchorElement.style.color = theme.colors.foregroundLightGrey

    let isVisible = false
    const onScroll = () => {
      const scrollTop = ref.current.offsetTop
      const scrollPos = document.scrollingElement.scrollTop

      if (!isVisible && scrollPos >= scrollTop - window.innerHeight / 2) {
        anchorElement.style.color = theme.colors.foregroundDark
        isVisible = true
      }

      if (isVisible && scrollPos <= scrollTop - window.innerHeight / 2) {
        anchorElement.style.color = theme.colors.foregroundLightGrey
        isVisible = false
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      ref={ref}
      as={'h' + level}
      onClick={() => {
        if (id) {
          window.location.hash = id
        }
      }}
      extend={{
        display: 'block',
        cursor: id ? 'pointer' : 'inherit',
        marginTop: 24 + (level === 2 ? 40 : 0),
        paddingBottom: 8,
        lineHeight: 1.0,
        '> a': {
          color: theme.colors.foreground,
        },
      }}>
      <Box as="span" id={id} extend={{ marginTop: -20, paddingBottom: 20 }} />
      {children}
    </Box>
  )
}
