import styles from './page.module.css'
import { notices } from '@/data/notices'
import NoticeItem from '@/components/NoticeItem'

export default function Notice() {
  return (
    <div className={styles.noticePage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>お知らせ</h1>
        </div>
      </section>

      <section className={styles.noticeSection}>
        <div className="container">
          <div className={styles.noticeList}>
            {notices.map((notice) => (
              <NoticeItem key={notice.date} notice={notice} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
