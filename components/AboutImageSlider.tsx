'use client'

import { useState } from 'react'
import styles from './AboutImageSlider.module.css'

type Slide = { src: string; alt: string }

type AboutImageSliderProps = {
  slides: Slide[]
}

export default function AboutImageSlider({ slides }: AboutImageSliderProps) {
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
  }

  if (slides.length === 0) return null

  return (
    <div className={styles.slider}>
      <div className={styles.sliderInner}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            aria-hidden={index !== current}
            style={{ display: index === current ? 'block' : 'none' }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={styles.slideImage}
              loading={index === 0 ? 'lazy' : undefined}
              decoding="async"
            />
          </div>
        ))}
      </div>
      {total > 1 && (
        <>
          <button
            type="button"
            className={styles.btnPrev}
            onClick={goPrev}
            aria-label="前の画像"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.btnNext}
            onClick={goNext}
            aria-label="次の画像"
          >
            ›
          </button>
          <span className={styles.counter} aria-live="polite">
            {current + 1} / {total}
          </span>
        </>
      )}
    </div>
  )
}
