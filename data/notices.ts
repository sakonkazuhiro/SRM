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

/** お知らせ一覧（ホーム・お知らせページで共通利用）
 * 画像付きはサムネが 150×150px で表示。追加時は正方形に近い素材（例 300×300px 以上）を推奨。 */
export const notices: NoticeItem[] = [
  {
    date: '2026.4.15',
    image: '/images/news/B471B5D4-92B3-49D0-B197-6667D43DA673.png',
    imageAlt: 'ゴールデンウィーク期間の営業について',
    type: 'text',
    content:
      '【ゴールデンウィーク期間の営業について】\n\n平素よりホシのキッチンをご利用いただき、誠にありがとうございます。\n\nゴールデンウィーク期間中の営業日程につきまして、下記の通りご案内申し上げます。\n\n■休業日\n・4月27日（月）臨時休業\n・4月28日（火）定休日\n・5月7日（木）臨時休業\n\n■通常営業\n・4月29日（水）〜5月6日（水）\n\n■通常営業再開\n・5月8日（金）より通常営業に戻ります\n\n期間中は混雑が予想されるため、\nお時間に余裕をもってご来店いただけますと幸いです。\n\nお客様にはご不便をおかけいたしますが、\n何卒ご理解のほどよろしくお願い申し上げます。',
  },
  {
    date: '2026.4.5',
    image: '/images/news/100.png',
    imageAlt: '当店自慢のハンバーグ 牛100%手ごね',
    type: 'text',
    content:
      '当店自慢のハンバーグは牛100%手ごねです。\nミディアムレアに仕上げ、アツアツの鉄板で提供しております。\n気になるようでしたら、店員に再加熱をお気軽にお声がけください。',
  },
  {
    date: '2026.4.4',
    image: '/images/news/9C97E975-DC18-48E8-A832-112F4A3031F5.jpeg',
    imageAlt: 'オーナーシェフ 星翔 誕生日のご挨拶',
    type: 'text',
    content:
      '本日は私事ではございますが、\nホシのキッチン オーナーシェフ 星翔の誕生日月となります。\n\n本日で37歳を迎え、\nより一層、皆様に喜んでいただけるお店を目指してまいります。\n\nあいにくの雨ではございますが、\n本日も笑顔で当店自慢のハンバーグをはじめ、心を込めてご提供いたします。\n\nお近くにお越しの際は、ぜひお立ち寄りください。',
  },
  {
    date: '2026.3.24',
    image: '/images/news/983DDD60-7141-4836-8C93-D46F2651CD5E.png',
    imageAlt: '今月のおすすめランチ ペラペラネギ塩牛タン',
    type: 'text',
    content:
      '3月24日より、数量限定でおすすめランチを開始いたしました。\n\n【今月のおすすめランチ】\nランチ限定メニューがスタートしました。\n\nペラペラネギ塩牛タン（150g） 税込1,200円\n\nネギと塩ダレで仕上げた、さっぱり食べられる牛タンです。\n\n※ライスは付いておりません。ランチセットと一緒にどうぞ。\n\n数量限定のため、売り切れ次第終了となります。',
  },
  {
    date: '2026.3.4',
    type: 'imageSlider',
    title: 'テイクアウトを開始しました。',
    subtitle:
      'ご自宅でもホシのキッチンのハンバーグなど、洋食メニューをお楽しみいただけます。\n\nなお、店内の混雑状況により、テイクアウトのお渡しまでお時間をいただく場合がございます。\nあらかじめご了承いただけますと幸いです。',
    images: [
      '/images/news/teiku.6.jpg',
      '/images/news/teiku.1.png',
      '/images/news/teiku.2.jpg',
      '/images/news/teiku.3.jpg',
      '/images/news/teiku.4.jpg',
      '/images/news/teiku.5.jpg',
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
