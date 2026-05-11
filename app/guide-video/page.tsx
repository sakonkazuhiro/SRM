import Link from 'next/link'
import styles from './page.module.css'

export default function GuideVideoPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <h1>道案内動画</h1>
          <p className={styles.subtitle}>鶯谷駅・入谷駅からホシのキッチンまで</p>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.videoWrap}>
            <video
              className={styles.video}
              src="/images/shop/800166146.197005.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="鶯谷駅・入谷駅からの道案内動画"
            />
            <div className={styles.back}>
              <Link href="/" className="btn">
                ホームへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
