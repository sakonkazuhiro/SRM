'use client'

import { useState } from 'react'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'
import styles from './page.module.css'

type Review = {
  id: number
  nickname: string
  date: string
  comment: string
  image?: string
  videoSrc?: string
  rating: number
}

export default function Reviews() {
  // サンプル口コミデータ（手動で追加・編集可能）
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      nickname: 'R.W.様',
      date: '2026.02.26',
      comment: '平日ランチにご来店。\n「しっかり塩味のあるとろとろチーズとハンバーグが絶妙に合い、濃厚なのにくどくなく美味しかった！」\n店内の雰囲気やハンバーグの濃厚さをご評価いただきました。\n（Google口コミより）',
      rating: 5,
    },
    {
      id: 2,
      nickname: 'T2G様',
      date: '2026.02.10',
      comment: '「ハンバーグやステーキが美味しい」とのお声をいただきました。\n（Google口コミより）',
      rating: 4,
    },
    {
      id: 3,
      nickname: 'たろう',
      date: '2026.02.10',
      comment: 'ハンバーグが絶品でした！肉汁がジューシーで、デミグラスソースとの相性も抜群です。また来たいと思います。',
      rating: 5,
    },
    {
      id: 4,
      nickname: 'さくら',
      date: '2026.02.07',
      comment: '国産和牛のステーキをいただきました。柔らかくて美味しかったです。店内の雰囲気も良く、落ち着いて食事できました。',
      rating: 5,
    },
    {
      id: 5,
      nickname: 'けんじ',
      date: '2026.02.05',
      comment: 'ランチで利用しました。ボリュームもあり、コスパが良いです。スタッフの方も親切でした。',
      rating: 4,
    },
  ])

  return (
    <div className={styles.reviewsPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>お客様の声</h1>
          <p className={styles.heroSubtitle}>お客様からいただいた口コミをご紹介します</p>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className="container">
          <div className={styles.noticeBox}>
            <p className={`${styles.noticeText} breakAfterPeriod`}>
              {breakAfterPeriod('※掲載している口コミは各プラットフォームの公開情報をもとにご紹介しております。問題がございましたらお問い合わせください。')}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <span className={styles.nickname}>{review.nickname}</span>
                    <span className={styles.date}>{review.date}</span>
                  </div>
                  <div className={styles.rating}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </div>
                </div>

                {(review.image || review.videoSrc) && (
                  <div className={styles.mediaContainer}>
                    {review.videoSrc ? (
                      <video
                        src={review.videoSrc}
                        controls
                        muted
                        playsInline
                        className={styles.media}
                      />
                    ) : review.image ? (
                      <ClickableImage
                        src={review.image}
                        alt={`${review.nickname}さんの投稿写真`}
                        className={styles.media}
                      />
                    ) : null}
                  </div>
                )}

                <div className={styles.reviewComment}>
                  <p className="breakAfterPeriod">{breakAfterPeriod(review.comment)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
