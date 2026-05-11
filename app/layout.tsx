import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { ImageLightboxProvider } from '@/components/ImageLightbox'

export const metadata: Metadata = {
  title: 'ホシのキッチン | 洋食レストラン',
  description: '星翔オーナーシェフがお届けする、鉄板ステーキと心温まる洋食の店「ホシのキッチン」',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ImageLightboxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ImageLightboxProvider>
      </body>
    </html>
  )
}

