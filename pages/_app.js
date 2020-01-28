import App from 'next/app'
import Head from 'next/head'

import LocalStorageContext, { Updater as LocalStorageUpdater } from '../contexts/LocalStorage'
import useTheme from '../theme'
import Layout from '../components/Layout'

import './styles.css'

function FunctionalRoot({ Component }) {
  const theme = useTheme()

  return (
    <>
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
