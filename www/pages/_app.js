import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider as SCThemeProvider, createGlobalStyle } from 'styled-components'
import { rgba, lighten } from 'polished'
import Cookies from 'js-cookie'
import nextCookies from 'next-cookies'

import Context, { Updater, COOKIE_NAME, DARK_MODE, useDarkModeManager } from '../context'
import Layout from '../components/Layout'
import { parseCookie } from '../utils'

const white = '#FFFFFF'
const black = '#000000'
const blue = '#0366D6'

function theme(isDarkMode) {
  return {
    textColor: isDarkMode ? white : black,
    backgroundColor: isDarkMode ? rgba(black, 0.6) : white,

    linkBlue: lighten(isDarkMode ? 0.5 : 0, blue)
  }
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Roboto Mono', monospace;
    box-sizing: border-box;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    transition: color 200ms ease-out, background-color 200ms ease-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-overflow-scrolling: touch;
  }
`

function ThemeProvider({ isDarkMode, children }) {
  return <SCThemeProvider theme={theme(isDarkMode)}>{children}</SCThemeProvider>
}

function Body({ children }) {
  const [isDarkMode] = useDarkModeManager()

  return (
    <ThemeProvider isDarkMode={isDarkMode}>
      <>
        <GlobalStyle />
        <Layout>{children}</Layout>
      </>
    </ThemeProvider>
  )
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx: context = {} } = {}) {
    const { req } = context
    const serverSide = !!req

    const _parsedCookie = serverSide ? nextCookies(context)[COOKIE_NAME] : Cookies.get(COOKIE_NAME)
    const parsedCookie = parseCookie(_parsedCookie)

    const cookieProps = {
      darkModeInitial: typeof parsedCookie[DARK_MODE] === 'boolean' ? parsedCookie[DARK_MODE] : null
    }

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    return {
      ...pageProps,
      ...cookieProps
    }
  }

  render() {
    const { Component, pageProps, darkModeInitial } = this.props

    return (
      <Container>
        <Head>
          <title>Noah Zinsmeister</title>
        </Head>
        <Context darkModeInitial={darkModeInitial}>
          <Updater />
          <Body>
            <Component {...pageProps} />
          </Body>
        </Context>
      </Container>
    )
  }
}
