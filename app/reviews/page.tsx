'use client'

import { useState } from 'react'
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
      nickname: 'たろう',
      date: '2026.01.20',
      comment: 'ハンバーグが絶品でした！肉汁がジューシーで、デミグラスソースとの相性も抜群です。また来たいと思います。',
      image: '/images/news/review1.jpg',
      rating: 5,
    },
    {
      id: 2,
      nickname: 'さくら',
      date: '2026.01.18',
      comment: '国産和牛のステーキをいただきました。柔らかくて美味しかったです。店内の雰囲気も良く、落ち着いて食事できました。',
      rating: 5,
    },
    {
      id: 3,
      nickname: 'けんじ',
      date: '2026.01.15',
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
            <p className={styles.noticeText}>
              ※口コミはオープン後、掲載許可をいただいたものから順次掲載予定です。
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
                      <img
                        src={review.image}
                        alt={`${review.nickname}さんの投稿写真`}
                        className={styles.media}
                      />
                    ) : null}
                  </div>
                )}

                <div className={styles.reviewComment}>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
