import { useCallback, useRef, useState, useEffect } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import Swiper from 'react-id-swiper'
import { isMobile } from 'react-device-detect'
import { transparentize } from 'polished'

import { useKeyDown } from '../hooks'
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

  const ref = useRef(null)

  const goPrevious = useCallback(() => {
    if (ref?.current?.swiper !== null) {
      ref.current.swiper.slidePrev()
    }
  }, [])
  const goNext = useCallback(() => {
    ref?.current?.swiper?.slideNext()
  }, [])
  const goTo = useCallback(
    (i: number) =>
      function() {
        ref?.current?.swiper?.slideToLoop(i)
      },
    []
  )

  useKeyDown('ArrowLeft', goPrevious, !isOpen, false)
  useKeyDown('ArrowRight', goNext, !isOpen, false)

  return (
    <>
      <DialogOverlay isOpen={isOpen} onDismiss={onDismiss}>
        <DialogContent aria-label="Carousel">
          <button className="close-button" onClick={onDismiss}>
            <h1>✕</h1>
          </button>
          {!isMobile && (
            <>
              <button className="previous-button" onClick={goPrevious}>
                <h1>←</h1>
              </button>
              <button className="next-button" onClick={goNext}>
                <h1>→</h1>
              </button>
            </>
          )}
          <Swiper
            ref={ref}
            {...{
              effect: 'coverflow',
              spaceBetween: 30,
              loop: true
            }}
          >
            {Array.from(Array(DATA[variant]).keys()).map(i => (
              <img key={i} src={`./img/${variant}${i}.jpg`} alt="" />
            ))}
          </Swiper>

          <div className="thumbnail-wrapper">
            {Array.from(Array(DATA[variant]).keys()).map(i => {
              const url = `./img/${variant}${i}.jpg`
              return (
                <button
                  key={i}
                  onClick={goTo(i)}
                  style={{
                    ...{ background: `url(${url}) no-repeat` }
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
          backdrop-filter: blur(4px);
          display: flex;
        }

        :global([data-reach-dialog-content]) {
          width: ${isMobile ? '90vw' : '80vw'};
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
