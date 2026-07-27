import styles from './page.module.css'
import { ClickableImage } from '@/components/ImageLightbox'
import { breakAfterPeriod } from '@/lib/breakAfterPeriod'

export default function Message() {
  return (
    <div className={styles.message}>
      <section className={styles.hero}>
        <div className="container">
          <h1>オーナーシェフの言葉</h1>
          <p className={`${styles.heroSubtitle} breakAfterPeriod`}>
            {breakAfterPeriod('オーナーシェフと店長から、お客様への想いをお伝えします。')}
          </p>
        </div>
      </section>

      <section className={styles.messages}>
        <div className="container">
          <div className={styles.messageCard}>
            <div className={styles.messageImage}>
              <ClickableImage
                src="/images/owner/S__21241893.jpg"
                alt="オーナーシェフ 星 翔"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.messageContent}>
              <h2 className={styles.role}>オーナーシェフ 星 翔</h2>
              <div className={styles.messageText}>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('はじめまして。ホシのキッチン オーナーシェフの 星 翔です。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('この度は、ホシのキッチンのホームページをご覧いただき、誠にありがとうございます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('おかげさまで、2026年2月5日のオープンから、まもなく半年を迎えます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('この半年間、本当にたくさんのお客様との出会いがありました。')}
                </p>
                <p className={styles.customerQuotes}>
                  「美味しかったよ。」
                  <br />
                  「また来るね。」
                  <br />
                  「家族を連れてきました。」
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('そんな何気ない一言が、私たちにとって何よりの励みです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('支えてくださる皆さまのおかげで、この半年を迎えられることに心より感謝申し上げます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('私はこれまで、浅草の老舗洋食店「モンブラン」などで経験を積み、長年料理と向き合ってきました。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('その中で強く感じたのは、料理には人を笑顔にし、幸せな時間をつくる力があるということです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ホシのキッチンでは、その想いを一皿一皿に込めています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('国産牛100％のハンバーグ、ステーキ、昔ながらの洋食。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('どの料理も、「美味しかった」で終わるのではなく、「また食べたい」「また来たい」と思っていただける一皿を目指して、毎日丁寧にお作りしています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('そして、料理だけでなく、お客様がほっとできる温かい空間づくりも大切にしています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ご家族との楽しい時間。恋人との大切なひととき。お仕事帰りのご褒美。一人でゆっくり過ごす時間。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('そのどれもが、皆さまにとって少しでも特別な時間になれば、これ以上嬉しいことはありません。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('半年という節目を迎えられたのは、皆さまのおかげです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('だからこそ、ここで満足することなく、これからも新メニューや季節限定メニューに挑戦し、より美味しく、より居心地の良いお店を目指してまいります。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('「入谷で洋食ならホシのキッチン」')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('そう思っていただけるお店になれるよう、スタッフ一同、真心を込めて皆さまをお迎えいたします。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('これからもホシのキッチンを、どうぞよろしくお願いいたします。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('半年の感謝を込めて、期間限定のイベントや新メニューもご用意しております。ぜひこの機会にホシのキッチンへお越しください。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('皆さまのご来店を心よりお待ちしております。')}
                </p>
                <p className={styles.signature}>
                  ホシのキッチン
                  <br />
                  オーナーシェフ　星 翔
                </p>
              </div>
            </div>
          </div>

          <div className={styles.messageCard}>
            <div className={styles.messageImage}>
              <ClickableImage
                src="/images/owner/S__127123459.jpg"
                alt="店長"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.messageContent}>
              <h2 className={styles.role}>店長</h2>
              <div className={styles.messageText}>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('はじめまして。ホシのキッチン店長です。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('いつもホシのキッチンをご利用いただき、本当にありがとうございます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('おかげさまで、ホシのキッチンはオープンから半年という節目を迎えようとしています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('この半年間、多くのお客様と出会い、「美味しかった」「また来ます」という温かいお言葉をいただくたびに、この仕事の喜びを改めて感じています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ホシのキッチンは、美味しい料理をお届けすることはもちろんですが、「また帰ってきたくなるお店」でありたいと考えています。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('初めてご来店されるお客様にも、常連のお客様にも、心地よくお過ごしいただけるよう、スタッフ一人ひとりが笑顔と真心を大切にしながら、お迎えしております。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('料理の美味しさはもちろん、接客やお店の雰囲気も含めて、「今日はホシのキッチンに来て良かった」と思っていただけることが、私たちの何よりの喜びです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('これからもスタッフ一同、力を合わせながら、皆さまに愛されるお店を目指してまいります。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ご来店の際には、おすすめのメニューや季節限定メニューなどもお気軽にお声掛けください。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('皆さまとお会いできることを、スタッフ一同、心より楽しみにしております。')}
                </p>
                <p className={styles.signature}>
                  ホシのキッチン
                  <br />
                  店長
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

