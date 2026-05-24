'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import styles from './ImageLightbox.module.css'

type ImageLightboxContextValue = {
  openImage: (src: string) => void
}

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(null)

function isVideoSrc(src: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export function useImageLightbox() {
  const ctx = useContext(ImageLightboxContext)
  if (!ctx) return { openImage: () => {} }
  return ctx
}

export function ImageLightboxProvider({ children }: { children: React.ReactNode }) {
  const [src, setSrc] = useState<string | null>(null)
  const isVideo = src ? isVideoSrc(src) : false

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
          aria-label={isVideo ? '動画を拡大表示' : '画像を拡大表示'}
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
          <div className={styles.imageWrap} onClick={(e) => e.stopPropagation()}>
            {isVideo ? (
              <video
                src={src}
                className={styles.fullVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
                draggable={false}
              />
            ) : (
              <img src={src} alt="" className={styles.fullImage} draggable={false} />
            )}
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

/** クリックで全画面表示する動画（おすすめメニュー等） */
type ClickableVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string
}

export function ClickableVideo({ src, onClick, onKeyDown, className, ...rest }: ClickableVideoProps) {
  const { openImage } = useImageLightbox()

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    openImage(src)
    onClick?.(e as unknown as React.MouseEvent<HTMLVideoElement>)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openImage(src)
    }
    onKeyDown?.(e as unknown as React.KeyboardEvent<HTMLVideoElement>)
  }

  const { 'aria-label': ariaLabel, ...videoProps } = rest

  return (
    <div
      className={`${styles.clickableVideoWrap} ${styles.clickable}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <video {...videoProps} src={src} className={className} />
    </div>
  )
}
