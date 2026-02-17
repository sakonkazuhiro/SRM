'use client'

import type { NoticeItem as NoticeItemType } from '@/data/notices'
import AboutImageSlider from '@/components/AboutImageSlider'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'
import styles from './NoticeItem.module.css'

type NoticeItemProps = {
  notice: NoticeItemType
}

/** 本文から「営業時間」ブロックを検出して分割（before / 営業時間3行 / after） */
function splitContentWithHours(content: string): { before: string; lunch: string; dinner: string; closed: string; after: string } | null {
  const match = content.match(
    /^([\s\S]*?)\n営業時間\nランチ\s*：(.+)\nディナー\s*：(.+)\n定休日：(.+)(\n[\s\S]*)$/
  )
  if (!match) return null
  return { before: match[1], lunch: match[2], dinner: match[3], closed: match[4], after: match[5] }
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
      {!notice.hideImage && (
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
      )}
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
              <strong className={styles.hoursNum}>17:30～23:00</strong>（L.O.<strong className={styles.hoursNum}>22:00</strong>）
            </span><br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>定休日</span><span className={styles.hoursColon}>：</span>
              <span className={styles.closedDay}>毎週火曜日</span>
            </span>
          </p>
        ) : notice.type === 'text' && notice.content ? (
          (() => {
            const parsed = splitContentWithHours(notice.content)
            if (parsed) {
              return (
                <p className="breakAfterPeriod">
                  {breakAfterPeriod(parsed.before)}
                  <br /><br />
                  営業時間<br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ランチ</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>{parsed.lunch}</strong>
                  </span><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ディナー</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>{parsed.dinner}</strong>
                  </span><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>定休日</span><span className={styles.hoursColon}>：</span>
                    <span className={styles.closedDay}>{parsed.closed}</span>
                  </span>
                  <br /><br />
                  {breakAfterPeriod(parsed.after)}
                </p>
              )
            }
            return <p className="breakAfterPeriod">{breakAfterPeriod(notice.content)}</p>
          })()
        ) : null}
      </div>
    </div>
  )
}
