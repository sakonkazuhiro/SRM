'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import styles from './ImageLightbox.module.css'

type ImageLightboxContextValue = {
  openImage: (src: string) => void
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null)

export function useImageLightbox() {
  const ctx = useContext(ImageLightboxContext)
  if (!ctx) return { openImage: () => {} }
  return ctx
}

export function ImageLightboxProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null)

  const openImage = useCallback((s: string) => {
    setSrc(s)
  }, [])

  const close = useCallback(() => {
    setSrc(null)
  }, [])

  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [src])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close()
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') close()
    },
    [close]
  )

  return (
    <ImageLightboxContext.Provider value={{ openImage }}>
      {children}
      {src && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="画像を拡大表示"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            className={styles.closeBtn}
            onClick={close}
            aria-label="閉じる"
          >
            ×
          </button>
          <div className={styles.imageWrap}>
            <img src={src} alt="" className={styles.fullImage} draggable={false} />
          </div>
        </div>
      )}
    </ImageLightboxContext.Provider>
  )
}

/** クリックで全画面表示する画像。src があるときだけクリック有効（未設定の画像枠も同じコンポーネントで後から src を渡せばその時点で拡大可能） */
type ClickableImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export function ClickableImage({ src, alt, onClick, ...rest }: ClickableImageProps) {
  const { openImage } = useImageLightbox()

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (src) {
      e.preventDefault()
      openImage(src)
    }
    onClick?.(e)
  }

  return (
    <img
      src={src}
      alt={alt ?? ''}
      decoding="async"
      {...rest}
      onClick={handleClick}
      role={src ? 'button' : undefined}
      tabIndex={src ? 0 : undefined}
      onKeyDown={
        src
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                openImage(src)
              }
            }
          : undefined
      }
      className={src ? `${rest.className ?? ''} ${styles.clickable}`.trim() : rest.className}
    />
  )
}
