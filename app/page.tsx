import styles from './page.module.css'
import Link from 'next/link'
import { notices } from '@/data/notices'
import NoticeItem from '@/components/NoticeItem'

export default function Home() {
  return (
    <div className={styles.home}>
      {/* ヒーローセクション */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} textStickerGlow`}>ホシのキッチン</h1>
          <p className={`${styles.heroSubtitle} textStickerSoft`}>心温まる洋食レストラン</p>
          <p className={styles.heroDescription}>
            オーナーシェフ星翔が心を込めてお作りする、<br />
            ひとりひとりに寄り添う洋食をお楽しみください。
          </p>
          <Link href="/message" className="btn">
            オーナーシェフの言葉
          </Link>
        </div>
      </section>

      {/* 店舗紹介セクション */}
      <section className={styles.about}>
        <div className="container">
          <h2 className="textStickerGlow">ホシのキッチンについて</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                「ホシのキッチン」は、オーナーシェフ星翔が手がける洋食レストランです。
                長年培ってきた技術と、お客様への想いを大切にしながら、
                ひとつひとつの料理に真心を込めてお作りしています。
              </p>
              <p>
                レストランという言葉の語源である「レストラン（restore=元気を回復させる）」のように、
                お客様が当店で過ごす時間が、心身ともにリフレッシュできる場所となるよう、
                日々精進してまいります。
              </p>
              <p>
                家族や友人、大切な方とのひとときに、ぜひお立ち寄りください。
              </p>
            </div>
            <div className={styles.aboutImage}>
              <div className={styles.placeholderImage}>
                <img
                  src="/images/S__121397254.jpg"
                  alt="ホシのキッチン 店舗写真"
                  className={styles.aboutPhoto}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* おすすめメニューセクション */}
      <section className={styles.recommend}>
        <div className="container">
          <h2>おすすめメニュー</h2>
          <p style={{ textAlign: 'right', marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#666' }}>
            ※オーナーシェフお勧めになります、ご賞味あれ👍
          </p>
          <div className={styles.menuGrid}>
            <div className={styles.menuCard}>
              <div className={styles.menuImage}>
                <img src="/images/26-01-29_116_2.jpg" alt="当店自慢の自家製ハンバーグ" className={styles.menuCardImage} loading="lazy" decoding="async" />
              </div>
              <div className={styles.menuInfo}>
                <h3>当店自慢の自家製ハンバーグ</h3>
                <p>厳選した牛肉を使用した、こだわりのハンバーグです。</p>
              </div>
            </div>
            <div className={styles.menuCard}>
              <div className={styles.menuImage}>
                <p>国産和牛ミスジ</p>
              </div>
              <div className={styles.menuInfo}>
                <h3>国産和牛ミスジ</h3>
                <p>国産和牛の赤身が味わえる、あっさりとしたステーキです。</p>
              </div>
            </div>
            <div className={styles.menuCard}>
              <div className={styles.menuImage}>
                <img src="/images/26-01-30_188_2%20(1).jpg" alt="国産和牛ランプ" className={styles.menuCardImage} loading="lazy" decoding="async" />
              </div>
              <div className={styles.menuInfo}>
                <h3>国産和牛ランプ</h3>
                <p>国産和牛のランプ。コクのある味わいのステーキです。</p>
              </div>
            </div>
            <div className={styles.menuCard}>
              <div className={styles.menuImage}>
                <p>国産黒毛和牛サーロイン</p>
              </div>
              <div className={styles.menuInfo}>
                <h3>国産黒毛和牛サーロイン</h3>
                <p>国産黒毛和牛のサーロイン。とろける食感が自慢のステーキです。</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/menu" className="btn">
              メニュー一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* お知らせセクション（data/notices.ts と共有・お知らせタブで追加・変更するとここにも反映） */}
      <section className={styles.notice}>
        <div className="container">
          <h2>お知らせ</h2>
          <div className={styles.noticeList}>
            {notices.map((notice) => (
              <NoticeItem key={notice.date} notice={notice} />
            ))}
          </div>
        </div>
      </section>

      {/* 所在地・アクセスセクション */}
      <section className={styles.location}>
        <div className="container">
          <h2>所在地・アクセス</h2>
          <div className={styles.locationContent}>
            <div className={styles.mapContainer}>
              <iframe
                className={styles.mapFrame}
                src="https://www.google.com/maps?q=%E3%80%90111-0031+%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8F%B0%E6%9D%B1%E5%8C%BA%E5%8D%83%E6%9D%9F2-28-6+%E8%97%A4%E5%B2%A1%E3%83%93%E3%83%AB1F&hl=ja&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className={styles.addressInfo}>
              <h3 className="textStickerGlow">ホシのキッチン</h3>
              <div className={styles.address}>
                <p className={styles.addressRow}>
                  <span className={styles.addressIconPin} aria-hidden>📍</span>
                  <span>〒111-0031</span>
                </p>
                <p className={styles.addressRowAddress}>
                  東京都台東区千束2-28-6 藤岡ビル1F
                </p>
                <p className={styles.addressRow}>
                  <span className={styles.addressIcon} aria-hidden>☎</span>
                  <span className={styles.phoneNumber}>03-6802-3279</span>
                </p>
                <p className={styles.addressRow}>
                  <span className={styles.addressIcon} aria-hidden>📱</span>
                  <span className={styles.phoneNumber}>090-2905-9292</span>
                </p>
                <p className={styles.addressRow}>
                  <span className={styles.addressIcon} aria-hidden>✉</span>
                  hoshi.syo@gmail.com
                </p>
                <p className={styles.addressBlock}>
                  <strong className={styles.addressLabel}>営業時間</strong><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ランチ</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>11:30～15:00</strong>（L.O.<strong className={styles.hoursNum}>14:30</strong>）
                  </span><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ディナー</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>17:00～24:00</strong>（L.O.<strong className={styles.hoursNum}>23:00</strong>）
                  </span>
                </p>
                <p className={styles.addressBlock}>
                  <strong className={styles.addressLabel}>定休日</strong><br />
                  <span className={`${styles.addressIndent} ${styles.closedDay}`}>毎週火曜日</span>
                </p>
                <p className={styles.addressBlock}>
                  <strong className={styles.addressLabel}>最寄り</strong><br />
                  <span className={styles.addressIndent}>日比谷線入谷駅3番出口より徒歩約<strong className={styles.accessNum}>８</strong>分</span><br />
                  <span className={styles.addressIndent}>銀座線田原町駅から徒歩約<strong className={styles.accessNum}>２０</strong>分 浅草駅（つくばＥＸＰ）</span>
                </p>
              </div>
              <div className={styles.paymentSection}>
                <h4 className={styles.paymentTitle}>決済方法</h4>
                <div className={styles.paymentText}>
                  <p>現金</p>
                  <p>クレジット (VISA、Master、JCB)</p>
                  <p>その他(交通系, PayPay、ID、WAON、nanaco)</p>
                </div>
                <p className={styles.paymentNote}>※「PiTaPa」はご利用いただけません</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
