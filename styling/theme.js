export default {
  baselineGrid: 4,
  breakpoints: {
    small: '@media (min-width: 480px)',
    medium: '@media (min-width: 800px)',
    large: '@media (min-width: 1024px)',
    huge: '@media (min-width: 1400px)',
  },

  colors: {
    foreground: 'var(--foreground)',
    foregroundDark: 'var(--foreground-dark)',
    foregroundLight: 'var(--foreground-light)',
    foregroundGrey: 'var(--foreground-grey)',
    foregroundLightGrey: 'var(--foreground-lightgrey)',
    foregroundTransparent: 'var(--foreground-transparent)',
    background: 'var(--background)',
    backgroundAlternate: 'var(--background-alternate)',
    backgroundCode: 'var(--background-code)',
    backgroundCodeTitle: 'var(--background-code-title)',
    highlight: 'var(--highlight)',
  },

  transitions: {
    theme: 'all 200ms ease-in-out',
  },
}
