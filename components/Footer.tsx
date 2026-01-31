import styles from './Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.tagline}>
          <p className="textStickerSoft">人を元気にする食卓。</p>
          <p className="textStickerSoft">心温まる洋食レストラン。</p>
        </div>

        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoIcon}>
            <span className={styles.logoImageWrap}>
              <img
                src="/images/S__20152359_0.png"
                alt="ホシのキッチン"
                className={styles.logoMark}
              />
            </span>
            <span className={`${styles.logoText} textStickerGlow`}>ホシのキッチン</span>
          </Link>
        </div>

        <div className={styles.links}>
          <Link href="/menu">メニュー</Link>
          <Link href="/notice">お知らせ</Link>
          <Link href="/reviews">口コミ</Link>
          <Link href="/message">オーナーシェフの言葉</Link>
          <Link href="/contact">お問い合わせ</Link>
        </div>

        <div className={styles.social}>
          <a href="https://x.com/hoshinokichen" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </a>
          <a href="https://www.instagram.com/hoshinokitchen2286" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@hoshinokitchen" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a href="https://line.me/R/ti/p/@620sdfbj" target="_blank" rel="noopener noreferrer" aria-label="LINE">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.63-.63.63H17.61v1.125c0 .345-.282.63-.63.63-.345 0-.63-.285-.63-.63v-1.125H14.46v1.125c0 .345-.283.63-.63.63-.347 0-.632-.285-.632-.63v-1.125h-1.74c-.348 0-.63-.286-.63-.63 0-.347.282-.63.63-.63h1.74v-1.125H9.74c-.348 0-.63-.285-.63-.63 0-.346.282-.631.63-.631h1.74v-1.127H9.74c-.348 0-.63-.285-.63-.63 0-.346.282-.631.63-.631h2.618v-1.125H9.74c-.348 0-.63-.285-.63-.63 0-.346.282-.631.63-.631h2.618V5.214c0-.344.285-.63.63-.63.35 0 .63.286.63.63v1.125h2.52V5.214c0-.344.283-.63.63-.63.35 0 .63.286.63.63v1.125h1.755c.349 0 .63.285.63.63 0 .346-.281.631-.63.631H17.61v1.127h1.755zm-2.618 2.255h-2.52v-1.125h2.52v1.125zM12.772 4.459c-2.036 0-3.688 1.657-3.688 3.703 0 2.043 1.652 3.699 3.688 3.699 2.038 0 3.69-1.656 3.69-3.699 0-2.046-1.652-3.703-3.69-3.703zm-6.914 7.633H2.92c-.348 0-.63-.285-.63-.63 0-.346.282-.63.63-.63h2.938c.348 0 .63.284.63.63 0 .345-.282.63-.63.63zm1.256-3.703H2.92c-.348 0-.63-.285-.63-.63 0-.346.282-.631.63-.631h4.194c.35 0 .63.285.63.63 0 .346-.28.631-.63.631zm1.255-3.707H2.92c-.348 0-.63-.285-.63-.63 0-.346.282-.631.63-.631h5.449c.35 0 .63.285.63.63 0 .346-.28.631-.63.631z"/>
            </svg>
          </a>
        </div>

        <div className={styles.copyright}>
          <p>&copy; 2024 ホシのキッチン. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
