import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { renderToNodeList } from 'react-fela'

import getFelaRenderer from '../styling/getFelaRenderer'

import PreloadStyleSheet from '../components/PreloadStyleSheet'

const colors = `
.light {
  --foreground: rgb(30, 30, 30);
  --foreground-dark: rgb(0, 0, 0);
  --foreground-light: rgb(60, 60, 60);
  --foreground-grey: rgb(90, 90, 90);
  --foreground-lightgrey: rgb(130, 130, 130);
  --foreground-transparent: rgba(60, 60, 60, 0.3);
  --background: white;
  --background-alternate: rgb(240, 240, 240);
  --background-code: rgb(245, 245, 245);
  --background-code-title: rgb(220, 220, 220);
  --highlight: rgba(149, 199, 198, 0.2);
}

.dark {
  --foreground: rgb(230, 230, 230);
  --foreground-dark: rgb(250, 250, 250);
  --foreground-light: rgb(200, 200, 200);
  --foreground-grey: rgb(150, 150, 150);
  --foreground-lightgrey: rgb(150, 150, 150);
  --foreground-transparent: rgba(180, 180, 180, 0.3);
  --background: rgb(30, 30, 30);
  --background-alternate: rgb(40, 40, 40);
  --background-code: rgb(45, 45, 45);
  --background-code-title: rgb(37, 37, 37);
  --highlight: rgba(149, 199, 198, 0.1);
}

.dark img {
  filter: brightness(0.8) contrast(1.2);
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const renderer = getFelaRenderer()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} renderer={renderer} />,
      })

    const initialProps = await Document.getInitialProps(ctx)
    const styles = renderToNodeList(renderer)

    return {
      ...initialProps,
      styles: [...initialProps.styles, ...styles],
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />

          <style dangerouslySetInnerHTML={{ __html: colors }} />
          <PreloadStyleSheet href="/fonts/inter/inter.css" />
        </Head>
        <body className="light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
          <script async defer src="https://sa.weser.io/app.js" />
          <noscript>
            <img src="https://sa.weser.io/image.gif" alt="" />
          </noscript>
        </body>
      </Html>
    )
  }
}
