import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="Description" content="Noah Zinsmeister" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
