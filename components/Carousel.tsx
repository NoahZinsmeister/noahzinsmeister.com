import { useState, useCallback } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import Swiper from 'react-id-swiper'

import { useKeyDown } from '../hooks'

export enum Variant {
  Urban = 'urban',
  Food = 'food',
  Portraits = 'portraits',
  Nature = 'nature',
  Buildings = 'buildings',
  Events = 'events'
}

const DATA = {
  [Variant.Urban]: 9,
  [Variant.Food]: 8,
  [Variant.Portraits]: 9,
  [Variant.Nature]: 11,
  [Variant.Buildings]: 8,
  [Variant.Events]: 10
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
  const [swiper, updateSwiper] = useState(null)
  const goNext = useCallback(() => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }, [swiper])
  const goPrev = useCallback(() => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }, [swiper])

  useKeyDown('ArrowRight', goNext, !isOpen, false)
  useKeyDown('ArrowLeft', goPrev, !isOpen, false)

  return (
    <>
      <DialogOverlay
        style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(2px)' }}
        isOpen={isOpen}
        onDismiss={onDismiss}
      >
        <DialogContent
          aria-label="Carousel"
          style={{
            width: '90vw',
            height: '100vh',
            padding: '0',
            background: 'transparent',
            display: 'flex',
            margin: 'auto'
          }}
        >
          <Swiper
            getSwiper={updateSwiper}
            {...{
              spaceBetween: 30,
              grabCursor: true,
              loop: true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              renderNextButton: () => (
                <button
                  style={{ background: 'transparent', border: 'none', fontSize: 0, outline: 'none' }}
                  className="swiper-button-next"
                />
              ),
              renderPrevButton: () => (
                <button
                  style={{ background: 'transparent', border: 'none', fontSize: 0, outline: 'none' }}
                  className="swiper-button-prev"
                />
              ),
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              }
            }}
          >
            {Array.from(Array(DATA[variant]).keys()).map(i => (
              <img key={i} src={`/photography/${variant}${i + 1}.jpg`} alt="" {...{ loading: 'lazy' }} />
            ))}
          </Swiper>
        </DialogContent>
      </DialogOverlay>

      <style jsx>{`
        img {
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  )
}
