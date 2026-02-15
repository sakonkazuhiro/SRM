'use client'

import { useState, useEffect } from 'react'
import { useImageLightbox } from '@/components/ImageLightbox'
import styles from './AboutImageSlider.module.css'

type Slide = { src: string; alt: string }

type AboutImageSliderProps = {
  slides: Slide[]
}

export default function AboutImageSlider({ slides }: AboutImageSliderProps) {
  const { openImage } = useImageLightbox()
  const [current, setCurrent] = useState(0)
  const total = slides.length

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
  }

  // 右から左へゆっくり自動スライド（8秒ごと）
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1))
    }, 8000)
    return () => clearInterval(timer)
  }, [total])

  if (slides.length === 0) return null

  return (
    <div className={styles.slider}>
      <div
        className={styles.sliderInner}
        style={{
          width: `${total * 100}%`,
          transform: `translateX(-${current * (100 / total)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            style={{ flex: `0 0 ${100 / total}%` }}
            aria-hidden={index !== current}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`${styles.slideImage} ${styles.clickableSlide}`}
              loading={index === 0 ? 'lazy' : undefined}
              decoding="async"
              onClick={() => openImage(slide.src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openImage(slide.src)
                }
              }}
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
