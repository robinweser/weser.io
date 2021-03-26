import * as React from 'react'

import useScreenReaderOnly from './useScreenReaderOnly'

export default function useIconLink(title, url) {
  const labelProps = useScreenReaderOnly()

  const linkProps = {
    title,
    href: url,
  }

  const iconProps = {
    'aria-hidden': true,
    focusable: false,
  }

  const label = <span {...labelProps}>{title}</span>

  return {
    linkProps,
    iconProps,
    label,
  }
}
