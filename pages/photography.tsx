import { useState } from 'react'

import useTheme from '../theme'
import Carousel, { Variant } from '../components/Carousel'

const VARIANTS = [Variant.Urban, Variant.Food, Variant.Portraits, Variant.Nature, Variant.Buildings, Variant.Events]

export default function Photography() {
  const theme = useTheme()
  const [openVariant, setOpenVariant] = useState()

  return (
    <>
      <div className="wrapper">
        {VARIANTS.map(variant => {
          const url = `/photography/${variant}1.jpg`
          return (
            <div
              key={variant}
              tabIndex={0}
              style={{ background: `url(${url}) no-repeat`, backgroundSize: '100%' }}
              onClick={() => {
                setOpenVariant(variant)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  setOpenVariant(variant)
                }
              }}
            >
              <h1>{variant.toLocaleUpperCase()}</h1>
            </div>
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
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: auto;
          max-width: 60rem;
          height: 100%;
        }

        .wrapper > div {
          opacity: 0.95;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
          flex-shrink: 0;
          width: 16rem;
          height: 9rem;
          display: flex;
          margin: 1.5rem;
        }

        .wrapper > div:hover {
          opacity: 1;
          cursor: pointer;
        }

        .wrapper > div > h1 {
          line-height: 1;
          background-color: ${theme.colors.background};
        }
      `}</style>
    </>
  )
}
