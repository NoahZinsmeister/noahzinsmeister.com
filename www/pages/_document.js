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
          <link rel="shortcut icon" href="static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>
          {`
            /* Box sizing rules */
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            /* global outline width */
            * {
              outline-width: thin;
            }

            /* Remove default padding */
            ul[class],
            ol[class] {
              padding: 0;
            }

            /* Remove default margin */
            body,
            h1,
            h2,
            h3,
            h4,
            p,
            ul[class],
            ol[class],
            li,
            figure,
            figcaption,
            blockquote,
            dl,
            dd {
              margin: 0;
            }

            html {
              font-family: 'Roboto Mono', monospace;
            }

            /* Set core body defaults */
            body {
              min-height: 100vh;
              scroll-behavior: smooth;
              text-rendering: optimizeSpeed;
              line-height: 1.5;
            }

            /* Inherit fonts for inputs and buttons */
            input,
            button,
            textarea,
            select {
              font: inherit;
            }
          `}
        </style>
      </Html>
    )
  }
}
