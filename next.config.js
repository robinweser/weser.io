var withMDX = require('@zeit/next-mdx')

var withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withMDX({
    extension: /\.(md|mdx)$/,
  })({
    pageExtensions: ['js', 'mdx'],
    target: 'serverless',
  })
)
