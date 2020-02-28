import Document, { Html, Head, Main, NextScript } from 'next/document'

// thanks to https://github.com/Velenir/nextjs-ipfs-example
const SCRIPT_TEXT = `
  (function () {
    const { pathname } = window.location
    const ipfsMatch = pathname.slice(0, 5) === "/ipns" || pathname.slice(0, 5) === "/ipfs"
    const base = document.createElement('base')
    base.href = ipfsMatch ? pathname : '/'
    document.head.append(base)
  })()
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEXT }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
