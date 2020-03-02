import { useState } from 'react'
import { resolve } from 'styled-jsx/css'

import useTheme from '../theme'
import { getRelativeURI } from '../utils'
import Carousel, { Variant } from '../components/Carousel'
import Button from '../components/Button'

const VARIANTS = [Variant.Urban, Variant.Food, Variant.Portraits, Variant.Nature, Variant.Buildings, Variant.Events]

const { className, styles } = resolve`
  button {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-size: 100% !important;
    background-position: center !important;
    margin: 1.5rem;
    width: 16rem;
    height: 9rem;
    opacity: 0.9;
  }

  button:hover,
  button:focus {
    opacity: 1;
  }
`

export default function Photography() {
  const theme = useTheme()
  const [openVariant, setOpenVariant] = useState()

  return (
    <>
      <div className="wrapper">
        {VARIANTS.map(variant => {
          const url = getRelativeURI(`/photography/${variant}0.jpg`)
          return (
            <Button
              key={variant}
              style={{ background: `url(${url}) no-repeat` }}
              onClick={() => {
                setOpenVariant(variant)
              }}
              className={className}
            >
              <h1>{variant.toLocaleUpperCase()}</h1>
            </Button>
          )
        })}
      </div>
      {VARIANTS.map(variant => (
        <Carousel
          key={variant}
          variant={variant}
          isOpen={variant === openVariant}
          onDismiss={() => {
            setOpenVariant(undefined)
          }}
        />
      ))}
      {styles}
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: auto;
          max-width: 60rem;
          height: 100%;
        }

        h1 {
          user-select: none;
          line-height: 1;
          color: ${theme.colors.text};
          background-color: ${theme.colors.background};
        }
      `}</style>
    </>
  )
}
