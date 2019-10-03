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
        </Head>
        <CookieContext darkModeInitial={isDarkModeInCookie}>
          <CookieContextUpdater />
          <AppFunctionComponent Component={Component} pageProps={pageProps} />
        </CookieContext>
      </>
    )
  }
}
