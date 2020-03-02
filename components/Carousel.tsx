import { useState, useCallback, useEffect } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import Swiper from 'react-id-swiper'

import { getRelativeURI } from '../utils'
import { useKeyDown } from '../hooks'
import { transparentize } from 'polished'
import useTheme from '../theme'

export enum Variant {
  Urban = 'urban',
  Food = 'food',
  Portraits = 'portraits',
  Nature = 'nature',
  Buildings = 'buildings',
  Events = 'events'
}

const DATA = {
  [Variant.Urban]: 8,
  [Variant.Food]: 8,
  [Variant.Portraits]: 8,
  [Variant.Nature]: 11,
  [Variant.Buildings]: 7,
  [Variant.Events]: 8
}

export default function Carousel({
  variant,
  isOpen,
  onDismiss
}: {
  variant: Variant
  isOpen: boolean
  onDismiss: () => void
}) {
  const theme = useTheme()

  const [swiper, updateSwiper] = useState(null)
  const goPrevious = useCallback(() => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }, [swiper])
  const goNext = useCallback(() => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }, [swiper])
  const goTo = useCallback(
    (i: number) =>
      function() {
        if (swiper !== null) {
          swiper.slideTo(i)
        }
      },
    [swiper]
  )

  const [, forceRerender] = useState(0)
  useEffect(() => {
    if (swiper !== null) {
      const onSlideChange = () => {
        forceRerender(i => i + 1)
      }
      swiper?.on('slideChange', onSlideChange)
      return () => {
        swiper?.off('slideChange', onSlideChange)
      }
    }
  }, [swiper])

  useKeyDown('ArrowLeft', goPrevious, !isOpen, false)
  useKeyDown('ArrowRight', goNext, !isOpen, false)

  return (
    <>
      <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
        <DialogContent aria-label="Carousel">
          <button className="close-button" onClick={onDismiss}>
            <h1>✕</h1>
          </button>
          <button className="previous-button" onClick={goPrevious}>
            <h1>←</h1>
          </button>
          <button className="next-button" onClick={goNext}>
            <h1>→</h1>
          </button>
          <Swiper
            getSwiper={updateSwiper}
            {...{
              effect: 'coverflow',
              spaceBetween: 30,
              loop: true
            }}
          >
            {Array.from(Array(DATA[variant]).keys()).map(i => (
              <img key={i} src={getRelativeURI(`/photography/${variant}${i}.jpg`)} alt="" />
            ))}
          </Swiper>

          <div className="thumbnail-wrapper">
            {Array.from(Array(DATA[variant]).keys()).map(i => {
              const url = getRelativeURI(`/photography/${variant}${i}.jpg`)
              const active = swiper !== null && i === swiper.realIndex
              return (
                <button
                  key={i}
                  onClick={goTo(i + 1)}
                  style={{
                    ...{ background: `url(${url}) no-repeat` },
                    ...(active ? { border: `1px solid ${theme.colors.link}` } : { opacity: 0.9 })
                  }}
                />
              )
            })}
          </div>
        </DialogContent>
      </DialogOverlay>

      <style jsx>{`
        :global([data-reach-dialog-overlay]) {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(2px);
          display: flex;
        }

        :global([data-reach-dialog-content]) {
          width: 80vw;
          max-height: 80vh;
          padding: 0;
          background: transparent;
          display: flex;
          margin: auto;
        }

        button {
          margin: 1rem;
          padding: 1rem;
          border: none;
          background: transparent;
          min-width: 2rem;
          min-height: 2rem;
          cursor: pointer;
        }

        .close-button,
        .next-button,
        .previous-button,
        .thumbnail-wrapper {
          position: absolute;
          z-index: 2;
        }

        .close-button {
          top: 0;
          left: 0;
          min-width: 4rem;
          min-height: 4rem;
        }

        .next-button {
          top: 50%;
          right: 0;
          padding: 0.5rem;
          transform: translateY(-50%);
        }

        .previous-button {
          top: 50%;
          left: 0;
          padding: 0.5rem;
          transform: translateY(-50%);
        }

        h1 {
          line-height: 1;
          color: ${theme.colors.text};
        }

        img {
          user-select: none;
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
        }

        .thumbnail-wrapper {
          bottom: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background: ${transparentize(0.5, theme.colors.background)};
        }

        .thumbnail-wrapper > button {
          background-size: 100% !important;
          background-position: center !important;
        }
      `}</style>
    </>
  )
}
