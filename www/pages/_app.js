import App from 'next/app'
import Head from 'next/head'

import { getCookie } from '../utils'
import CookieContext, { DARK_MODE, Updater as CookieContextUpdater } from '../contexts/Cookie'
import Layout from '../components/Layout'
import useTheme from '../theme'

function AppFunctionComponent({ Component, pageProps }) {
  const theme = useTheme()

  return (
    <Layout>
      <Component {...pageProps} />

      <style jsx global>
        {`
          html {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
          }

          /* Box sizing rules */
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          /* global outline width */
          * {
            outline-width: thin;
          }

          /* Remove default padding */
          ul[class],
          ol[class] {
            padding: 0;
          }

          /* Remove default margin */
          body,
          h1,
          h2,
          h3,
          h4,
          p,
          ul[class],
          ol[class],
          li,
          figure,
          figcaption,
          blockquote,
          dl,
          dd {
            margin: 0;
          }

          /* Set core body defaults */
          body {
            min-height: 100vh;
            scroll-behavior: smooth;
            text-rendering: optimizeSpeed;
            line-height: 1.5;
          }

          /* Inherit fonts for inputs and buttons */
          input,
          button,
          textarea,
          select {
            font: inherit;
          }
        `}
      </style>
    </Layout>
  )
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx: context = {} } = {}) {
    const cookie = getCookie(context)
    const isDarkModeInCookie = cookie[DARK_MODE] || false

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(context) : {}

    return {
      isDarkModeInCookie,
      pageProps
    }
  }

  render() {
    const { isDarkModeInCookie, Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Noah Zinsmeister</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <CookieContext darkModeInitial={isDarkModeInCookie}>
          <CookieContextUpdater />
          <AppFunctionComponent Component={Component} pageProps={pageProps} />
        </CookieContext>

        <style jsx="true" global>{`
          body {
            font-family: Roboto, sans-serif;
          }
        `}</style>
      </>
    )
  }
}
