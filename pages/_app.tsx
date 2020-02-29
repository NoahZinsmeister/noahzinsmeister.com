import { useState, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'

import LocalStorageContext, { Updater as LocalStorageUpdater } from '../contexts/LocalStorage'
import useTheme from '../theme'
import { getBaseURI, getRelativeURI } from '../utils'
import Layout from '../components/Layout'

import '@reach/dialog/styles.css'
import 'swiper/css/swiper.css'
import '../styles.css'

const IPFS = process.env.IPFS === 'true'

function ThemedContent({ Component }) {
  const theme = useTheme()

  return (
    <>
      <Head>
        {IPFS && <base href={getBaseURI()} />}
        <link rel="shortcut icon" href={getRelativeURI(`/favicon${theme.isDarkMode ? '-dark' : ''}.ico`)} />
      </Head>

      <Layout>
        <Component />
      </Layout>

      <style jsx global>
        {`
          html {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
          }
        `}
      </style>
    </>
  )
}

function FunctionRoot({ Component }) {
  // prevents FOUC issues with static assets + dark mode
  const [painted, setPainted] = useState(false)
  useEffect(() => {
    setPainted(true)
  }, [])

  return !painted ? null : (
    <>
      <LocalStorageContext>
        <LocalStorageUpdater />
        <ThemedContent Component={Component} />
      </LocalStorageContext>
    </>
  )
}

export default class Root extends App {
  render() {
    const { Component } = this.props
    return (
      <>
        <Head>
          <title>Noah Zinsmeister</title>
          <meta name="Description" content="Noah Zinsmeister's website." />
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <FunctionRoot Component={Component} />
      </>
    )
  }
}
