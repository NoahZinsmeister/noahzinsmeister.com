import Document, { Html, Head, Main, NextScript } from 'next/document'

// https://hankchizljaw.com/wrote/a-modern-css-reset/
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="Description" content="Noah Zinsmeister's Homepage" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
