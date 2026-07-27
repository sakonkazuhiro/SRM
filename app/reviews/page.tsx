'use client'

import { useState } from 'react'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'
import styles from './page.module.css'

/** 口コミ投稿用（Google口コミはこちらから☞） */
const GOOGLE_REVIEW_POST_URL = 'https://g.page/r/CS1FearbN9qvEAE/review'
/** 口コミ閲覧用（Google口コミを詳しく☞） */
const GOOGLE_REVIEWS_VIEW_URL = 'https://www.google.com/maps/search/ホシのキッチン'

type Review = {
  id: number
  nickname: string
  date: string
  comment: string
  image?: string
  videoSrc?: string
  rating: number
  /** 指定時、（Google口コミ）をこのURLへのリンクとして表示 */
  sourceUrl?: string
}

export default function Reviews() {
  // サンプル口コミデータ（手動で追加・編集可能）
  const [reviews] = useState<Review[]>([
    {
      id: 12,
      nickname: 'オニギリ様',
      date: '2026.07.20',
      comment:
        'Google評価★４.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n入谷駅から徒歩圏内で夜遅くまで営業しているのが嬉しいです。\nハンバーグも美味しく、レトロな雰囲気の店内でゆっくり食事を楽しめました。\n\n食事: 4/5　サービス: 4/5　雰囲気: 4/5\n（Google口コミより）',
      rating: 4,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 11,
      nickname: 'VCDV様',
      date: '2026.06.22',
      comment:
        'Google評価★４.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n肉汁あふれる自家製ハンバーグと濃厚なデミグラスソースが絶品。\nコーンやナポリタンなど付け合わせも充実していて、昔ながらの洋食を楽しめました。\n店内の雰囲気も良く、満足度の高いランチでした。\n\n食事: 4/5　サービス: 3/5　雰囲気: 4/5\n（Google口コミより）',
      rating: 4,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 10,
      nickname: 'Enamillionaire様',
      date: '2026.06.15',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\nラストオーダー直前の来店でしたが、快く迎えていただきました。\nミスジ100gステーキは火入れが絶妙で、最後まで柔らかく美味しかったです。\nランチのライス大もボリューム満点で最高でした！\n\n食事: 5/5　サービス: 5/5　雰囲気: 5/5\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 9,
      nickname: 'Kaz M様',
      date: '2026.05.18',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\nA newly opened Yoshoku restaurant.\nWelcome to the hood!\n\n（新しくオープンした洋食レストラン。入谷へようこそ！）\n\n食事: 5/5　サービス: 5/5　雰囲気: 5/5\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 8,
      nickname: 'BASTILLE Sir様',
      date: '2026.04.28',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n夜遅くまでやってるのが嬉しい！\nチーズハンバーグ美味しい！\n\n食事: 5/5　サービス: 5/5　雰囲気: 5/5\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 7,
      nickname: '鬼の岩蔵（鬼岩）様',
      date: '2026.04.27',
      comment:
        'Google評価★４.０/５.０\n\nお客様から貴重なご意見をいただいています\n\nもう少し安いと助かります。\nチキンソテーは美味しい。\n\n食事: 4/5　サービス: 3/5　雰囲気: 3/5\n（Google口コミより）',
      rating: 4,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 6,
      nickname: 'hiro T様',
      date: '2026.03.28',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\nハンバーグとナポリタンを食べました。どちらもとても美味い！\n\n食事: 5/5　サービス: 4/5　雰囲気: 3/5\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 0,
      nickname: 'chi too様',
      date: '2026.03.08',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n雰囲気は良く、店内も昔ながらでおしゃれな感じです！\n店主の腕前はもちろん、すごくとてもおいしかったです😊お腹いっぱいになりました！\nまた、ご利用させていただきます。\n\n食事: 5/5　サービス: 5/5　雰囲気: 5/5\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 1,
      nickname: 'R.W.様',
      date: '2026.02.26',
      comment:
        'Google評価★５.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n平日ランチにご来店。\n「しっかり塩味のあるとろとろチーズとハンバーグが絶妙に合い、濃厚なのにくどくなく美味しかった！」\n店内の雰囲気やハンバーグの濃厚さをご評価いただきました。\n（Google口コミより）',
      rating: 5,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
    },
    {
      id: 2,
      nickname: 'T2G様',
      date: '2026.02.10',
      comment:
        'Google評価★４.０/５.０\n\nお客様から嬉しいお声をいただいています\n\n「ハンバーグやステーキが美味しい」とのお声をいただきました。\n（Google口コミより）',
      rating: 4,
      sourceUrl: GOOGLE_REVIEWS_VIEW_URL,
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
            <p className={styles.googleReviewCta}>
              <a
                href={GOOGLE_REVIEW_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleReviewLink}
              >
                Google口コミはこちらから☞
              </a>
            </p>
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
                    <span className={styles.nickname}>
                      {review.nickname}
                      {review.sourceUrl ? (
                        <>
                          {' '}
                          <a
                            href={review.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.sourceLink}
                          >
                            （Google口コミを詳しく☞）
                          </a>
                        </>
                      ) : null}
                    </span>
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
