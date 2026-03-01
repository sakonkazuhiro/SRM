export type NoticeType = 'text' | 'hours' | 'imageSlider'

export type NoticeItem = {
  date: string
  image?: string
  imageAlt?: string
  type: NoticeType
  /** 画像エリアを非表示にしたい場合 */
  hideImage?: boolean
  /** type が 'text' のときの本文 */
  content?: string
  /** type が 'imageSlider' のときのタイトル */
  title?: string
  /** type が 'imageSlider' のときのタイトル下の補足文 */
  subtitle?: string
  /** type が 'imageSlider' のときの画像URL配列（表示順） */
  images?: string[]
}

/** お知らせ一覧（ホーム・お知らせページで共通利用） */
export const notices: NoticeItem[] = [
  {
    date: '2026.3.1',
    type: 'imageSlider',
    title: 'テイクアウトメニュー',
    subtitle: 'メニューはこちらを検討しております',
    images: [
      '/images/news/teiku.1.png',
      '/images/news/teiku.2.jpg',
      '/images/news/teiku.3.jpg',
      '/images/news/teiku.4.jpg',
    ],
  },
  {
    date: '2026.2.25',
    type: 'text',
    hideImage: true,
    content:
      '3月中の開始を目標に、テイクアウトの導入を検討しております。\n\n開始後は、ランチタイム・ディナータイムの混雑状況によって、\nお渡しまでお時間を頂戴する場合や、\nやむを得ず受付を一時停止させていただくことがございます。\n\n何卒ご理解のほど、よろしくお願い申し上げます。',
  },
  {
    date: '2026.2.18',
    type: 'imageSlider',
    title: 'メニュー・価格改定後の新メニュー表',
    images: [
      '/images/news/messageImage_1771341456972.jpg',
      '/images/news/messageImage_1771341459011.jpg',
      '/images/news/messageImage_1771341493933.jpg',
      '/images/news/messageImage_1771341506476.jpg',
      '/images/news/messageImage_1771341515753.jpg',
      '/images/news/messageImage_1771341527147.jpg',
      '/images/news/messageImage_1771341536355.jpg',
      '/images/news/messageImage_1771341546888.jpg',
      '/images/news/messageImage_1771341555733.jpg',
      '/images/news/messageImage_1771341563697.jpg',
    ],
  },
  {
    date: '2026.2.18',
    type: 'text',
    hideImage: true,
    content:
      'いつもホシのキッチンをご利用いただきありがとうございます。\n誠に心苦しいお知らせではございますが、\n2026年2月18日（水）より\n一部メニューの価格を改定させていただきます。\nあわせて、\nより良い料理をご提供するため、メニュー数を一部見直し・絞らせていただきます。\n原材料費の高騰が続く中でも、品質や味を落とすことなく、こだわりの食材を使用した料理を今後も心を込めてご提供してまいります。\nご理解いただけますと幸いです。\n今後ともよろしくお願いいたします。',
  },
  {
    date: '2026.2.16',
    image: '/images/news/4C17576E-CF3D-4CDA-8322-2FEC36CC7FF8.png',
    imageAlt: '営業時間変更のお知らせ',
    type: 'text',
    content: 'いつもご来店ありがとうございます。\n2月18日（水）より営業時間を変更いたします。\n\n営業時間\nランチ   ：11:30～15:00（L.O.14:30）\nディナー ：17:30～23:00（L.O.22:00）\n定休日：毎週火曜日\n\nあわせてメニュー内容も一部変更しておりますので、\nご来店の際はぜひご確認ください。\n\n今後ともホシのキッチンをよろしくお願いいたします。',
  },
  {
    date: '2026.2.13',
    type: 'imageSlider',
    title: 'お店のQRコードの商品画像が追加されました。',
    images: [
      '/images/news/S__21209175.jpg',
      '/images/news/S__21209173.jpg',
      '/images/news/S__21209172.jpg',
    ],
  },
  {
    date: '2026.2.5',
    image: '/images/news/C5B50238-CBBF-4624-AEE2-FB184924250C.png',
    imageAlt: 'グランドオープン',
    type: 'text',
    content: 'グランドオープン開店記念！2月5日・6日はファーストドリンク100円セール',
  },
  {
    date: '2026.1.29',
    image: '/images/news/LINE_20260130_211643.png',
    imageAlt: '営業時間',
    type: 'hours',
  },
  {
    date: '2026.1.26',
    image: '/images/news/LINE_20260130_211622.png',
    imageAlt: '定休日',
    type: 'text',
    content: '定休日のお知らせ：毎週火曜日がお休みです。',
  },
]
