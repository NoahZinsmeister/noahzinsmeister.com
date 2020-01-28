import App from 'next/app'
import Head from 'next/head'

import LocalStorageContext, { Updater as LocalStorageUpdater } from '../contexts/LocalStorage'
import useTheme from '../theme'
import Layout from '../components/Layout'

import '../styles.css'
import { useEffect, useState } from 'react'

function FunctionalRoot({ Component }) {
  const theme = useTheme()

  // prevents FOUC issues with static assets + dark mode
  const [painted, setPainted] = useState(false)
  useEffect(() => {
    setPainted(true)
  }, [])

  return !painted ? null : (
    <>
      <Head>
        <link rel="shortcut icon" href={`./favicon-${theme.isDarkMode ? 'dark' : 'light'}.ico`} />
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

export default class Root extends App {
  render() {
    const { Component } = this.props

    return (
      <>
        <Head>
          <title>Noah Zinsmeister</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        </Head>

        <LocalStorageContext>
          <LocalStorageUpdater />
          <FunctionalRoot Component={Component} />
        </LocalStorageContext>
      </>
    )
  }
}
