import { useState, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { resolve } from 'url'

import { isIPFS, getRelativeURI } from '../utils'
import LocalStorageContext, { Updater as LocalStorageContextUpdater } from '../contexts/LocalStorage'
import useTheme from '../theme'
import Layout from '../components/Layout'

import '../styles.css'
import 'swiper/css/swiper.css'
import '@reach/dialog/styles.css'

export default class extends App {
  render() {
    const { Component } = this.props
    return <ClientSideRoot Component={Component} />
  }
}

// exists to short-circuit rendering until we are client-side
function ClientSideRoot({ Component }) {
  const [blocked, setBlocked] = useState(true)
  useEffect(() => {
    setBlocked(false)
  }, [])

  if (blocked) {
    return null
  } else {
    const IPFSBase =
      isIPFS &&
      resolve(
        window.location.origin, // e.g. https://ipfs.io"
        window.location.pathname
          .split('/')
          .slice(0, 3)
          .join('/') // e.g. /ipns/noahzinsmeister.com
      )

    return (
      <>
        {isIPFS && (
          <Head>
            <base href={IPFSBase} />
          </Head>
        )}

        <LocalStorageContext>
          <LocalStorageContextUpdater />
          <Content Component={Component} />
        </LocalStorageContext>
      </>
    )
  }
}

// highest-level component in which we can access LocalStorageContext
function Content({ Component }) {
  const theme = useTheme()

  const favicon = getRelativeURI(`/favicon${theme.isDarkMode ? '-dark' : ''}.ico`)

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
