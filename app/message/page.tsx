import styles from './page.module.css'

export default function Message() {
  return (
    <div className={styles.message}>
      <section className={styles.hero}>
        <div className="container">
          <h1>オーナーシェフの言葉</h1>
          <p className={styles.heroSubtitle}>
            オーナーシェフと店長から、お客様への想いをお伝えします。
          </p>
        </div>
      </section>

      <section className={styles.messages}>
        <div className="container">
          <div className={styles.messageCard}>
            <div className={styles.messageImage}>
              <div className={styles.placeholderImage}>
                <p>オーナーシェフ<br />星 翔</p>
              </div>
            </div>
            <div className={styles.messageContent}>
              <h2 className={styles.role}>オーナーシェフ 星 翔</h2>
              <div className={styles.messageText}>
                <p>
                  はじめまして、オーナーシェフの星翔と申します。
                  この度は「ホシのキッチン」のホームページにお越しいただき、誠にありがとうございます。
                </p>
                <p>
                  私は長年、レストランで料理を作り続けてまいりました。
                  その中で感じたのは、料理を通じてお客様の笑顔を作りたい、そして、お客様の大切な時間をより良いものにしたいという想いでした。
                </p>
                <p>
                  「ホシのキッチン」では、ひとつひとつの料理に真心を込めてお作りしています。
                  厳選した食材を丁寧に調理し、お客様に美味しさと喜びを届けたいと考えております。
                </p>
                <p>
                  レストランという場所は、単に食事をするだけの場所ではありません。
                  家族や友人、恋人、同僚など、大切な人との時間を共有する特別な場所でもあります。
                  そのような特別な時間を、私たちの料理が少しでも彩ることができれば、これ以上の喜びはございません。
                </p>
                <p>
                  日々、技術を磨き、新しいメニューにも挑戦し続けております。
                  ぜひ一度、ホシのキッチンにお越しください。
                  お会いできることを、心よりお待ちしております。
                </p>
              </div>
            </div>
          </div>

          <div className={styles.messageCard}>
            <div className={styles.messageImage}>
              <div className={styles.placeholderImage}>
                <p>店長</p>
              </div>
            </div>
            <div className={styles.messageContent}>
              <h2 className={styles.role}>店長より</h2>
              <div className={styles.messageText}>
                <p>
                  こんにちは。ホシのキッチンの店長でございます。
                  この度は、当店のホームページをご覧いただき、ありがとうございます。
                </p>
                <p>
                  私たちのレストランは、お客様一人ひとりを大切にし、温かくおもてなしをさせていただくことを心がけております。
                  忙しい日常の中、ホシのキッチンに立ち寄っていただいた時間が、お客様にとってのひとときの安らぎとなり、元気を取り戻していただける場所であればと願っております。
                </p>
                <p>
                  オーナーシェフが心を込めて作る料理と、スタッフ一同の笑顔で、お客様をお迎えさせていただきます。
                  何かご不明な点やご要望がございましたら、いつでもお気軽にお声がけください。
                </p>
                <p>
                  皆様のご来店を、心よりお待ちしております。
                  どうぞ、お気軽にお立ち寄りください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

