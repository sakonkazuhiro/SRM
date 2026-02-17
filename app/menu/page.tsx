'use client'

import { useMemo, useState } from 'react'
import styles from './page.module.css'
import {
  menuSectionsSample,
  sectionToDisplayItems,
  footerNotes,
  HAMBURGER_SAUCE_IMAGES,
  MINI_PARFAIT_IMAGES,
  RED_WINE_BOTTLE_IMAGES,
  WHITE_WINE_BOTTLE_IMAGES,
  type DisplayItem,
  type SectionNotes,
} from './menuData'
import AboutImageSlider from '@/components/AboutImageSlider'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'

/** 画像枠：/images/menu 配下を使用。存在しない or 読み込み失敗時はプレースホルダー。クリックで全画面表示 */
function MenuCardImage({ imagePath, alt }: { imagePath?: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  const usePlaceholder = !imagePath || failed
  if (usePlaceholder) {
    return <p>メニュー</p>
  }
  return (
    <ClickableImage
      src={imagePath}
      alt={alt}
      className={styles.menuCardImage}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

/** 旧形式（既存メニュー用） */
type LegacyMenuItem = {
  name: string
  price: string
  description?: string
  image?: string
  imagePath?: string
  videoSrc?: string
  priceTiers?: { excl: number; incl: number }[]
}

type MenuCategory = {
  category: string
  items: LegacyMenuItem[]
}

type TabKey = 'main' | 'ichipin' | 'lunch' | 'dessertDrink' | 'drink'

/** 描画用セクション（見出し・注意書き・カード配列） */
type RenderSection = {
  sectionTitle: string
  sectionNotes?: SectionNotes
  displayItems: DisplayItem[]
}

/** スマホで1画像+4g+税抜税込にまとめるステーキセクション（PCは4カードのまま） */
const STEAK_SECTION_TITLES = ['国産黒毛和牛A5ランク ミスジステーキ', '国産黒毛和牛A5ランク ランプステーキ', '国産黒毛和牛A5ランク サーロインステーキ'] as const
function isSteakSection(section: RenderSection): boolean {
  return STEAK_SECTION_TITLES.includes(section.sectionTitle as (typeof STEAK_SECTION_TITLES)[number]) && section.displayItems.length === 4
}
function extractWeight(name: string): string {
  const m = name.match(/\d+g$/)
  return m ? m[0] : name.split(/\s/).pop() ?? ''
}

/** 旧カテゴリを RenderSection に変換（価格は税込から税抜を逆算、税率10%） */
function oldCategoryToRenderSection(cat: MenuCategory): RenderSection {
  const hasSauceItems = cat.items.some((item) => item.description?.includes('／'))
  let sectionNotes: SectionNotes | undefined
  if (hasSauceItems) {
    if (
      cat.category === '国産黒毛和牛A5ランク サーロインステーキ' ||
      cat.category === '国産黒毛和牛A5ランク ミスジステーキ' ||
      cat.category === '国産黒毛和牛A5ランク ランプステーキ'
    ) {
      sectionNotes = {
        type: 'block',
        lines: [
          '※ソースは各種類から選べます。',
          '※メニューの写真や動画はイメージ図となります。',
          '※ステーキの画像は200gを使用しております。',
        ],
      }
    } else if (cat.category === 'メイン') {
      sectionNotes = { type: 'leftRight', right: '※ソースは各種類から選べます。※メニューの写真や動画はイメージ図となります。' }
    } else {
      sectionNotes = {
        type: 'leftRight',
        left: '※ソースは各種類から選べます。',
        right: '※メニューの写真や動画はイメージ図となります。',
      }
    }
  } else {
    sectionNotes = { type: 'leftRight', right: '※メニューの写真や動画はイメージ図となります。' }
  }
  const displayItems: DisplayItem[] = cat.items.map((item) => {
    const descriptionStyle =
      cat.category === 'メイン' && (item.name.includes('チキンソテー') || item.name.includes('ポークソテー') || item.name.includes('カモソテー'))
        ? { marginTop: '3rem' as const }
        : cat.category === 'メイン' && item.name.includes('当店自慢の自家製ハンバーグ')
          ? { marginTop: '1rem' as const }
          : undefined
    if (item.priceTiers?.length) {
      return {
        name: item.name,
        description: item.description,
        imagePath: item.imagePath,
        descriptionStyle,
        priceTiers: item.priceTiers,
      }
    }
    const priceMatch = item.price.match(/[\d,]+/)
    if (!priceMatch) {
      return {
        name: item.name,
        description: item.description,
        imagePath: item.imagePath,
        descriptionStyle,
        priceNote: item.price,
      }
    }
    const priceIncl = parseInt(priceMatch[0].replace(/,/g, ''), 10)
    const priceExcl = Math.round(priceIncl / 1.1)
    return {
      name: item.name,
      description: item.description,
      imagePath: item.imagePath,
      descriptionStyle,
      priceExcl,
      priceIncl,
    }
  })
  return { sectionTitle: cat.category, sectionNotes, displayItems }
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<TabKey>('main')

  // メニュー名を適切に改行して表示する関数
  const formatMenuName = (name: string) => {
    // 国産黒毛和牛A5ランク サーロインステーキのパターン
    if (name.includes('国産黒毛和牛A5ランク サーロインステーキ')) {
      const match = name.match(/^国産黒毛和牛A5ランク サーロインステーキ (.+)$/)
      if (match) {
        return (
          <>
            国産黒毛和牛A5ランク
            <br />
            <b style={{ display: 'block', textAlign: 'center' }}>サーロインステーキ　{match[1]}</b>
          </>
        )
      }
    }
    // 当店自慢の自家製ハンバーグのパターン
    if (name.includes('当店自慢の自家製ハンバーグ')) {
      const match = name.match(/^当店自慢の自家製ハンバーグ (.+)$/)
      if (match) {
        return (
          <>
            当店自慢の自家製ハンバーグ
            <br />
            <b style={{ display: 'block', textAlign: 'center' }}>{match[1]}</b>
          </>
        )
      }
    }
    // フレンチポテトフライ（ソース：...）のパターン
    if (name.includes('（ソース：')) {
      const match = name.match(/^(.+?)（ソース：(.+?)）$/)
      if (match) {
        return (
          <>
            {match[1]}
            <br />
            <span style={{ display: 'block', textAlign: 'center' }}>（{match[2]}）</span>
          </>
        )
      }
    }
    // 昔ながらのアジフライ（1枚・...）のパターン
    if (name.includes('昔ながらのアジフライ（1枚・')) {
      const match = name.match(/^昔ながらのアジフライ（1枚・(.+?)）$/)
      if (match) {
        return (
          <>
            <b style={{ display: 'block', textAlign: 'center' }}>昔ながらのアジフライ　1枚</b>
            <span style={{ display: 'block', textAlign: 'center' }}>（{match[1]}）</span>
          </>
        )
      }
    }
    // 手作りメンチカツ（1個・...）のパターン
    if (name.includes('手作りメンチカツ（1個・')) {
      const match = name.match(/^手作りメンチカツ（1個・(.+?)）$/)
      if (match) {
        return (
          <>
            <b style={{ display: 'block', textAlign: 'center' }}>手作りメンチカツ　1個</b>
            <span style={{ display: 'block', textAlign: 'center' }}>（{match[1]}）</span>
          </>
        )
      }
    }
    // とろ〜りクリーミーなカニコロッケ（1個・キャベツ）のパターン
    if (name.includes('とろ〜りクリーミーなカニコロッケ（1個・キャベツ）')) {
      return (
        <>
          とろ〜りクリーミーな
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>カニコロッケ　1個</b>
          <span style={{ display: 'block', textAlign: 'center', marginTop: '0.5rem' }}>（キャベツ付き）</span>
        </>
      )
    }
    // 国産黒毛和牛A5ランク ミスジ・ランプステーキのパターン（小画面でも切れないよう折り返し可）
    if (name.includes('国産黒毛和牛A5ランク ミスジステーキ') || name.includes('国産黒毛和牛A5ランク ランプステーキ')) {
      return <b style={{ overflowWrap: 'break-word', wordBreak: 'keep-all' }}>{name}</b>
    }
    // 味噌汁のパターン（中央揃え、太文字）
    if (name === '味噌汁') {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // 味噌汁＋ミニサラダのパターン（中央揃え、太文字）
    if (name === '味噌汁＋ミニサラダ') {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // ライス（小／中／大）＋味噌汁のパターン
    if (name.includes('ライス（小／中／大）＋味噌汁') && !name.includes('ミニサラダ')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋</b>
          <b style={{ display: 'block', textAlign: 'center' }}>味噌汁</b>
        </>
      )
    }
    // ライス（小／中／大）＋味噌汁＋ミニサラダのパターン
    if (name.includes('ライス（小／中／大）＋味噌汁＋ミニサラダ')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋</b>
          <b style={{ display: 'block', textAlign: 'center', marginTop: '-0.5rem' }}>味噌汁＋ミニサラダ</b>
        </>
      )
    }
    // やみつきビアフライドポテト（ケチャップ付き）のパターン
    if (name.includes('やみつきビアフライドポテト（ケチャップ付き）')) {
      return (
        <>
          やみつきビアフライドポテト
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>（ケチャップ付き）</b>
        </>
      )
    }
    // イカカラ（マヨ・レモン付き）のパターン（1行で表示）
    if (name.includes('イカカラ（マヨ・レモン付き）')) {
      return <b style={{ whiteSpace: 'nowrap' }}>{name}</b>
    }
    // チェダーチーズのスティックフライのパターン
    if (name.includes('チェダーチーズのスティックフライ')) {
      return (
        <>
          チェダーチーズの
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>スティックフライ</b>
        </>
      )
    }
    // アボカド＆クリームチーズのスティックフライのパターン
    if (name.includes('アボカド＆クリームチーズのスティックフライ')) {
      return (
        <>
          アボカド＆クリームチーズ
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>のスティックフライ</b>
        </>
      )
    }
    // エビのアヒージョ（バケット4枚）のパターン（1行で表示）
    if (name.includes('エビのアヒージョ（バケット4枚）')) {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // チョリソー3本 粒マスタード添えのパターン（2行目を右寄せ・太文字）
    if (name.includes('チョリソー3本 粒マスタード添え')) {
      return (
        <>
          チョリソー3本
          <br />
          <strong style={{ display: 'block', textAlign: 'center' }}>（粒マスタード添え）</strong>
        </>
      )
    }
    // 本日のメリメロカルパッチョ (3種)のパターン（2行目を右寄せ）
    if (name.includes('本日のメリメロカルパッチョ (3種)')) {
      return (
        <>
          本日のメリメロカルパッチョ
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>(3種)</b>
        </>
      )
    }
    // メニューを中央揃えに
    if (name === '茄子のニンニクソース' || 
        name === 'ナスとトマトのチーズ焼き' || 
        name === '一口ミニステーキ' || 
        name === '鳥ささみのチーズピンク揚げ' ||
        name === '赤いタルタルのチキン南蛮' ||
        name === '大エビフライ (3本)' ||
        name === '昔ながらのナポリタン' ||
        name === '濃厚カルボナーラ' ||
        name === 'たこわさのポテトサラダ' ||
        name === '半熟卵のポテトサラダ' ||
        name === '温玉のせシーザーサラダ' ||
        name === 'ライス 小 180g' ||
        name === 'ライス 中 220g' ||
        name === 'ライス 大 300g' ||
        name === 'バケット2個' ||
        name === 'おかわりバケット4個' ||
        name === 'バニラアイス' ||
        name === '季節のシャーベット') {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // 店長おすすめのコーヒーゼリー（2行・センター）
    if (name === '店長おすすめのコーヒーゼリー') {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>店長おすすめの</b>
          <b style={{ display: 'block', textAlign: 'center' }}>コーヒーゼリー</b>
        </>
      )
    }
    // カモソテーのパターン（中央揃え、太文字）
    if (name === 'カモソテー') {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // チキンソテーとポークソテーのパターン（中央揃え）
    if (name.includes('チキンソテー') || name.includes('ポークソテー')) {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // 海鮮アヒージョ (厚切りバケット4個)のパターン（1行目と2行目を中央揃え）
    if (name.includes('海鮮アヒージョ (厚切りバケット4個)')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>海鮮アヒージョ</b>
          <b style={{ display: 'block', textAlign: 'center' }}>(厚切りバケット4個)</b>
        </>
      )
    }
    // カマンベールとプチトマトのアヒージョ (厚切りバケット4個)のパターン
    if (name.includes('カマンベールとプチトマトのアヒージョ (厚切りバケット4個)')) {
      return (
        <>
          カマンベールとプチトマトの
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>アヒージョ</b>
          <b style={{ display: 'block', textAlign: 'center' }}>(厚切りバケット4個)</b>
        </>
      )
    }
    // 【期間限定】カキフライ (6個)のパターン（1行で表示）
    if (name.includes('【期間限定】カキフライ (6個)')) {
      return <b style={{ whiteSpace: 'nowrap' }}>{name}</b>
    }
    // バジル香るジェノベーゼパスタのパターン（1行で表示）
    if (name.includes('バジル香るジェノベーゼパスタ')) {
      return <b style={{ whiteSpace: 'nowrap' }}>{name}</b>
    }
    // サーモンとアボカドのポキサラダ（ポキドレッシング）のパターン（1行目1行で、2行目中央揃え）
    if (name.includes('サーモンとアボカドのポキサラダ（ポキドレッシング）')) {
      return (
        <>
          <b style={{ display: 'block', whiteSpace: 'nowrap', textAlign: 'center' }}>サーモンとアボカドのポキサラダ</b>
          <b style={{ display: 'block', textAlign: 'center' }}>（ポキドレッシング）</b>
        </>
      )
    }
    // ミニパフェ（コーンフレーク・バニラ・ホイップ・ストロベリーソース or チョコソース）のパターン
    if (name.includes('ミニパフェ（コーンフレーク・バニラ・ホイップ・ストロベリーソース or チョコソース）')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ミニパフェ</b>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'center' }}>
              <b style={{ display: 'block' }}>（コーンフレーク・バニラ・</b>
              <b style={{ display: 'block', whiteSpace: 'nowrap' }}>ホイップ・ストロベリーソース</b>
            </div>
          </div>
          <b style={{ display: 'block', textAlign: 'center' }}>or　チョコソース）</b>
        </>
      )
    }
    // 自家製すじカレー（センター揃え）
    if (name === '自家製すじカレー') {
      return <b style={{ display: 'block', textAlign: 'center' }}>自家製すじカレー</b>
    }
    // ベーコンと卵のクリームリゾットのパターン
    if (name === 'ベーコンと卵のクリームリゾット') {
      return (
        <>
          ベーコンと卵の
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>クリームリゾット</b>
        </>
      )
    }
    // ランチセット：頭の＋削除・センター揃え
    if (name === '＋味噌汁') return <b style={{ display: 'block', textAlign: 'center' }}>味噌汁</b>
    if (name === '＋味噌汁＋ミニサラダ') return <b style={{ display: 'block', textAlign: 'center' }}>味噌汁＋ミニサラダ</b>
    if (name === '＋ライス（小／中／大）＋味噌汁') return <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋味噌汁</b>
    if (name === '＋ライス（小／中／大）＋味噌汁＋ミニサラダ') return <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋味噌汁＋ミニサラダ</b>
    // パンセット：メニュー名＋2行目「パン２個＋味噌汁」
    if (name === 'パンセット') {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>パンセット</b>
          <span style={{ display: 'block', textAlign: 'center' }}>パン２個＋味噌汁</span>
        </>
      )
    }
    // パンサラダセット：メニュー名＋2行目「パン2個＋味噌汁＋ミニサラダ」
    if (name === 'パンサラダセット') {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>パンサラダセット</b>
          <span style={{ display: 'block', textAlign: 'center' }}>パン2個＋味噌汁＋ミニサラダ</span>
        </>
      )
    }
    // その他はそのまま
    return name
  }

  // ✅ タブごとのメニューデータ（国産和牛ミスジは menuData.menuSectionsSample で管理）
  const menusByTab: Record<TabKey, { label: string; categories: MenuCategory[] }> = useMemo(() => {
    const main: MenuCategory[] = [
      {
        category: '国産黒毛和牛A5ランク ランプステーキ',
        items: [
          {
            name: '国産黒毛和牛A5ランク ランプステーキ 100g',
            price: '1,760円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 100g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク ランプステーキ 200g',
            price: '3,520円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 200g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク ランプステーキ 300g',
            price: '5,280円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 300g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク ランプステーキ 450g',
            price: '7,920円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 450g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
      {
        category: '国産黒毛和牛A5ランク サーロインステーキ',
        items: [
          {
            name: '国産黒毛和牛A5ランク サーロインステーキ 100g',
            price: '1,980円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-31_115_2.jpg',
            description: 'Japanese Black Beef Sirloin Steak 100g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク サーロインステーキ 200g',
            price: '3,960円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-31_115_2.jpg',
            description: 'Japanese Black Beef Sirloin Steak 200g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク サーロインステーキ 300g',
            price: '5,940円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-31_115_2.jpg',
            description: 'Japanese Black Beef Sirloin Steak 300g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛A5ランク サーロインステーキ 450g',
            price: '8,910円',
            image: 'ステーキ',
            imagePath: '/images/menu/main/main/26-01-31_115_2.jpg',
            description: 'Japanese Black Beef Sirloin Steak 450g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
      {
        category: 'メイン',
        items: [
          {
            name: '当店自慢の自家製ハンバーグ 200g',
            price: '1,518円',
            image: 'メイン',
            imagePath: '/images/menu/main/main/26-02-02_050.jpg',
            description: 'House Hamburger 200g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢',
          },
          {
            name: 'チキンソテー 270g',
            price: '1,518円',
            image: 'メイン',
            imagePath: '/images/menu/main/main/26-01-29_097_2.jpg',
            description: 'Chicken Saute 270g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢／ジンジャー',
          },
          {
            name: 'ポークソテー 240g',
            price: '1,518円',
            image: 'メイン',
            imagePath: '/images/menu/main/main/26-01-29_071_2.jpg',
            description: 'Pork Saute 240g\nデミグラス／トマト／ホワイトチーズ／ジンジャー',
          },
          {
            name: 'カモソテー',
            price: '1,628円',
            image: 'メイン',
            imagePath: '/images/menu/main/main/26-01-31_110.jpg',
            description: 'Duck Saute\nバルサミコ／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
    ]

    const ichipin: MenuCategory[] = [
      {
        category: 'おつまみ',
        items: [
          { name: 'やみつきビアフライドポテト（ケチャップ付き）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_123.jpg', description: 'Addictive Beer-battered Fries (with Ketchup)' },
          { name: 'フレンチポテトフライ（ソース：ケチャップ／マヨ／明太マヨ／アンチョビマヨ）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_126.jpg', description: 'French Fries (Sauce: Ketchup / Mayo / Mentaiko Mayo / Anchovy Mayo)' },
          { name: '特製からあげ（レモン付き）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_127.jpg', description: 'Special Karaage (with Lemon)',
            // ★例：動画を差し込むならこんな感じ
            // videoSrc: '/videos/karaage.mp4'
          },
          { name: 'イカカラ（マヨ・レモン付き）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_144.jpg', description: 'Squid Karaage (Mayo & Lemon)' },
          { name: 'チェダーチーズのスティックフライ', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_139.jpg', description: 'Cheddar Cheese Stick Fry' },
          { name: 'アボカド＆クリームチーズのスティックフライ', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_134.jpg', description: 'Avocado & Cream Cheese Stick Fry' },
          { name: 'ゴロゴロ野菜のラタトゥーユ', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26BF04BC-73FB-4B53-B45E-CB1853229378.jpg', description: 'Chunky Vegetable Ratatouille' },
          { name: 'とろ〜りクリーミーなカニコロッケ（1個・キャベツ）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_162.jpg', description: 'Creamy Crab Croquette (1 pc, with Cabbage)' },
          { name: '手作りメンチカツ（1個・キャベツ・マスタード）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_199.jpg', description: 'Homemade Menchi-katsu (1 pc, Cabbage & Mustard)' },
          { name: '昔ながらのアジフライ（1枚・キャベツ・マスタード）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_166.jpg', description: 'Classic Fried Whiting (1 pc, Cabbage & Mustard)' },
          { name: '茄子のニンニクソース', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_182.jpg', description: 'Eggplant with Garlic Sauce' },
          { name: 'ナスとトマトのチーズ焼き', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_192.jpg', description: 'Eggplant & Tomato Cheese Bake' },
          { name: '一口ミニステーキ', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/5383D8D2-3703-4E74-BB30-8C133D7437BA.jpg', description: 'Bite-sized Mini Steak' },
          { name: 'エビのアヒージョ（バケット4枚）', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/26-01-31_186.jpg', description: 'Shrimp Ajillo (4 Slices Baguette)' },
          { name: 'チョリソー3本 粒マスタード添え', price: '550円', image: 'おつまみ', imagePath: '/images/menu/lunsh/lunsh/35D1A717-44E3-427C-9302-AA0B92737426.jpg', description: '3 Chorizo (with Grain Mustard)' },
          ],
      },
      {
        category: '一品リッチメニュー / Chef\'sSpecial & Ajillo',
        items: [
          { name: '本日のメリメロカルパッチョ (3種)', price: '1,650円', image: '一品', imagePath: '/images/menu/lunsh/lunsh/26-01-30_131_2.jpg', description: 'Today\'s Carpaccio (3 types)' },
          { name: '海鮮アヒージョ (厚切りバケット4個)', price: '1,078円', image: '一品', imagePath: '/images/menu/lunsh/lunsh/26-01-30_191.jpg', description: 'Seafood Ajillo (4 Thick Baguette)' },
          { name: 'カマンベールとプチトマトのアヒージョ (厚切りバケット4個)', price: '1,078円', image: '一品', imagePath: '/images/menu/lunsh/lunsh/26-01-30_195.jpg', description: 'Camembert & Cherry Tomato Ajillo (4 Thick Baguette)' },
          { name: '鳥ささみのチーズピンク揚げ', price: '1,078円', image: '一品', imagePath: '/images/menu/main/main/26-01-31_051.jpg', description: 'Chicken Tender Cheese Fry' },
          { name: '赤いタルタルのチキン南蛮', price: '1,078円', image: '一品', imagePath: '/images/menu/main/main/26-01-31_031.jpg', description: 'Chicken Nanban with Red Tartar' },
          { name: '大エビフライ (3本)', price: '1,628円', image: '一品', imagePath: '/images/menu/main/main/26-01-30_156.jpg', description: 'Large Fried Shrimp (3 pcs)' },
          { name: '【期間限定】カキフライ (6個)', price: '1,738円', image: '一品', imagePath: '/images/menu/main/main/26-01-30_164.jpg', description: '[Limited] Fried Oyster (6 pcs)' },
        ],
      },
      {
        category: 'パスタ',
        items: [
          { name: '昔ながらのナポリタン', price: '1,078円', image: 'パスタ', imagePath: '/images/menu/main/main/26-01-29_069_2.jpg', description: 'Classic Napolitana' },
          { name: '濃厚カルボナーラ', price: '1,408円', image: 'パスタ', imagePath: '/images/menu/main/main/26-01-31_096.jpg', description: 'Rich Carbonara' },
          { name: 'バジル香るジェノベーゼパスタ', price: '1,408円', image: 'パスタ', imagePath: '/images/menu/main/main/26-01-31_077.jpg', description: 'Basil Pesto Pasta' },
        ],
      },
      {
        category: 'サラダ',
        items: [
          { name: 'たこわさのポテトサラダ', price: '605円', image: 'サラダ', imagePath: '/images/menu/lunsh/lunsh/26-01-30_039.jpg', description: 'Octopus & Wasabi Potato Salad' },
          { name: '半熟卵のポテトサラダ', price: '605円', image: 'サラダ', imagePath: '/images/menu/lunsh/lunsh/26-01-30_043.jpg', description: 'Soft-boiled Egg Potato Salad' },
          { name: '温玉のせシーザーサラダ', price: '1,078円', image: 'サラダ', imagePath: '/images/menu/lunsh/lunsh/26-01-30_108.jpg', description: 'Caesar Salad with Soft Boiled Egg\n※温玉別皿対応可\n※温玉無し 880円（税抜）' },
          { name: 'サーモンとアボカドのポキサラダ（ポキドレッシング）', price: '1,320円', image: 'サラダ', imagePath: '/images/menu/lunsh/lunsh/26-01-30_125.jpg', description: 'Salmon & Avocado Poke Salad (Poke Dressing)' },
        ],
      },
      {
        category: 'カレー＆リゾット',
        items: [
          { name: '自家製すじカレー', price: '1,375円', image: 'カレー', imagePath: '/images/menu/main/main/26-01-31_239.jpg', description: 'Homemade Beef Tendon Curry' },
          { name: 'ベーコンと卵のクリームリゾット', price: '1,210円', image: 'カレー', imagePath: '/images/menu/main/main/26-01-31_223.jpg', description: 'Cream Risotto with Bacon & Egg' },
        ],
      },
      {
        category: 'ライス & パン（ディナー単品）',
        items: [
          { name: 'ライス 小 180g', price: '242円', image: 'ライス', description: 'Rice S 180g' },
          { name: 'ライス 中 220g', price: '308円', image: 'ライス', description: 'Rice M 220g' },
          { name: 'ライス 大 300g', price: '385円', image: 'ライス', description: 'Rice L 300g' },
          { name: 'バケット2個', price: '308円', image: 'パン', description: '2 Baguette' },
          { name: 'おかわりバケット4個', price: '594円', image: 'パン', description: 'Extra 4 Baguette' },
          { name: 'おかわりバケットスライス4枚', price: '308円', image: 'パン', description: 'Extra 4 Baguette Slices' },
        ],
      },
      {
        category: 'デザート',
        items: [
          { name: 'バニラアイス', price: '330円', image: 'デザート', imagePath: '/images/menu/lunsh/lunsh/26-01-31_256.jpg', description: 'Vanilla Ice Cream' },
          { name: '季節のシャーベット', price: '330円', image: 'デザート', imagePath: '/images/menu/lunsh/lunsh/26-01-31_253.jpg', description: 'Seasonal Sherbet' },
          { name: '店長おすすめのコーヒーゼリー', price: '330円', image: 'デザート', imagePath: '/images/menu/lunsh/lunsh/26-01-31_282.jpg', description: 'Manager\'s Recommended Coffee Jelly' },
          { name: 'ミニパフェ（コーンフレーク・バニラ・ホイップ・ストロベリーソース or チョコソース）', price: '858円', image: 'デザート', description: 'Mini Parfait (Cornflake, Vanilla, Whipped Cream / Strawberry or Chocolate Sauce)' },
        ],
      },
    ]

    const lunch: MenuCategory[] = [
      {
        category: 'メイン',
        items: [
          {
            name: '当店自慢の自家製ハンバーグ 200g',
            price: '1,518円',
            image: 'ランチ',
            imagePath: '/images/menu/main/main/26-02-02_050.jpg',
            description: 'House Hamburger 200g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢',
          },
          {
            name: 'チキンソテー 270g',
            price: '1,518円',
            image: 'ランチ',
            imagePath: '/images/menu/main/main/26-01-29_097_2.jpg',
            description: 'Chicken Saute 270g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢／ジンジャー',
          },
          {
            name: 'ポークソテー 240g',
            price: '1,518円',
            image: 'ランチ',
            imagePath: '/images/menu/main/main/26-01-29_071_2.jpg',
            description: 'Pork Saute 240g\nデミグラス／トマト／ホワイトチーズ／ジンジャー',
          },
        ],
      },
      {
        category: '国産黒毛和牛A5ランク ミスジステーキ',
        items: [
          { name: '国産黒毛和牛A5ランク ミスジステーキ 100g', price: '1,540円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_122.jpg', description: 'Japanese Beef Misuji Steak 100g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ミスジステーキ 200g', price: '3,080円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_122.jpg', description: 'Japanese Beef Misuji Steak 200g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ミスジステーキ 300g', price: '4,620円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_122.jpg', description: 'Japanese Beef Misuji Steak 300g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ミスジステーキ 450g', price: '6,930円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_122.jpg', description: 'Japanese Beef Misuji Steak 450g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: '国産黒毛和牛A5ランク ランプステーキ',
        items: [
          { name: '国産黒毛和牛A5ランク ランプステーキ 100g', price: '1,760円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 100g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ランプステーキ 200g', price: '3,520円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 200g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ランプステーキ 300g', price: '5,280円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 300g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク ランプステーキ 450g', price: '7,920円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 450g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: '国産黒毛和牛A5ランク サーロインステーキ',
        items: [
          { name: '国産黒毛和牛A5ランク サーロインステーキ 100g', price: '1,980円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_115_2.jpg', description: 'Japanese Black Beef Sirloin Steak 100g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク サーロインステーキ 200g', price: '3,960円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_115_2.jpg', description: 'Japanese Black Beef Sirloin Steak 200g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク サーロインステーキ 300g', price: '5,940円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_115_2.jpg', description: 'Japanese Black Beef Sirloin Steak 300g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛A5ランク サーロインステーキ 450g', price: '8,910円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_115_2.jpg', description: 'Japanese Black Beef Sirloin Steak 450g\nガーリック／甘辛鉄板／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: 'フライ',
        items: [
          { name: '大エビフライ (3本)', price: '1,628円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_156.jpg', description: 'Large Fried Shrimp (3 pcs)' },
          { name: '鳥ささみのチーズピンク揚げ', price: '1,078円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_051.jpg', description: 'Chicken Tender Cheese Fry' },
          { name: '赤いタルタルのチキン南蛮', price: '1,078円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_031.jpg', description: 'Chicken Nanban with Red Tartar' },
          { name: '【期間限定】カキフライ (6個)', price: '1,738円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-30_164.jpg', description: '[Limited] Fried Oyster (6 pcs)' },
        ],
      },
      {
        category: 'パスタ',
        items: [
          { name: '昔ながらのナポリタン', price: '1,078円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-29_069_2.jpg', description: 'Classic Napolitana' },
          { name: '濃厚カルボナーラ', price: '1,408円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_096.jpg', description: 'Rich Carbonara' },
          { name: 'バジル香るジェノベーゼパスタ', price: '1,408円', image: 'ランチ', imagePath: '/images/menu/main/main/26-01-31_077.jpg', description: 'Basil Pesto Pasta' },
        ],
      },
      {
        category: 'カレー＆リゾット',
        items: [
          { name: '自家製すじカレー', price: '1,375円', image: 'カレー', imagePath: '/images/menu/main/main/26-01-31_239.jpg', description: 'Homemade Beef Tendon Curry' },
          { name: 'ベーコンと卵のクリームリゾット', price: '1,210円', image: 'カレー', imagePath: '/images/menu/main/main/26-01-31_223.jpg', description: 'Cream Risotto with Bacon & Egg' },
        ],
      },
      {
        category: 'ランチセット',
        items: [
          { name: '＋味噌汁', price: '55円', image: 'セット', description: 'Miso Soup' },
          { name: '＋味噌汁＋ミニサラダ', price: '165円', image: 'セット', description: 'Miso Soup + Mini Salad' },
          { name: '＋ライス（小／中／大）＋味噌汁', price: '110円', image: 'セット', description: 'Rice (S/M/L) + Miso Soup' },
          { name: '＋ライス（小／中／大）＋味噌汁＋ミニサラダ', price: '220円', image: 'セット', description: 'Rice (S/M/L) + Miso Soup + Mini Salad' },
          { name: 'パンセット', price: '110円', image: 'セット', description: 'Bread Set: + 2 Bread + Miso Soup' },
          { name: 'パンサラダセット', price: '220円', image: 'セット', description: 'Bread & Salad Set: + 2 Bread + Miso\nSoup + Mini Salad' },
        ],
      },
    ]

    const dessertDrink: MenuCategory[] = [
      {
        category: 'ソフトドリンク',
        items: [
          { name: 'ウーロン茶', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_221.jpg', description: 'Oolong Tea (Iced)' },
          { name: '緑茶', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_222.jpg', description: 'Green Tea (Iced)' },
          { name: 'コーン茶', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_220.jpg', description: 'Corn Tea (Iced)' },
          { name: 'カルピス', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_241.jpg', description: 'Calpis (Iced)' },
          { name: 'コカ・コーラ', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_230.jpg', description: 'Coca-Cola (Iced)' },
          { name: 'メロンソーダ', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_234.jpg', description: 'Melon Soda (Iced)' },
          { name: 'ジンジャーエール', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_233.jpg', description: 'Ginger Ale (Iced)' },
          { name: 'オレンジジュース', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_223.jpg', description: 'Orange Juice (Iced)' },
          { name: 'アイスティー', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_239.jpg', description: 'Iced Tea' },
          { name: 'アイスコーヒー', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_235.jpg', description: 'Iced Coffee' },
          { name: 'カフェオレ', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-30_228.jpg', description: 'Cafe au Lait' },
          { name: 'ウーロン茶（ホット）', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_312.jpg', description: 'Oolong Tea (Hot)' },
          { name: '緑茶（ホット）', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_307.jpg', description: 'Green Tea (Hot)' },
          { name: '紅茶（ホット）', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_305.jpg', description: 'Black Tea (Hot)' },
          { name: 'コーヒー（ホット）', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_300.jpg', description: 'Coffee (Hot)' },
          { name: 'コーン茶（ホット）', price: '330円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_314.jpg', description: 'Corn Tea (Hot)' },
        ],
      },
      {
        category: 'フロート',
        items: [
          { name: '各種フロート ＋', price: '165円', image: 'ドリンク', imagePath: '/images/menu/side/side/26-01-31_257.jpg', description: 'Float Add-on (Add to soft drinks)' },
        ],
      },
    ]

    const drink: MenuCategory[] = [
      {
        category: 'ビール',
        items: [
          { name: 'サッポロ生ビール', price: '748円', image: 'ビール', imagePath: '/images/menu/alcohol/alcohol/26-01-30_397.jpg', description: 'Sapporo Draft Beer' },
          { name: '瓶ビール（赤星）', price: '858円', image: 'ビール', imagePath: '/images/menu/alcohol/alcohol/26-01-30_318.jpg', description: 'Bottle Beer (Akaboshi)' },
          { name: 'ノンアルコールビール', price: '748円', image: 'ビール', imagePath: '/images/menu/alcohol/alcohol/26-01-30_329.jpg', description: 'Non-Alcoholic Beer' },
        ],
      },
      {
        category: 'ウイスキー（デュワーズ）',
        items: [
          { name: 'ハイボール', price: '748円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_404.jpg', description: 'Highball' },
          { name: 'コークハイ', price: '748円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_401.jpg', description: 'Coke High' },
          { name: 'ジンジャーハイボール', price: '748円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_404.jpg', description: 'Ginger Highball' },
          { name: 'ホワイトボール', price: '770円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_398.jpg', description: 'Whiteball' },
          { name: '期間限定テキーラ 1800', price: '1,200円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_357.jpg', description: 'Tequila 1800 (One Shot)' },
          { name: '期間限定テキーラ パトロンシルバー', price: '1,500円', image: 'ウイスキー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_374.jpg', description: 'Patrón Silver Tequila (One Shot)' },
        ],
      },
      {
        category: 'お茶割り（TEA BREAK）',
        items: [
          { name: 'ウーロンハイ', price: '638円', image: 'お茶割り', imagePath: '/images/menu/alcohol/alcohol/26-01-30_460.jpg', description: 'Oolong High' },
          { name: '緑茶ハイ', price: '638円', image: 'お茶割り', imagePath: '/images/menu/alcohol/alcohol/26-01-30_461.jpg', description: 'Green Tea High' },
          { name: 'コーン茶ハイ', price: '638円', image: 'お茶割り', imagePath: '/images/menu/alcohol/alcohol/26-01-30_464.jpg', description: 'Corn Tea High' },
        ],
      },
      {
        category: 'サワー',
        items: [
          { name: '酎ハイ', price: '605円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_411.jpg', description: 'Chuhai' },
          { name: 'レモンサワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_407.jpg', description: 'Lemon Sour' },
          { name: 'ゆずサワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_408.jpg', description: 'Yuzu Sour' },
          { name: '男梅サワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_417.jpg', description: 'Otoko Ume Sour' },
          { name: 'クエン酸サワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_424.jpg', description: 'Citric Acid Sour' },
          { name: 'バイスサワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_445.jpg', description: 'Vice Sour' },
          { name: 'ライムサワー', price: '638円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_421.jpg', description: 'Lime Sour' },
          { name: 'カルピスサワー', price: '660円', image: 'サワー', imagePath: '/images/menu/alcohol/alcohol/26-01-30_398.jpg', description: 'Calpis Sour' },
        ],
      },
      {
        category: 'ワイン',
        items: [
          { name: 'グラスワイン（赤）', price: '638円', image: 'ワイン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_478.jpg', description: 'Glass Wine (Red)' },
          { name: 'グラスワイン（白）', price: '638円', image: 'ワイン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_465.jpg', description: 'Glass Wine (White)' },
          { name: 'スパークリング（グラス）', price: '638円', image: 'ワイン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_281.jpg', description: 'Sparkling (Glass)' },
          { name: 'ボトルワイン（赤）', price: '3,300円〜', image: 'ワイン', description: 'Bottle Wine (Red)\n※種類はスタッフまでお尋ねください', priceTiers: [{ excl: 3000, incl: 3300 }, { excl: 5000, incl: 5500 }, { excl: 10000, incl: 11000 }] },
          { name: 'ボトルワイン（白）', price: '3,300円〜', image: 'ワイン', description: 'Bottle Wine (White)\n※種類はスタッフまでお尋ねください', priceTiers: [{ excl: 3000, incl: 3300 }, { excl: 5000, incl: 5500 }, { excl: 10000, incl: 11000 }] },
        ],
      },
      {
        category: 'シャンパン',
        items: [
          { name: 'モエ・シャンドン 白', price: '11,000円', image: 'シャンパン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_260_2.jpg', description: 'Moët & Chandon (White)' },
          { name: 'モエ・シャンドン ロゼ', price: '16,500円', image: 'シャンパン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_260_2.jpg', description: 'Moët & Chandon (Rosé)' },
          { name: 'ドン・ペリニヨン 白', price: '55,000円', image: 'シャンパン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_275.jpg', description: 'Dom Pérignon (White)' },
          { name: 'ドン・ペリニヨン ロゼ', price: '110,000円', image: 'シャンパン', imagePath: '/images/menu/alcohol/alcohol/26-01-30_275.jpg', description: 'Dom Pérignon (Rosé)' },
        ],
      },
      {
        category: '日本酒',
        items: [
          { name: '富貴（淡麗辛口）', price: '※価格はスタッフまでお尋ねください', image: '日本酒', description: 'Tuki (Dry)' },
          { name: '久保田', price: '※価格はスタッフまでお尋ねください', image: '日本酒', imagePath: '/images/menu/alcohol/alcohol/26-01-30_299.jpg', description: 'Kubota' },
          { name: '獺祭', price: '※価格はスタッフまでお尋ねください', image: '日本酒', imagePath: '/images/menu/alcohol/alcohol/26-01-30_305.jpg', description: 'Dassai' },
        ],
      },
    ]

    return {
      main: { label: 'メインメニュー', categories: main },
      ichipin: { label: '一品メニュー', categories: ichipin },
      lunch: { label: 'ランチメニュー', categories: lunch },
      dessertDrink: { label: 'ドリンクメニュー', categories: dessertDrink },
      drink: { label: 'アルコールメニュー', categories: drink },
    }
  }, [])

  const menuCategories = menusByTab[activeTab].categories

  /** 描画用セクション配列（データ駆動：国産和牛ミスジは menuSectionsSample、他は旧カテゴリから変換） */
  const sectionsForRender: RenderSection[] = useMemo(() => {
    const firstNewSection: RenderSection = {
      sectionTitle: menuSectionsSample[0].sectionTitle,
      sectionNotes: menuSectionsSample[0].sectionNotes,
      displayItems: sectionToDisplayItems(menuSectionsSample[0]),
    }
    const restSections = menuCategories.map(oldCategoryToRenderSection)
    if (activeTab === 'main') {
      return [firstNewSection, ...restSections]
    }
    return restSections
  }, [activeTab, menuCategories])

  return (
    <div className={`${styles.menu} ${(activeTab === 'dessertDrink' || activeTab === 'drink') ? styles.menuDrink : ''}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1>メニュー</h1>
          <p className={`${styles.heroSubtitle} breakAfterPeriod`}>
            {breakAfterPeriod('オーナーシェフが心を込めてお作りする、こだわりのメニューをご覧ください。')}
          </p>
        </div>
      </section>

      {/* ✅ タブ：PDFリンクじゃなく「切替ボタン」にする */}
      <section className={styles.tabs}>
        <div className="container">
          <div className={styles.tabList}>
            {(['main', 'ichipin', 'lunch', 'dessertDrink', 'drink'] as TabKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`${styles.tabLink} ${activeTab === key ? styles.tabActive : ''}`}
              >
                {menusByTab[key].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* データ駆動：セクション・カードとも配列 + map で量産（手書きJSX禁止） */}
      {sectionsForRender.map((section, sectionIndex) => (
        <section key={sectionIndex} className={styles.categorySection}>
          <div className="container">
            <div className={styles.categorySectionHeader}>
              {((section.sectionTitle === '国産黒毛和牛A5ランク ミスジステーキ' && activeTab === 'main') || (section.sectionTitle === 'メイン' && activeTab === 'lunch')) && (
                <p className={styles.riceNote}>
                  {activeTab === 'main'
                    ? '全メニューにライスは付きません。単品ライスをご注文下さい！'
                    : '全メニューにライスは付きません セットメニューをお選び下さい!'}
                </p>
              )}
              <h2 className={styles.categoryTitle}>
                {STEAK_SECTION_TITLES.includes(section.sectionTitle as (typeof STEAK_SECTION_TITLES)[number]) ? (
                  <>
                    <span className={styles.steakTitleLine1}>{section.sectionTitle.split(' ')[0]}</span>
                    {' '}
                    <span className={styles.steakTitleLine2}>{section.sectionTitle.split(' ')[1]}</span>
                  </>
                ) : (
                  section.sectionTitle
                )}
              </h2>
            </div>
            <div className={styles.categoryNotes}>
              {section.sectionNotes?.type === 'block' ? (
                <>
                  <span></span>
                  <span className={`${styles.categoryNoteRight} ${styles.steakNoteBlock}`}>
                    {section.sectionNotes.lines.map((line, i) => (
                      <span key={i} className={`${styles.steakNoteLine} breakAfterPeriod`}>{breakAfterPeriod(line)}</span>
                    ))}
                  </span>
                </>
              ) : section.sectionNotes?.type === 'leftRight' ? (
                <>
                  <span className={`${styles.categoryNoteLeft} breakAfterPeriod`}>{breakAfterPeriod(section.sectionNotes.left ?? '')}</span>
                  <span className={`${styles.categoryNoteRight} breakAfterPeriod`}>{breakAfterPeriod(section.sectionNotes.right ?? '')}</span>
                </>
              ) : (
                <>
                  <span></span>
                  <span className={`${styles.categoryNoteRight} breakAfterPeriod`}>{breakAfterPeriod('※メニューの写真や動画はイメージ図となります。')}</span>
                </>
              )}
            </div>
            {isSteakSection(section) ? (
              <>
                <div className={styles.steakSectionDesktop}>
                  <div className={styles.menuGrid}>
                    {section.displayItems.map((item, itemIndex) => (
                      <div key={itemIndex} className={styles.menuItem}>
                        <div className={styles.menuImage}>
                          <MenuCardImage imagePath={item.imagePath} alt={item.name} />
                        </div>
                        <div className={styles.menuContent}>
                          <h3>{formatMenuName(item.name)}</h3>
                          {item.description != null && item.description !== '' && (
                            <p className={styles.description} style={{ whiteSpace: 'pre-line', ...item.descriptionStyle }}>
                              {item.description}
                            </p>
                          )}
                          {item.notes != null && item.notes.length > 0 && (
                            <p className={styles.menuNote}>{item.notes.join(' ')}</p>
                          )}
                          <div className={styles.priceContainer}>
                            {item.priceExcl != null && item.priceIncl != null && (
                              <div className={styles.priceWrapper}>
                                <span className={styles.priceExcludingTax}>{item.priceExcl.toLocaleString()}円（税抜）</span>
                                <span className={styles.price}>{item.priceIncl.toLocaleString()}円（税込）</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.steakSectionMobile}>
                  <div className={styles.menuGrid}>
                    <div className={styles.menuItem}>
                      <div className={styles.menuImage}>
                        <MenuCardImage
                          imagePath={section.displayItems[0]?.imagePath}
                          alt={section.sectionTitle}
                        />
                      </div>
                      <div className={styles.menuContent}>
                        <h3>
                          {STEAK_SECTION_TITLES.includes(section.sectionTitle as (typeof STEAK_SECTION_TITLES)[number]) ? (
                            <>
                              <span className={styles.steakTitleLine1}>{section.sectionTitle.split(' ')[0]}</span>
                              {' '}
                              <span className={styles.steakTitleLine2}>{section.sectionTitle.split(' ')[1]}</span>
                            </>
                          ) : (
                            section.sectionTitle
                          )}
                        </h3>
                        {section.displayItems[0]?.description != null && section.displayItems[0].description !== '' && (
                          <p className={styles.description} style={{ whiteSpace: 'pre-line' }}>
                            {section.displayItems[0].description}
                          </p>
                        )}
                        <div className={styles.priceContainer}>
                          <div className={styles.priceTiersWrapper}>
                            {section.displayItems.map((item, i) => (
                              <div key={i} className={styles.priceWrapper}>
                                <span className={styles.steakWeight}>{extractWeight(item.name)}</span>
                                {item.priceExcl != null && item.priceIncl != null && (
                                  <>
                                    <span className={styles.priceExcludingTax}>{item.priceExcl.toLocaleString()}円（税抜）</span>
                                    <span className={styles.price}>{item.priceIncl.toLocaleString()}円（税込）</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.menuGrid}>
                {section.displayItems.map((item, itemIndex) => (
                  <div key={itemIndex} className={styles.menuItem}>
                    <div className={`${styles.menuImage} ${item.name.includes('当店自慢の自家製ハンバーグ') || item.name.includes('ミニパフェ') || item.name === 'ボトルワイン（赤）' || item.name === 'ボトルワイン（白）' ? styles.menuImageHamburger : ''}`}>
                      {item.name.includes('当店自慢の自家製ハンバーグ') && HAMBURGER_SAUCE_IMAGES.length > 0 ? (
                        <AboutImageSlider
                          slides={HAMBURGER_SAUCE_IMAGES.map((src, i) => ({
                            src,
                            alt: `当店自慢の自家製ハンバーグ（${['デミグラスソース', 'トマトソース', 'ホワイトチーズ', '大根おろしポン酢'][i] ?? `ソース${i + 1}`}）`,
                          }))}
                        />
                      ) : item.name.includes('ミニパフェ') && MINI_PARFAIT_IMAGES.length > 0 ? (
                        <AboutImageSlider
                          slides={MINI_PARFAIT_IMAGES.map((src, i) => ({
                            src,
                            alt: `ミニパフェ（${i + 1}）`,
                          }))}
                        />
                      ) : item.name === 'ボトルワイン（赤）' && RED_WINE_BOTTLE_IMAGES.length > 0 ? (
                        <AboutImageSlider
                          slides={RED_WINE_BOTTLE_IMAGES.map((src, i) => ({
                            src,
                            alt: `ボトルワイン（赤）${i + 1}`,
                          }))}
                        />
                      ) : item.name === 'ボトルワイン（白）' && WHITE_WINE_BOTTLE_IMAGES.length > 0 ? (
                        <AboutImageSlider
                          slides={WHITE_WINE_BOTTLE_IMAGES.map((src, i) => ({
                            src,
                            alt: `ボトルワイン（白）${i + 1}`,
                          }))}
                        />
                      ) : (
                        <MenuCardImage imagePath={item.imagePath} alt={item.name} />
                      )}
                    </div>
                    <div className={styles.menuContent}>
                      <h3>{formatMenuName(item.name)}</h3>
                      {item.description != null && item.description !== '' && (
                        <p className={styles.description} style={{ whiteSpace: 'pre-line', ...item.descriptionStyle }}>
                          {item.description}
                        </p>
                      )}
                      {item.name === '温玉のせシーザーサラダ' && (
                        <p className={styles.menuNote} style={{ textAlign: 'center' }}>
                          ※温玉無し 880円（税抜）
                          <span className={styles.price}>968円（税込）</span>
                        </p>
                      )}
                      {item.notes != null && item.notes.length > 0 && (
                        <p className={styles.menuNote}>{item.notes.join(' ')}</p>
                      )}
                      <div className={styles.priceContainer}>
                        {item.priceTiers != null && item.priceTiers.length > 0 ? (
                          <div className={styles.priceTiersWrapper}>
                            {item.priceTiers.map((tier, i) => (
                              <div key={i} className={styles.priceWrapper}>
                                <span className={styles.priceExcludingTax}>{tier.excl.toLocaleString()}円（税抜）</span>
                                <span className={styles.price}>{tier.incl.toLocaleString()}円（税込）</span>
                              </div>
                            ))}
                          </div>
                        ) : item.priceExcl != null && item.priceIncl != null ? (
                          <div className={styles.priceWrapper}>
                            <span className={styles.priceExcludingTax}>{item.priceExcl.toLocaleString()}円（税抜）</span>
                            <span className={styles.price}>{item.priceIncl.toLocaleString()}円（税込）</span>
                          </div>
                        ) : item.priceNote ? (
                          <span className={styles.price}>{item.priceNote}</span>
                        ) : (
                          <span className={styles.price}>※価格はスタッフまで</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <section className={styles.note}>
        <div className="container">
          <p className={styles.noteText}>
            {footerNotes.map((line, i) => (
              <span key={i}>
                {line}
                {i < footerNotes.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  )
}
