'use client'

import { useState } from 'react'
import styles from '@/app/guide-video/page.module.css'

const GUIDE_VIDEO_SRC = '/images/shop/800166146.197005.mp4'

export default function GuideVideoPlayer() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <p className={styles.videoError}>
        道案内動画を読み込めませんでした。通信環境をご確認のうえ、ページを再読み込みしてください。
      </p>
    )
  }

  return (
    <video
      className={styles.video}
      src={GUIDE_VIDEO_SRC}
      controls
      playsInline
      preload="auto"
      aria-label="鶯谷駅・入谷駅からの道案内動画"
      onError={() => setHasError(true)}
    />
  )
}
