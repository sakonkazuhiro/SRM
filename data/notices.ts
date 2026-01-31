export type NoticeType = 'text' | 'hours'

export type NoticeItem = {
  date: string
  image?: string
  imageAlt?: string
  type: NoticeType
  /** type が 'text' のときの本文 */
  content?: string
}

/** お知らせ一覧（ホーム・お知らせページで共通利用） */
export const notices: NoticeItem[] = [
  {
    date: '2026.2.5',
    image: '/images/C5B50238-CBBF-4624-AEE2-FB184924250C.png',
    imageAlt: 'グランドオープン',
    type: 'text',
    content: 'グランドオープン開店記念！2月5日・6日はファーストドリンク100円セール',
  },
  {
    date: '2026.1.29',
    image: '/images/LINE_20260130_211643.png',
    imageAlt: '営業時間',
    type: 'hours',
  },
  {
    date: '2026.1.26',
    image: '/images/LINE_20260130_211622.png',
    imageAlt: '定休日',
    type: 'text',
    content: '定休日のお知らせ：毎週火曜日がお休みです。',
  },
]
