import type { Metadata } from 'next'
import { Libre_Franklin } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const font = Libre_Franklin({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noah Zinsmeister',
  description: "Noah Zinsmeister's personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <body className={font.className}>{children}</body>
    </html>
  )
}
