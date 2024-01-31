import Link from 'next/link'
import styles from './page.module.css'

export default function Page() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>
          Noah
          <br />
          Zinsmeister
        </h1>
      </div>

      <div className={styles.links}>
        <a href="mailto:noahwz@pm.me" target="_blank">
          Email
        </a>
        <a href="https://twitter.com/NoahZinsmeister" target="_blank">
          Twitter (X)
        </a>
        <a href="https://github.com/NoahZinsmeister" target="_blank">
          GitHub
        </a>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h1 role="img">🎙️</h1>
          <p className={styles.description}>
            I&apos;m a programmer and technologist based in Brooklyn, NY. I
            studied Economics-Mathematics at Columbia, and after a close call
            with a PhD I fell down the cryptocurrency rabbit hole. At the moment
            I&apos;m working on some personal projects, and in my free time I
            enjoy tennis, fashion, vegetarian food, and wine.
          </p>
        </div>

        <div className={styles.section}>
          <h1 role="img">🖊️</h1>
          <p className={styles.writing}>
            <a href="https://uniswap.org/whitepaper-v3.pdf" target="_blank">
              Uniswap v3
            </a>
            <small>2021</small>
            <a href="https://uniswap.org/whitepaper.pdf" target="_blank">
              Uniswap v2
            </a>
            <small>2020</small>
            <a
              href="https://libertystreeteconomics.newyorkfed.org/2017/10/the-cost-and-duration-of-excess-funding-capacity-in-tri-party-repo.html"
              target="_blank"
            >
              The Cost and Duration of Excess Funding Capacity in Tri-Party Repo
            </a>
            <small>2017</small>
            <a
              href="https://libertystreeteconomics.newyorkfed.org/2017/10/excess-funding-capacity-in-tri-party-repo.html"
              target="_blank"
            >
              Excess Funding Capacity in Tri-Party Repo
            </a>
            <small>2017</small>
            <a
              href="https://libertystreeteconomics.newyorkfed.org/2017/08/regulatory-incentives-and-quarter-end-dynamics-in-the-repo-market.html"
              target="_blank"
            >
              Regulatory Incentives and Quarter-End Dynamics in the Repo Market
            </a>
            <small>2017</small>
          </p>
        </div>

        <div className={styles.section}>
          <h1 role="img">📷</h1>
          <p className={styles.photography}>
            <Link href="/photography">Noah Zinsmeister Photography</Link>
            <a href="https://fingerlakesfeast.com" target="_blank">
              Finger Lakes Feast
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
