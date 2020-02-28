import { useState, useCallback } from 'react'
import { Dialog } from '@reach/dialog'
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
      <Dialog
        aria-label="Carousel"
        isOpen={isOpen}
        onDismiss={onDismiss}
        style={{ width: '80vw', height: '80vh', padding: '0', background: 'transparent', display: 'flex' }}
      >
        <Swiper
          getSwiper={updateSwiper}
          {...{
            effect: 'coverflow',
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
            <img key={i} src={`photography/${variant}${i + 1}.jpg`} alt="" />
          ))}
        </Swiper>
      </Dialog>

      <style jsx>{`
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  )
}
