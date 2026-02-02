'use client'

import { useMemo, useState } from 'react'
import styles from './page.module.css'

type MenuItem = {
  name: string
  price: string
  description?: string
  image?: string
  imagePath?: string // 画像パス（/images/xxx.jpg など）
  videoSrc?: string // ← 動画差し込み用（任意）
  /** ボトルワインなど3段階価格のとき { 税抜, 税込 } の配列 */
  priceTiers?: { excl: number; incl: number }[]
}

type MenuCategory = {
  category: string
  items: MenuItem[]
}

type TabKey = 'main' | 'ichipin' | 'lunch' | 'dessertDrink' | 'drink'

export default function Menu() {
  const [activeTab, setActiveTab] = useState<TabKey>('main')

  // メニュー名を適切に改行して表示する関数
  const formatMenuName = (name: string) => {
    // 国産黒毛和牛サーロインステーキのパターン
    if (name.includes('国産黒毛和牛サーロインステーキ')) {
      const match = name.match(/^国産黒毛和牛サーロインステーキ (.+)$/)
      if (match) {
        return (
          <>
            国産黒毛和牛
            <br />
            <b style={{ display: 'block', textAlign: 'right' }}>サーロインステーキ　{match[1]}</b>
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
            <b style={{ display: 'block', textAlign: 'right' }}>{match[1]}</b>
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
            <span style={{ marginLeft: '1em' }}>（{match[2]}）</span>
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
            <span style={{ display: 'block', textAlign: 'right' }}>（{match[1]}）</span>
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
            <span style={{ display: 'block', textAlign: 'right' }}>（{match[1]}）</span>
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
          <b style={{ display: 'block', textAlign: 'right' }}>カニコロッケ　1個</b>
          <span style={{ display: 'block', textAlign: 'right', marginTop: '0.5rem' }}>（キャベツ付き）</span>
        </>
      )
    }
    // 国産和牛ミスジステーキとランプステーキのパターン（小画面でも切れないよう折り返し可）
    if (name.includes('国産和牛ミスジステーキ') || name.includes('国産和牛ランプステーキ')) {
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
          <b style={{ display: 'block', textAlign: 'right' }}>味噌汁</b>
        </>
      )
    }
    // ライス（小／中／大）＋味噌汁＋ミニサラダのパターン
    if (name.includes('ライス（小／中／大）＋味噌汁＋ミニサラダ')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋</b>
          <b style={{ display: 'block', textAlign: 'right', marginTop: '-0.5rem' }}>味噌汁＋ミニサラダ</b>
        </>
      )
    }
    // パンサラダセット：パン2個＋味噌汁＋ミニサラダのパターン
    if (name.includes('パンサラダセット：パン2個＋味噌汁＋ミニサラダ')) {
      return (
        <>
          パンサラダセット：パン2個＋
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>味噌汁＋ミニサラダ</b>
        </>
      )
    }
    // やみつきビアフライドポテト（ケチャップ付き）のパターン
    if (name.includes('やみつきビアフライドポテト（ケチャップ付き）')) {
      return (
        <>
          やみつきビアフライドポテト
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>（ケチャップ付き）</b>
        </>
      )
    }
    // イカカラ（マヨ・レモン付き）のパターン（1行で表示）
    if (name.includes('イカカラ（マヨ・レモン付き）')) {
      return <b style={{ whiteSpace: 'nowrap' }}>{name}</b>
    }
    // エビのケイジャンスパイスフライのパターン
    if (name.includes('エビのケイジャンスパイスフライ')) {
      return (
        <>
          エビの
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>ケイジャンスパイスフライ</b>
        </>
      )
    }
    // 洋風ちくわのチーズ揚げのパターン（中央揃え）
    if (name.includes('洋風ちくわのチーズ揚げ')) {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
    }
    // チェダーチーズのスティックフライのパターン
    if (name.includes('チェダーチーズのスティックフライ')) {
      return (
        <>
          チェダーチーズの
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>スティックフライ</b>
        </>
      )
    }
    // アボカド＆クリームチーズのスティックフライのパターン
    if (name.includes('アボカド＆クリームチーズのスティックフライ')) {
      return (
        <>
          アボカド＆クリームチーズ
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>のスティックフライ</b>
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
          <strong style={{ display: 'block', textAlign: 'right' }}>（粒マスタード添え）</strong>
        </>
      )
    }
    // キャベツマリネ ジンジャードレッシングのパターン（2行目を右寄せ・太文字）
    if (name.includes('キャベツマリネ ジンジャードレッシング')) {
      return (
        <>
          キャベツマリネ
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>ジンジャードレッシング</b>
        </>
      )
    }
    // 本日のメリメロカルパッチョ (3種)のパターン（2行目を右寄せ）
    if (name.includes('本日のメリメロカルパッチョ (3種)')) {
      return (
        <>
          本日のメリメロカルパッチョ
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>(3種)</b>
        </>
      )
    }
    // ビックソーセージ2本(マッシュポテト・粒マスタード)のパターン（1行目中央揃え、2行目1列に）
    if (name.includes('ビックソーセージ2本(マッシュポテト・粒マスタード)')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ビックソーセージ2本</b>
          <b style={{ whiteSpace: 'nowrap' }}>(マッシュポテト・粒マスタード)</b>
        </>
      )
    }
    // ブラッターチーズとシャインマスカットのカプレーゼ(白ワインとライムジュレ)のパターン（2行目を中央揃え）
    if (name.includes('ブラッターチーズとシャインマスカットのカプレーゼ(白ワインとライムジュレ)')) {
      return (
        <>
          ブラッターチーズと
          <br />
          <b style={{ display: 'block', textAlign: 'center' }}>シャインマスカットの</b>
          <b style={{ display: 'block', textAlign: 'right' }}>カプレーゼ</b>
          <b style={{ display: 'block', textAlign: 'right' }}>(白ワインとライムジュレ)</b>
        </>
      )
    }
    // メニューを中央揃えに
    if (name === '茄子のニンニクソース' || 
        name === 'ナスとトマトのチーズ焼き' || 
        name === '一口ミニステーキ' || 
        name === '生ハム' || 
        name === '2種チーズ盛り合わせ' ||
        name === '鳥ささみのチーズピンク揚げ' ||
        name === '赤いタルタルのチキン南蛮' ||
        name === '大エビフライ (3本)' ||
        name === '昔ながらのナポリタン' ||
        name === '濃厚カルボナーラ' ||
        name === 'たこわさのポテトサラダ' ||
        name === '半熟卵のポテトサラダ' ||
        name === '温玉のせシーザーサラダ' ||
        name === '3種のチーズサラダ（サウザンドレッシング）' ||
        name === 'ライス 小 180g' ||
        name === 'ライス 中 220g' ||
        name === 'ライス 大 300g' ||
        name === 'バケット2個' ||
        name === 'おかわりバケット4個' ||
        name === 'バニラアイス' ||
        name === '季節のシャーベット' ||
        name === 'コーヒーゼリー') {
      return <b style={{ display: 'block', textAlign: 'center' }}>{name}</b>
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
    // 3種のキノコとしらすのアヒージョ (厚切りバケット4個)のパターン
    if (name.includes('3種のキノコとしらすのアヒージョ (厚切りバケット4個)')) {
      return (
        <>
          3種のキノコと
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>しらすのアヒージョ</b>
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
          <b style={{ display: 'block', textAlign: 'right' }}>アヒージョ</b>
          <b style={{ display: 'block', textAlign: 'center' }}>(厚切りバケット4個)</b>
        </>
      )
    }
    // 濃厚じゃがいものクリームニョッキのパターン
    if (name.includes('濃厚じゃがいものクリームニョッキ')) {
      return (
        <>
          濃厚じゃがいもの
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>クリームニョッキ</b>
        </>
      )
    }
    // 【期間限定】カキフライ (6個)のパターン（1行で表示）
    if (name.includes('【期間限定】カキフライ (6個)')) {
      return <b style={{ whiteSpace: 'nowrap' }}>{name}</b>
    }
    // たっぷりしらすのペペロンチーノ（昆布茶仕立て）のパターン（1行目・2行目を中央揃え）
    if (name.includes('たっぷりしらすのペペロンチーノ（昆布茶仕立て）')) {
      return (
        <>
          <b style={{ display: 'block', whiteSpace: 'nowrap', textAlign: 'center' }}>たっぷりしらすのペペロンチーノ</b>
          <b style={{ display: 'block', textAlign: 'center' }}>（昆布茶仕立て）</b>
        </>
      )
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
    // ダッチベビー（ベリベリストロベリー or チョコチョコチョコ + ホイップクリーム・バニラ）のパターン
    if (name.includes('ダッチベビー（ベリベリストロベリー or チョコチョコチョコ + ホイップクリーム・バニラ）')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ダッチベビー</b>
          <b style={{ display: 'block', textAlign: 'left' }}>（ベリベリストロベリー or</b>
          <b style={{ display: 'block', textAlign: 'center' }}>チョコチョコチョコ +</b>
          <b style={{ display: 'block', textAlign: 'right' }}>ホイップクリーム・バニラ）</b>
        </>
      )
    }
    // ミニパフェ（コーンフレーク・バニラ・ホイップ ストロベリーソース or チョコソース）のパターン
    if (name.includes('ミニパフェ（コーンフレーク・バニラ・ホイップ ストロベリーソース or チョコソース）')) {
      return (
        <>
          <b style={{ display: 'block', textAlign: 'center' }}>ミニパフェ</b>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <b style={{ display: 'block' }}>（コーンフレーク・バニラ・</b>
              <b style={{ display: 'block', whiteSpace: 'nowrap' }}>ホイップ・ストロベリーソース</b>
            </div>
          </div>
          <b style={{ display: 'block', textAlign: 'center' }}>or　チョコソース）</b>
        </>
      )
    }
    // 自家製すじカレー・野菜の旨みキーマカレー（センター揃え）
    if (name === '自家製すじカレー') {
      return <b style={{ display: 'block', textAlign: 'center' }}>自家製すじカレー</b>
    }
    if (name === '野菜の旨みキーマカレー') {
      return <b style={{ display: 'block', textAlign: 'center' }}>野菜の旨みキーマカレー</b>
    }
    // ベーコンと卵のクリームリゾットのパターン
    if (name === 'ベーコンと卵のクリームリゾット') {
      return (
        <>
          ベーコンと卵の
          <br />
          <b style={{ display: 'block', textAlign: 'right' }}>クリームリゾット</b>
        </>
      )
    }
    // ランチセット：頭の＋削除・センター揃え
    if (name === '＋味噌汁') return <b style={{ display: 'block', textAlign: 'center' }}>味噌汁</b>
    if (name === '＋味噌汁＋ミニサラダ') return <b style={{ display: 'block', textAlign: 'center' }}>味噌汁＋ミニサラダ</b>
    if (name === '＋ライス（小／中／大）＋味噌汁') return <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋味噌汁</b>
    if (name === '＋ライス（小／中／大）＋味噌汁＋ミニサラダ') return <b style={{ display: 'block', textAlign: 'center' }}>ライス（小／中／大）＋味噌汁＋ミニサラダ</b>
    if (name === 'パンセット：＋パン2個＋味噌汁') return <b style={{ display: 'block', textAlign: 'center' }}>パンセット：パン2個＋味噌汁</b>
    if (name === 'パンサラダセット：＋パン2個＋味噌汁＋ミニサラダ') return <b style={{ display: 'block', textAlign: 'center' }}>パンサラダセット：パン2個＋味噌汁＋ミニサラダ</b>
    // その他はそのまま
    return name
  }

  // ✅ タブごとのメニューデータ
  // （フード完全版、ランチ、デザート&ドリンク、ドリンク を切替）
  const menusByTab: Record<TabKey, { label: string; categories: MenuCategory[] }> = useMemo(() => {
    const main: MenuCategory[] = [
      {
        category: '国産和牛ミスジステーキ',
        items: [
          {
            name: '国産和牛ミスジステーキ 100g',
            price: '1,320円',
            image: 'ステーキ',
            description: 'Japanese Beef Misuji Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ミスジステーキ 200g',
            price: '2,640円',
            image: 'ステーキ',
            description: 'Japanese Beef Misuji Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ミスジステーキ 300g',
            price: '3,960円',
            image: 'ステーキ',
            description: 'Japanese Beef Misuji Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ミスジステーキ 450g',
            price: '5,940円',
            image: 'ステーキ',
            description: 'Japanese Beef Misuji Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
      {
        category: '国産和牛ランプステーキ',
        items: [
          {
            name: '国産和牛ランプステーキ 100g',
            price: '1,650円',
            image: 'ステーキ',
            imagePath: '/images/menu/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ランプステーキ 200g',
            price: '3,300円',
            image: 'ステーキ',
            imagePath: '/images/menu/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ランプステーキ 300g',
            price: '4,950円',
            image: 'ステーキ',
            imagePath: '/images/menu/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産和牛ランプステーキ 450g',
            price: '7,425円',
            image: 'ステーキ',
            imagePath: '/images/menu/26-01-30_188_2%20(1).jpg',
            description: 'Japanese Beef Rump Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
      {
        category: '国産黒毛和牛サーロインステーキ',
        items: [
          {
            name: '国産黒毛和牛サーロインステーキ 100g',
            price: '1,980円',
            image: 'ステーキ',
            description: 'Japanese Black Beef Sirloin Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛サーロインステーキ 200g',
            price: '3,960円',
            image: 'ステーキ',
            description: 'Japanese Black Beef Sirloin Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛サーロインステーキ 300g',
            price: '5,940円',
            image: 'ステーキ',
            description: 'Japanese Black Beef Sirloin Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
          },
          {
            name: '国産黒毛和牛サーロインステーキ 450g',
            price: '8,910円',
            image: 'ステーキ',
            description: 'Japanese Black Beef Sirloin Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう',
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
            imagePath: '/images/menu/26-01-29_116_2.jpg',
            description: 'House Hamburger 200g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢',
          },
          {
            name: 'チキンソテー 270g',
            price: '1,518円',
            image: 'メイン',
            imagePath: '/images/menu/26-01-29_097_2.jpg',
            description: 'Chicken Saute 270g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢／ジンジャー',
          },
          {
            name: 'ポークソテー 240g',
            price: '1,518円',
            image: 'メイン',
            imagePath: '/images/menu/26-01-29_071_2.jpg',
            description: 'Pork Saute 240g\nデミグラス／トマト／ホワイトチーズ／ジンジャー',
          },
          {
            name: 'カモソテー',
            price: '1,628円',
            image: 'メイン',
            description: 'Duck Saute\n赤ワイン／バルサミコ／刻みわさび醤油／ゆずこしょう',
          },
        ],
      },
    ]

    const ichipin: MenuCategory[] = [
      {
        category: 'おつまみ',
        items: [
          { name: 'やみつきビアフライドポテト（ケチャップ付き）', price: '550円', image: 'おつまみ', description: 'Addictive Beer-battered Fries (with Ketchup)' },
          { name: 'フレンチポテトフライ（ソース：ケチャップ／マヨ／明太マヨ／アンチョビマヨ）', price: '550円', image: 'おつまみ', description: 'French Fries (Sauce: Ketchup / Mayo / Mentaiko Mayo / Anchovy Mayo)' },
          { name: '特製からあげ（レモン付き）', price: '550円', image: 'おつまみ', description: 'Special Karaage (with Lemon)',
            // ★例：動画を差し込むならこんな感じ
            // videoSrc: '/videos/karaage.mp4'
          },
          { name: 'イカカラ（マヨ・レモン付き）', price: '550円', image: 'おつまみ', description: 'Squid Karaage (Mayo & Lemon)' },
          { name: 'エビのケイジャンスパイスフライ', price: '550円', image: 'おつまみ', description: 'Cajun Spice Fried Shrimp' },
          { name: '洋風ちくわのチーズ揚げ', price: '550円', image: 'おつまみ', description: 'Western-style Chikuwa Cheese Fry' },
          { name: 'チェダーチーズのスティックフライ', price: '550円', image: 'おつまみ', description: 'Cheddar Cheese Stick Fry' },
          { name: 'アボカド＆クリームチーズのスティックフライ', price: '550円', image: 'おつまみ', description: 'Avocado & Cream Cheese Stick Fry' },
          { name: 'ゴロゴロ野菜のラタトゥーユ', price: '550円', image: 'おつまみ', description: 'Chunky Vegetable Ratatouille' },
          { name: 'とろ〜りクリーミーなカニコロッケ（1個・キャベツ）', price: '550円', image: 'おつまみ', description: 'Creamy Crab Croquette (1 pc, with Cabbage)' },
          { name: '手作りメンチカツ（1個・キャベツ・マスタード）', price: '550円', image: 'おつまみ', description: 'Homemade Menchi-katsu (1 pc, Cabbage & Mustard)' },
          { name: '昔ながらのアジフライ（1枚・キャベツ・マスタード）', price: '550円', image: 'おつまみ', description: 'Classic Fried Whiting (1 pc, Cabbage & Mustard)' },
          { name: '茄子のニンニクソース', price: '550円', image: 'おつまみ', description: 'Eggplant with Garlic Sauce' },
          { name: 'ナスとトマトのチーズ焼き', price: '550円', image: 'おつまみ', description: 'Eggplant & Tomato Cheese Bake' },
          { name: '一口ミニステーキ', price: '550円', image: 'おつまみ', description: 'Bite-sized Mini Steak' },
          { name: '生ハム', price: '550円', image: 'おつまみ', description: 'Prosciutto' },
          { name: '2種チーズ盛り合わせ', price: '550円', image: 'おつまみ', description: 'Two Cheese Platter' },
          { name: 'エビのアヒージョ（バケット4枚）', price: '550円', image: 'おつまみ', description: 'Shrimp Ajillo (4 Slices Baguette)' },
          { name: 'チョリソー3本 粒マスタード添え', price: '550円', image: 'おつまみ', description: '3 Chorizo (with Grain Mustard)' },
          { name: 'キャベツマリネ ジンジャードレッシング', price: '550円', image: 'おつまみ', description: 'Cabbage Marinade with Ginger Dressing' },
        ],
      },
      {
        category: '一品リッチメニュー / Chef\'sSpecial & Ajillo',
        items: [
          { name: '本日のメリメロカルパッチョ (3種)', price: '1,650円', image: '一品', description: 'Today\'s Carpaccio (3 types)' },
          { name: 'ブラッターチーズとシャインマスカットのカプレーゼ(白ワインとライムジュレ)', price: '1,650円', image: '一品', description: 'Burrata & Shine Muscat Caprese (White Wine & Lime Jus)' },
          { name: 'ビックソーセージ2本(マッシュポテト・粒マスタード)', price: '1,485円', image: '一品', description: 'Big Sausage 2 (Mash Potato & Grain Mustard)' },
          { name: '海鮮アヒージョ (厚切りバケット4個)', price: '1,078円', image: '一品', description: 'Seafood Ajillo (4 Thick Baguette)' },
        ],
      },
      {
        category: '一品メニュー',
        items: [
          { name: '3種のキノコとしらすのアヒージョ (厚切りバケット4個)', price: '968円', image: '一品', description: '3 Mushroom & Shirasu Ajillo (4 Thick Baguette)' },
          { name: 'カマンベールとプチトマトのアヒージョ (厚切りバケット4個)', price: '968円', image: '一品', description: 'Camembert & Cherry Tomato Ajillo (4 Thick Baguette)' },
          { name: '鳥ささみのチーズピンク揚げ', price: '858円', image: '一品', description: 'Chicken Tender Cheese Fry' },
          { name: '赤いタルタルのチキン南蛮', price: '858円', image: '一品', description: 'Chicken Nanban with Red Tartar' },
          { name: '濃厚じゃがいものクリームニョッキ', price: '748円', image: '一品', description: 'Creamy Potato Gnocchi' },
          { name: '大エビフライ (3本)', price: '1,628円', image: '一品', description: 'Large Fried Shrimp (3 pcs)' },
          { name: '【期間限定】カキフライ (6個)', price: '1,738円', image: '一品', description: '[Limited] Fried Oyster (6 pcs)' },
        ],
      },
      {
        category: 'パスタ',
        items: [
          { name: '昔ながらのナポリタン', price: '1,078円', image: 'パスタ', imagePath: '/images/menu/26-01-29_069_2.jpg', description: 'Classic Napolitana' },
          { name: '濃厚カルボナーラ', price: '1,408円', image: 'パスタ', description: 'Rich Carbonara' },
          { name: 'バジル香るジェノベーゼパスタ', price: '1,408円', image: 'パスタ', description: 'Basil Pesto Pasta' },
          { name: 'たっぷりしらすのペペロンチーノ（昆布茶仕立て）', price: '1,408円', image: 'パスタ', description: 'Shirasu Peperoncino (Kombu Tea Style)' },
        ],
      },
      {
        category: 'サラダ',
        items: [
          { name: 'たこわさのポテトサラダ', price: '605円', image: 'サラダ', description: 'Octopus & Wasabi Potato Salad' },
          { name: '半熟卵のポテトサラダ', price: '605円', image: 'サラダ', description: 'Soft-boiled Egg Potato Salad' },
          { name: '温玉のせシーザーサラダ', price: '1,078円', image: 'サラダ', description: 'Caesar Salad with Soft Boiled Egg\n※温玉別皿対応可' },
          { name: '3種のチーズサラダ（サウザンドレッシング）', price: '1,188円', image: 'サラダ', description: '3 Cheese Salad (Thousand Island)' },
          { name: 'サーモンとアボカドのポキサラダ（ポキドレッシング）', price: '1,320円', image: 'サラダ', description: 'Salmon & Avocado Poke Salad (Poke Dressing)' },
        ],
      },
      {
        category: 'カレー＆リゾット',
        items: [
          { name: '自家製すじカレー', price: '1,375円', image: 'カレー', description: 'Homemade Beef Tendon Curry' },
          { name: '野菜の旨みキーマカレー', price: '1,265円', image: 'カレー', description: 'Vegetable Keema Curry' },
          { name: 'ベーコンと卵のクリームリゾット', price: '1,210円', image: 'カレー', description: 'Cream Risotto with Bacon & Egg' },
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
          { name: 'バニラアイス', price: '330円', image: 'デザート', description: 'Vanilla Ice Cream' },
          { name: '季節のシャーベット', price: '330円', image: 'デザート', description: 'Seasonal Sherbet' },
          { name: 'コーヒーゼリー', price: '330円', image: 'デザート', description: 'Coffee Jelly' },
          { name: 'ダッチベビー（ベリベリストロベリー or チョコチョコチョコ + ホイップクリーム・バニラ）', price: '1,408円', image: 'デザート', description: 'Dutch Baby (Berry Blister Berry or Choco + Whipped Cream & Vanilla)' },
          { name: 'ミニパフェ（コーンフレーク・バニラ・ホイップ ストロベリーソース or チョコソース）', price: '858円', image: 'デザート', description: 'Mini Parfait (Cornflake, Vanilla, Whipped Cream / Strawberry or Chocolate Sauce)' },
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
            imagePath: '/images/menu/26-01-29_116_2.jpg',
            description: 'House Hamburger 200g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢',
          },
          {
            name: 'チキンソテー 270g',
            price: '1,518円',
            image: 'ランチ',
            imagePath: '/images/menu/26-01-29_097_2.jpg',
            description: 'Chicken Saute 270g\nデミグラス／トマト／ホワイトチーズ／大根おろしポン酢／ジンジャー',
          },
          {
            name: 'ポークソテー 240g',
            price: '1,518円',
            image: 'ランチ',
            imagePath: '/images/menu/26-01-29_071_2.jpg',
            description: 'Pork Saute 240g\nデミグラス／トマト／ホワイトチーズ／ジンジャー',
          },
        ],
      },
      {
        category: '国産和牛ミスジステーキ',
        items: [
          { name: '国産和牛ミスジステーキ 100g', price: '1,320円', image: 'ランチ', description: 'Japanese Beef Misuji Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ミスジステーキ 200g', price: '2,640円', image: 'ランチ', description: 'Japanese Beef Misuji Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ミスジステーキ 300g', price: '3,960円', image: 'ランチ', description: 'Japanese Beef Misuji Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ミスジステーキ 450g', price: '5,940円', image: 'ランチ', description: 'Japanese Beef Misuji Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: '国産和牛ランプステーキ',
        items: [
          { name: '国産和牛ランプステーキ 100g', price: '1,650円', image: 'ランチ', imagePath: '/images/menu/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ランプステーキ 200g', price: '3,300円', image: 'ランチ', imagePath: '/images/menu/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ランプステーキ 300g', price: '4,950円', image: 'ランチ', imagePath: '/images/menu/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産和牛ランプステーキ 450g', price: '7,425円', image: 'ランチ', imagePath: '/images/menu/26-01-30_188_2%20(1).jpg', description: 'Japanese Beef Rump Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: '国産黒毛和牛サーロインステーキ',
        items: [
          { name: '国産黒毛和牛サーロインステーキ 100g', price: '1,980円', image: 'ランチ', description: 'Japanese Black Beef Sirloin Steak 100g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛サーロインステーキ 200g', price: '3,960円', image: 'ランチ', description: 'Japanese Black Beef Sirloin Steak 200g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛サーロインステーキ 300g', price: '5,940円', image: 'ランチ', description: 'Japanese Black Beef Sirloin Steak 300g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
          { name: '国産黒毛和牛サーロインステーキ 450g', price: '8,910円', image: 'ランチ', description: 'Japanese Black Beef Sirloin Steak 450g\nガーリック／甘辛鉄板／赤ワイン／刻みわさび醤油／ゆずこしょう' },
        ],
      },
      {
        category: 'フライ',
        items: [
          { name: '大エビフライ (3本)', price: '1,628円', image: 'ランチ', description: 'Large Fried Shrimp (3 pcs)' },
          { name: '鳥ささみのチーズピンク揚げ', price: '858円', image: 'ランチ', description: 'Chicken Tender Cheese Fry' },
          { name: '赤いタルタルのチキン南蛮', price: '858円', image: 'ランチ', description: 'Chicken Nanban with Red Tartar' },
          { name: '【期間限定】カキフライ (6個)', price: '1,738円', image: 'ランチ', description: '[Limited] Fried Oyster (6 pcs)' },
        ],
      },
      {
        category: 'パスタ',
        items: [
          { name: '昔ながらのナポリタン', price: '1,078円', image: 'ランチ', imagePath: '/images/menu/26-01-29_069_2.jpg', description: 'Classic Napolitana' },
          { name: '濃厚カルボナーラ', price: '1,408円', image: 'ランチ', description: 'Rich Carbonara' },
          { name: 'バジル香るジェノベーゼパスタ', price: '1,408円', image: 'ランチ', description: 'Basil Pesto Pasta' },
          { name: 'たっぷりしらすのペペロンチーノ（昆布茶仕立て）', price: '1,408円', image: 'ランチ', description: 'Shirasu Peperoncino (Kombu Tea Style)' },
        ],
      },
      {
        category: 'カレー＆リゾット',
        items: [
          { name: '自家製すじカレー', price: '1,375円', image: 'カレー', description: 'Homemade Beef Tendon Curry' },
          { name: '野菜の旨みキーマカレー', price: '1,265円', image: 'カレー', description: 'Vegetable Keema Curry' },
          { name: 'ベーコンと卵のクリームリゾット', price: '1,210円', image: 'カレー', description: 'Cream Risotto with Bacon & Egg' },
        ],
      },
      {
        category: 'ランチセット',
        items: [
          { name: '＋味噌汁', price: '55円', image: 'セット', description: 'Miso Soup' },
          { name: '＋味噌汁＋ミニサラダ', price: '165円', image: 'セット', description: 'Miso Soup + Mini Salad' },
          { name: '＋ライス（小／中／大）＋味噌汁', price: '110円', image: 'セット', description: 'Rice (S/M/L) + Miso Soup' },
          { name: '＋ライス（小／中／大）＋味噌汁＋ミニサラダ', price: '220円', image: 'セット', description: 'Rice (S/M/L) + Miso Soup + Mini Salad' },
          { name: 'パンセット：＋パン2個＋味噌汁', price: '110円', image: 'セット', description: 'Bread Set: + 2 Bread + Miso Soup' },
          { name: 'パンサラダセット：＋パン2個＋味噌汁＋ミニサラダ', price: '220円', image: 'セット', description: 'Bread & Salad Set: + 2 Bread + Miso\nSoup + Mini Salad' },
        ],
      },
    ]

    const dessertDrink: MenuCategory[] = [
      {
        category: 'ソフトドリンク',
        items: [
          { name: 'ウーロン茶', price: '330円', image: 'ドリンク', description: 'Oolong Tea (Iced)' },
          { name: '緑茶', price: '330円', image: 'ドリンク', description: 'Green Tea (Iced)' },
          { name: 'コーン茶', price: '330円', image: 'ドリンク', description: 'Corn Tea (Iced)' },
          { name: 'カルピス', price: '330円', image: 'ドリンク', description: 'Calpis (Iced)' },
          { name: 'コカ・コーラ', price: '330円', image: 'ドリンク', description: 'Coca-Cola (Iced)' },
          { name: 'メロンソーダ', price: '330円', image: 'ドリンク', description: 'Melon Soda (Iced)' },
          { name: 'ジンジャーエール', price: '330円', image: 'ドリンク', description: 'Ginger Ale (Iced)' },
          { name: 'オレンジジュース', price: '330円', image: 'ドリンク', description: 'Orange Juice (Iced)' },
          { name: 'アイスティー', price: '330円', image: 'ドリンク', description: 'Iced Tea' },
          { name: 'アイスコーヒー', price: '330円', image: 'ドリンク', description: 'Iced Coffee' },
          { name: 'カフェオレ', price: '330円', image: 'ドリンク', description: 'Cafe au Lait' },
          { name: 'ウーロン茶（ホット）', price: '330円', image: 'ドリンク', description: 'Oolong Tea (Hot)' },
          { name: '緑茶（ホット）', price: '330円', image: 'ドリンク', description: 'Green Tea (Hot)' },
          { name: '紅茶（ホット）', price: '330円', image: 'ドリンク', description: 'Black Tea (Hot)' },
          { name: 'コーヒー（ホット）', price: '330円', image: 'ドリンク', description: 'Coffee (Hot)' },
        ],
      },
      {
        category: 'フロート',
        items: [
          { name: '各種フロート ＋', price: '165円', image: 'ドリンク', description: 'Float Add-on (Add to soft drinks)' },
        ],
      },
    ]

    const drink: MenuCategory[] = [
      {
        category: 'ビール',
        items: [
          { name: 'サッポロ生ビール', price: '748円', image: 'ビール', description: 'Sapporo Draft Beer' },
          { name: '瓶ビール（赤星）', price: '858円', image: 'ビール', description: 'Bottle Beer (Akaboshi)' },
          { name: 'ノンアルコールビール', price: '748円', image: 'ビール', description: 'Non-Alcoholic Beer' },
        ],
      },
      {
        category: 'ウイスキー（デュワーズ）',
        items: [
          { name: 'ハイボール', price: '748円', image: 'ウイスキー', description: 'Highball' },
          { name: 'コークハイ', price: '748円', image: 'ウイスキー', description: 'Coke High' },
          { name: 'ジンジャーハイボール', price: '748円', image: 'ウイスキー', description: 'Ginger Highball' },
          { name: 'ホワイトボール', price: '770円', image: 'ウイスキー', description: 'Whiteball' },
        ],
      },
      {
        category: 'お茶割り（TEA BREAK）',
        items: [
          { name: 'ウーロンハイ', price: '638円', image: 'お茶割り', description: 'Oolong High' },
          { name: '緑茶ハイ', price: '638円', image: 'お茶割り', description: 'Green Tea High' },
          { name: 'コーン茶ハイ', price: '638円', image: 'お茶割り', description: 'Corn Tea High' },
        ],
      },
      {
        category: 'サワー',
        items: [
          { name: '酎ハイ', price: '605円', image: 'サワー', description: 'Chuhai' },
          { name: 'レモンサワー', price: '638円', image: 'サワー', description: 'Lemon Sour' },
          { name: 'ゆずサワー', price: '638円', image: 'サワー', description: 'Yuzu Sour' },
          { name: '男梅サワー', price: '638円', image: 'サワー', description: 'Otoko Ume Sour' },
          { name: 'クエン酸サワー', price: '638円', image: 'サワー', description: 'Citric Acid Sour' },
          { name: 'バイスサワー', price: '638円', image: 'サワー', description: 'Vice Sour' },
          { name: 'ライムサワー', price: '638円', image: 'サワー', description: 'Lime Sour' },
          { name: 'カルピスサワー', price: '660円', image: 'サワー', description: 'Calpis Sour' },
        ],
      },
      {
        category: 'ワイン',
        items: [
          { name: 'グラスワイン（赤）', price: '638円', image: 'ワイン', description: 'Glass Wine (Red)' },
          { name: 'グラスワイン（白）', price: '638円', image: 'ワイン', description: 'Glass Wine (White)' },
          { name: 'スパークリング（グラス）', price: '638円', image: 'ワイン', description: 'Sparkling (Glass)' },
          { name: 'ボトルワイン（赤）', price: '3,300円〜', image: 'ワイン', description: 'Bottle Wine (Red)\n※種類はスタッフまでお尋ねください', priceTiers: [{ excl: 3000, incl: 3300 }, { excl: 5000, incl: 5500 }, { excl: 10000, incl: 11000 }] },
          { name: 'ボトルワイン（白）', price: '3,300円〜', image: 'ワイン', description: 'Bottle Wine (White)\n※種類はスタッフまでお尋ねください', priceTiers: [{ excl: 3000, incl: 3300 }, { excl: 5000, incl: 5500 }, { excl: 10000, incl: 11000 }] },
        ],
      },
      {
        category: 'シャンパン',
        items: [
          { name: 'モエ・シャンドン 白', price: '11,000円', image: 'シャンパン', description: 'Moët & Chandon (White)' },
          { name: 'モエ・シャンドン ロゼ', price: '16,500円', image: 'シャンパン', description: 'Moët & Chandon (Rosé)' },
          { name: 'ドン・ペリニヨン 白', price: '55,000円', image: 'シャンパン', description: 'Dom Pérignon (White)' },
          { name: 'ドン・ペリニヨン ロゼ', price: '110,000円', image: 'シャンパン', description: 'Dom Pérignon (Rosé)' },
        ],
      },
      {
        category: '日本酒',
        items: [
          { name: '富貴（淡麗辛口）', price: '※価格はスタッフまでお尋ねください', image: '日本酒', description: 'Tuki (Dry)' },
          { name: '久保田', price: '※価格はスタッフまでお尋ねください', image: '日本酒', description: 'Kubota' },
          { name: '獺祭', price: '※価格はスタッフまでお尋ねください', image: '日本酒', description: 'Dassai' },
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

  return (
    <div className={`${styles.menu} ${(activeTab === 'dessertDrink' || activeTab === 'drink') ? styles.menuDrink : ''}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1>メニュー</h1>
          <p className={styles.heroSubtitle}>
            オーナーシェフが心を込めてお作りする、こだわりのメニューをご覧ください。
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

      {/* 表示：1つのJSX構造。PC/スマホのレイアウトは CSS @media (max-width: 768px) で切替 */}
      {menuCategories.map((category, index) => {
        // カテゴリ内にソース説明があるかチェック（「／」が含まれている場合はソース説明と判断）
        const hasSauceItems = category.items.some(item => item.description && item.description.includes('／'))
        return (
          <section key={index} className={styles.categorySection}>
            <div className="container">
              <h2 className={styles.categoryTitle}>{category.category}</h2>
              <div className={styles.categoryNotes}>
                {hasSauceItems ? (
                  category.category === '国産黒毛和牛サーロインステーキ' || 
                  category.category === '国産和牛ミスジステーキ' || 
                  category.category === '国産和牛ランプステーキ' ? (
                    <>
                      <span></span>
                      <span className={styles.categoryNoteRight}>※ソースは各種類から選べます。※メニューの写真や動画はイメージ図となります。※ステーキの画像は200gを使用しております。</span>
                    </>
                  ) : category.category === 'メイン' ? (
                    <>
                      <span></span>
                      <span className={styles.categoryNoteRight}>※ソースは各種類から選べます。※メニューの写真や動画はイメージ図となります。</span>
                    </>
                  ) : (
                    <>
                      <span className={styles.categoryNoteLeft}>※ソースは各種類から選べます。</span>
                      <span className={styles.categoryNoteRight}>※メニューの写真や動画はイメージ図となります。</span>
                    </>
                  )
                ) : (
                  <>
                    <span></span>
                    <span className={styles.categoryNoteRight}>※メニューの写真や動画はイメージ図となります。</span>
                  </>
                )}
              </div>
              <div className={styles.menuGrid}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.menuItem}>
                  <div className={styles.menuImage}>
                    {item.imagePath ? (
                      <img src={item.imagePath} alt={item.name} className={styles.menuCardImage} loading="lazy" decoding="async" />
                    ) : item.videoSrc ? (
                      <video
                        src={item.videoSrc}
                        controls
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <p>{item.image ?? 'メニュー'}</p>
                    )}
                  </div>

                  <div className={styles.menuContent}>
                    <h3>{formatMenuName(item.name)}</h3>
                    {item.description ? <p className={styles.description} style={{
                      whiteSpace: 'pre-line',
                      ...(category.category === 'メイン' && (item.name.includes('チキンソテー') || item.name.includes('ポークソテー')) ? { marginTop: '3rem' } :
                        category.category === 'メイン' && item.name.includes('当店自慢の自家製ハンバーグ') ? { marginTop: '1rem' } :
                        category.category === 'メイン' && item.name.includes('カモソテー') ? { marginTop: '3rem' } : {}),
                    }}>{item.description}</p> : null}
                    <div className={styles.priceContainer}>
                      {(() => {
                        // 3段階価格（ボトルワインなど）：一番下の赤い値段形式で3種類表示
                        if (item.priceTiers && item.priceTiers.length > 0) {
                          return (
                            <div className={styles.priceTiersWrapper}>
                              {item.priceTiers.map((tier, i) => (
                                <div key={i} className={styles.priceWrapper}>
                                  <span className={styles.priceExcludingTax}>
                                    {tier.excl.toLocaleString()}円（税抜）
                                  </span>
                                  <span className={styles.price}>
                                    {tier.incl.toLocaleString()}円（税込）
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        }
                        // 通常：価格から数値を抽出（カンマと「円」を除去）
                        const priceMatch = item.price.match(/[\d,]+/)
                        if (priceMatch) {
                          const priceWithTax = parseInt(priceMatch[0].replace(/,/g, ''), 10)
                          const priceExcludingTax = Math.round(priceWithTax / 1.1)
                          return (
                            <div className={styles.priceWrapper}>
                              <span className={styles.priceExcludingTax}>
                                {priceExcludingTax.toLocaleString()}円（税抜）
                              </span>
                              <span className={styles.price}>
                                {priceWithTax.toLocaleString()}円（税込）
                              </span>
                            </div>
                          )
                        }
                        return <span className={styles.price}>{item.price}</span>
                      })()}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className={styles.note}>
        <div className="container">
          <p className={styles.noteText}>
            ※当店の牛・豚・米は１００％国産になります。<br />
            ※価格は税抜き価格と税込み価格を併記しています。<br />
            ※メニューは季節により変更になる場合がございます。<br />
            ※アレルギーに関するお問い合わせは、お気軽にスタッフまでお尋ねください。
          </p>
        </div>
      </section>
    </div>
  )
}
