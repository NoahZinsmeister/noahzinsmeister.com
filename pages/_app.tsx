import { useState, useLayoutEffect, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'

import LocalStorageContext, { Updater as LocalStorageContextUpdater } from '../contexts/LocalStorage'
import useTheme from '../theme'
import { isServerSide } from '../utils'
import Base from '../components/Base'
import Layout from '../components/Layout'

import 'swiper/css/swiper.css'
import '@reach/dialog/styles.css'

import '../styles.css'

const useIsomorphicLayoutEffect = isServerSide ? useEffect : useLayoutEffect

export default class extends App {
  render() {
    const { Component } = this.props
    return (
      <>
        <Base />
        <ClientSideRoot Component={Component} />
      </>
    )
  }
}

// exists to short-circuit rendering until we are client-side
function ClientSideRoot({ Component }) {
  const [painted, setPainted] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setPainted(true)
  }, [])

  if (!painted) {
    return null
  }

  return (
    <LocalStorageContext>
      <LocalStorageContextUpdater />
      <Content Component={Component} />
    </LocalStorageContext>
  )
}

// highest-level component in which we can access LocalStorageContext
function Content({ Component }) {
  const theme = useTheme()

  const favicon = `./favicon${theme.isDarkMode ? '-dark' : ''}.ico`

  return (
    <>
      <Head>
        <link rel="icon" href={favicon} />
      </Head>

      <Layout>
        <Component />
      </Layout>

      <style jsx global>
        {`
          body {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
          }
        `}
      </style>
    </>
  )
}
