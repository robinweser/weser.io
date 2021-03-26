export default [
  {
    selector: '*',
    style: {
      margin: 0,
      padding: 0,
    },
  },
  {
    selector: '#__next',
    style: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  {
    selector: 'body',
    style: {
      fontFamily: 'Inter,-apple-system, Helvetica Neue, sans-serif',
      overscrollBehavior: 'none',
      overflow: 'auto',
      overflowX: 'hidden',
      overflowY: 'auto',
      fontSize: 18,
    },
  },
  {
    selector: 'div',
    style: {
      maxWidth: '100%',
    },
  },
]
