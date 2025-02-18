import type { Metadata } from 'next'
import { Libre_Franklin } from 'next/font/google'
import './globals.css'

const font = Libre_Franklin({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noah Zinsmeister',
  description: 'Personal website and photography portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
