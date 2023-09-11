import { Metadata } from 'next'
import Link from 'next/link'
import Lightboxes from './Lightboxes'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Noah Zinsmeister Photography',
  description: "Noah Zinsmeister's photography",
}

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>
          <Link href="/" className={styles.linkBack}>
            Noah
            <br />
            Zinsmeister
          </Link>
          <br />
          Photography
        </h1>
      </div>
      <Lightboxes />
    </main>
  )
}
