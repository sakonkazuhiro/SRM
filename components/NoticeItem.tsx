'use client'

import { Fragment } from 'react'
import type { NoticeItem as NoticeItemType } from '@/data/notices'
import AboutImageSlider from '@/components/AboutImageSlider'
import { ClickableImage, ClickableVideo } from '@/components/ImageLightbox'
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

/** 「■休業日」直下の・行を赤字用に分割（ゴールデンウィーク案内など） */
function splitContentWithGwRestDays(content: string): { before: string; restLines: string[]; after: string } | null {
  /** 最後の・行のあとは「改行＋（空行可）＋次の■見出し」— \n\n■ ではなく \n■ になるため \n+■ で受ける */
  const m = content.match(/^([\s\S]*?\n\n■休業日\n)((?:・[^\n]+\n)+)(\n+■[\s\S]*)$/)
  if (!m) return null
  const restLines = m[2]
    .trimEnd()
    .split('\n')
    .filter((line) => line.length > 0)
  if (restLines.length === 0) return null
  return { before: m[1], restLines, after: m[3] }
}

const SILVER_WEEK_SCHEDULE_LINE = /^\d+月\d+日（[^）]+）/

/** シルバーウィーク営業案内（日程表の「臨時営業」「定休日」「振替休日」のみ赤字） */
function splitContentWithSilverWeek(content: string): {
  introLines: string[]
  scheduleLines: string[]
  footerParagraphs: string[]
} | null {
  if (!content.includes('シルバーウィーク')) return null
  const lines = content.split('\n')
  const scheduleStart = lines.findIndex((line) => SILVER_WEEK_SCHEDULE_LINE.test(line))
  if (scheduleStart < 0) return null

  const introLines = lines.slice(0, scheduleStart).filter((line) => line.trim() !== '')
  const scheduleLines: string[] = []
  let i = scheduleStart
  while (i < lines.length && SILVER_WEEK_SCHEDULE_LINE.test(lines[i])) {
    scheduleLines.push(lines[i])
    i++
  }
  if (scheduleLines.length === 0) return null

  const footerParagraphs = lines
    .slice(i)
    .join('\n')
    .trim()
    .split(/\n\n+/)
    .filter((paragraph) => paragraph.trim())

  return { introLines, scheduleLines, footerParagraphs }
}

const SILVER_WEEK_RED_TERMS = ['臨時営業', '定休日', '振替休日'] as const

function renderSilverWeekTextWithHighlights(text: string, applyPeriodBreak = true) {
  const content = applyPeriodBreak ? breakAfterPeriod(text) : text
  const parts = content.split(/(臨時営業|定休日|振替休日)/)
  return parts.map((part, i) =>
    SILVER_WEEK_RED_TERMS.includes(part as (typeof SILVER_WEEK_RED_TERMS)[number]) ? (
      <span key={i} className={styles.restDayLine}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

function renderSilverWeekScheduleLine(line: string) {
  return renderSilverWeekTextWithHighlights(line, false)
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
          {notice.subtitle && <p className={styles.noticeSubtitle}>{notice.subtitle}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.noticeItem}>
      {!notice.hideImage && (
        <div className={styles.noticeImage}>
          {notice.video ? (
            <ClickableVideo
              className={styles.noticeVideo}
              src={notice.video}
              controls
              playsInline
              preload="metadata"
              aria-label={notice.videoAlt ?? ''}
            />
          ) : notice.image ? (
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
              <strong className={styles.hoursNum}>11:30～15:00</strong>（L.O.<strong className={styles.hoursNum}>14:30</strong>）（TAKEOUT L.O.<strong className={styles.hoursNum}>14:00</strong>）
            </span><br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>ディナー</span><span className={styles.hoursColon}>：</span>
              <strong className={styles.hoursNum}>17:30～23:00</strong>（L.O.<strong className={styles.hoursNum}>22:00</strong>）（TAKEOUT L.O.<strong className={styles.hoursNum}>21:30</strong>）
            </span><br />
            <span className={styles.hoursLine}>
              <span className={styles.hoursLabel}>定休日</span><span className={styles.hoursColon}>：</span>
              <span className={styles.closedDay}>毎週火曜日</span>
            </span>
          </p>
        ) : notice.type === 'text' && notice.content ? (
          (() => {
            const parsedHours = splitContentWithHours(notice.content)
            if (parsedHours) {
              return (
                <p className="breakAfterPeriod">
                  {breakAfterPeriod(parsedHours.before)}
                  <br /><br />
                  営業時間<br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ランチ</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>{parsedHours.lunch}</strong>
                  </span><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>ディナー</span><span className={styles.hoursColon}>：</span>
                    <strong className={styles.hoursNum}>{parsedHours.dinner}</strong>
                  </span><br />
                  <span className={styles.hoursLine}>
                    <span className={styles.hoursLabel}>定休日</span><span className={styles.hoursColon}>：</span>
                    <span className={styles.closedDay}>{parsedHours.closed}</span>
                  </span>
                  <br /><br />
                  {breakAfterPeriod(parsedHours.after)}
                </p>
              )
            }
            const parsedGw = splitContentWithGwRestDays(notice.content)
            if (parsedGw) {
              return (
                <p className="breakAfterPeriod">
                  {breakAfterPeriod(parsedGw.before)}
                  {parsedGw.restLines.map((line, i) => (
                    <Fragment key={i}>
                      <span className={styles.restDayLine}>{line}</span>
                      {i < parsedGw.restLines.length - 1 ? <br /> : null}
                    </Fragment>
                  ))}
                  <br />
                  <br />
                  {breakAfterPeriod(parsedGw.after.replace(/^\n+/, ''))}
                </p>
              )
            }
            const parsedSw = splitContentWithSilverWeek(notice.content)
            if (parsedSw) {
              return (
                <p className="breakAfterPeriod">
                  {breakAfterPeriod(parsedSw.introLines.join('\n'))}
                  <br />
                  <br />
                  {parsedSw.scheduleLines.map((line, i) => (
                    <Fragment key={`schedule-${i}`}>
                      {renderSilverWeekScheduleLine(line)}
                      <br />
                    </Fragment>
                  ))}
                  <br />
                  {parsedSw.footerParagraphs.map((paragraph, i) => (
                    <Fragment key={`footer-${i}`}>
                      {renderSilverWeekTextWithHighlights(paragraph)}
                      {i < parsedSw.footerParagraphs.length - 1 ? (
                        <>
                          <br />
                          <br />
                        </>
                      ) : null}
                    </Fragment>
                  ))}
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
