'use client'

import type { NoticeItem as NoticeItemType } from '@/data/notices'
import AboutImageSlider from '@/components/AboutImageSlider'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'
import styles from './NoticeItem.module.css'

type NoticeItemProps = {
  notice: NoticeItemType
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  if (notice.type === 'imageSlider' && notice.images?.length) {
    const slides = notice.images.map((src) => ({ src, alt: notice.title ?? '' }))
    return (
      <div className={styles.noticeItem}>
        <div className={styles.noticeImageSliderWrap}>
          <AboutImageSlider slides={slides} />
        </div>
        <div className={styles.noticeContent}>
          <span className={styles.date}>{notice.date}</span>
          {notice.title && <p className={styles.noticeTitle}>{notice.title}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.noticeItem}>
      <div className={styles.noticeImage}>
        {notice.image ? (
          <ClickableImage
            src={notice.image}
            alt={notice.imageAlt ?? ''}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span style={{ color: '#999', fontSize: '0.9rem' }}>画像なし</span>
        )}
      </div>
      <div className={styles.noticeContent}>
        <span className={styles.date}>{notice.date}</span>
        {notice.type === 'hours' ? (
          <p>
            営業時間<br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>ランチ</span><span className={styles.hoursColon}>：</span>
              <strong className={styles.hoursNum}>11:30～15:00</strong>（L.O.<strong className={styles.hoursNum}>14:30</strong>）
            </span><br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>ディナー</span><span className={styles.hoursColon}>：</span>
              <strong className={styles.hoursNum}>17:00～24:00</strong>（L.O.<strong className={styles.hoursNum}>23:00</strong>）
            </span><br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>定休日</span><span className={styles.hoursColon}>：</span>
              毎週火曜日
            </span>
          </p>
        ) : notice.type === 'text' && notice.content ? (
          <p className="breakAfterPeriod">{breakAfterPeriod(notice.content)}</p>
        ) : null}
      </div>
    </div>
  )
}
