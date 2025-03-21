'use client'

import { Fragment, useState } from 'react'
import { Lightbox } from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import NextJsImage from './NextJsImage'
import styles from './page.module.css'
import { buildings, food, nature, urban } from './slides'

const slidesList = [
  { name: 'Urban', slides: urban },
  { name: 'Food', slides: food },
  { name: 'Nature', slides: nature },
  { name: 'Buildings', slides: buildings },
]

export default function Lightboxes() {
  const [urbanOpen, setUrban] = useState(false)
  const [foodOpen, setFood] = useState(false)
  const [natureOpen, setNature] = useState(false)
  const [buildingsOpen, setBuildings] = useState(false)

  const stateList = [
    { open: urbanOpen, set: setUrban },
    { open: foodOpen, set: setFood },
    { open: natureOpen, set: setNature },
    { open: buildingsOpen, set: setBuildings },
  ]

  return (
    <div className={styles.yMargin}>
      <div className={styles.container}>
        {slidesList.map(({ name, slides }, i) => {
          const { open, set } = stateList[i]

          return (
            <Fragment key={i}>
              <button
                type="button"
                style={{
                  background: `url('${name.toLowerCase()}0.jpg') no-repeat`,
                }}
                onClick={() => set(true)}
              >
                <span>
                  <h1>{name}</h1>
                </span>
              </button>

              <Lightbox
                open={open}
                close={() => set(false)}
                slides={slides}
                render={{ slide: NextJsImage }}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
