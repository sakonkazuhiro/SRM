'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <img
              src="/images/common/logo.png"
              alt="ホシのキッチン"
              className={styles.logoImage}
            />
          </Link>
        </div>
        <nav className={styles.nav} aria-hidden={!isMenuOpen}>
          <Link href="/" className={pathname === '/' ? styles.active : ''} onClick={closeMenu}>
            ホーム
          </Link>
          <Link href="/menu" className={pathname === '/menu' ? styles.active : ''} onClick={closeMenu}>
            メニュー
          </Link>
          <Link href="/notice" className={pathname === '/notice' ? styles.active : ''} onClick={closeMenu}>
            お知らせ
          </Link>
          <Link href="/reviews" className={pathname === '/reviews' ? styles.active : ''} onClick={closeMenu}>
            口コミ
          </Link>
          <Link href="/message" className={pathname === '/message' ? styles.active : ''} onClick={closeMenu}>
            オーナーシェフの言葉
          </Link>
          <Link href="/contact" className={pathname === '/contact' ? styles.active : ''} onClick={closeMenu}>
            お問い合わせ
          </Link>
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

