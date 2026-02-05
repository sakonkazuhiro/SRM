/**
 * メニューページ用：データ駆動（配列 + map）の型とサンプルデータ
 * 画像は public/images/menu 配下を使用。
 * フォルダ構成: main / side / lunch / drink / alcohol。各メニューに imagePath を指定。
 * 税込 = Math.round(税抜 * 1.1)
 */

const TAX_RATE = 1.1

export function priceIncl(priceExcl: number): number {
  return Math.round(priceExcl * TAX_RATE)
}

/** 同一商品の派生（100g/200g/300g など）。imagePath があれば variant ごとの画像を優先 */
export type Variant = {
  label: string
  priceExcl: number
  /** variant ごとの画像（未指定時は親の imagePath を使用） */
  imagePath?: string
}

export type MenuItemBase = {
  /** 表示名（ベース。variants のときは「国産和牛ミスジステーキ」など） */
  name: string
  /** 英語名（説明1行目に使う） */
  nameEn?: string
  /** 説明文（改行 \n 可） */
  description?: string
  /** 画像パス（/images/menu/main|side|lunch|drink|alcohol/xxx.jpg） */
  imagePath?: string
  /** ソースなど選択肢（表示用） */
  options?: string[]
  /** ※用の注釈 */
  notes?: string[]
}

/** 単品（バリエーションなし） */
export type MenuItemSingle = MenuItemBase & {
  priceExcl: number
  variants?: never
}

/** バリエーションあり（100g/200g/300g） */
export type MenuItemWithVariants = MenuItemBase & {
  variants: Variant[]
  priceExcl?: never
}

export type MenuItem = MenuItemSingle | MenuItemWithVariants

/** セクション直下の注意書き */
export type SectionNotes =
  | { type: 'leftRight'; left?: string; right?: string }
  | { type: 'block'; lines: string[] }

/** 1つのセクション（見出し + 注意書き + メニュー配列） */
export type MenuSection = {
  sectionTitle: string
  sectionNotes?: SectionNotes
  items: MenuItem[]
}

/** 1枚のカード用に展開したアイテム（map で量産する単位） */
export type DisplayItem = {
  name: string
  nameEn?: string
  description?: string
  imagePath?: string
  options?: string[]
  notes?: string[]
  /** 説明文に渡すスタイル（余白など現状維持用） */
  descriptionStyle?: { marginTop?: string }
  /** 通常は税抜・税込。ボトルワインなどは priceTiers を使用 */
  priceExcl?: number
  priceIncl?: number
  priceTiers?: { excl: number; incl: number }[]
  /** 数値でない価格表示（※価格はスタッフまで など） */
  priceNote?: string
}

/** MenuSection をカード用 DisplayItem[] に展開（variants も map で量産） */
export function sectionToDisplayItems(section: MenuSection): DisplayItem[] {
  const result: DisplayItem[] = []
  for (const item of section.items) {
    if ('variants' in item && item.variants?.length) {
      for (const v of item.variants) {
        const opts = item.options?.length ? item.options.join('／') : ''
        const desc = item.nameEn
          ? `${item.nameEn} ${v.label}${opts ? `\n${opts}` : ''}`
          : item.description ?? opts
        result.push({
          name: `${item.name} ${v.label}`,
          nameEn: item.nameEn,
          description: desc,
          imagePath: v.imagePath ?? item.imagePath,
          options: item.options,
          notes: item.notes,
          priceExcl: v.priceExcl,
          priceIncl: priceIncl(v.priceExcl),
        })
      }
    } else {
      const single = item as MenuItemSingle
      result.push({
        name: single.name,
        nameEn: single.nameEn,
        description: single.description,
        imagePath: single.imagePath,
        options: single.options,
        notes: single.notes,
        priceExcl: single.priceExcl,
        priceIncl: priceIncl(single.priceExcl),
      })
    }
  }
  return result
}

/** サンプル：国産和牛ミスジステーキ（100g/200g/300g/450g）。同じ形式で他メニューを追加可能 */
export const menuSectionsSample: MenuSection[] = [
  {
    sectionTitle: '国産和牛ミスジステーキ',
    sectionNotes: {
      type: 'block',
      lines: [
        '※ソースは各種類から選べます。',
        '※メニューの写真や動画はイメージ図となります。',
        '※ステーキの画像は200gを使用しております。',
      ],
    },
    items: [
      {
        name: '国産和牛ミスジステーキ',
        nameEn: 'Japanese Beef Misuji Steak',
        imagePath: '/images/menu/main/26-01-30_188_2%20(1).jpg',
        options: ['ガーリック', '甘辛鉄板', '赤ワイン', '刻みわさび醤油', 'ゆずこしょう'],
        variants: [
          { label: '100g', priceExcl: 1200 },
          { label: '200g', priceExcl: 2400 },
          { label: '300g', priceExcl: 3600 },
          { label: '450g', priceExcl: 5400 },
        ],
      },
    ],
  },
]

/** main / side / drink / dessert の各セクション（画像は public/images/menu/main|side|lunch|drink|alcohol から指定） */
export const mainMenuSections: MenuSection[] = [
  {
    sectionTitle: 'メイン',
    items: [],
  },
  {
    sectionTitle: 'サイド',
    items: [
      {
        name: 'フレンチポテトフライ',
        nameEn: 'French Fries',
        description: 'French Fries\nソース：ケチャップ／マヨ／明太マヨ／アンチョビマヨ',
        imagePath: '/images/menu/side/26-01-29_069_2.jpg',
        priceExcl: 500,
      },
    ],
  },
  {
    sectionTitle: 'ドリンク',
    items: [
      {
        name: 'コカ・コーラ',
        nameEn: 'Coca-Cola',
        description: 'Coca-Cola (Iced)',
        imagePath: '/images/menu/drink/26-01-29_071_2.jpg',
        priceExcl: 300,
      },
    ],
  },
  {
    sectionTitle: 'デザート',
    items: [],
  },
]

/** ページ下部の注意書き（データで管理） */
export const footerNotes: string[] = [
  '※当店の牛・豚・米は１００％国産になります。',
  '※価格は税抜き価格と税込み価格を併記しています。',
  '※メニューは季節により変更になる場合がございます。',
  '※アレルギーに関するお問い合わせは、お気軽にスタッフまでお尋ねください。',
]
