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
                  {breakAfterPeriod('はじめまして。ホシのキッチン、オーナーシェフの星翔です。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('この度は、ホシのキッチンのホームページをご覧いただき、誠にありがとうございます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('おかげさまで、2025年2月5日のオープンから4か月を迎えようとしております。日々たくさんのお客様にご来店いただき、心より感謝申し上げます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('私はこれまで、浅草の老舗洋食店「モンブラン」や「神谷バー」などで経験を積み、長年レストランの現場で料理と向き合ってまいりました。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('その中で強く感じてきたのは、料理はただ“食べるもの”ではなく、人を笑顔にし、心を温かくできる力があるということです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ホシのキッチンでは、ステーキや洋食を中心に、一皿一皿を丁寧に、真心を込めてお作りしております。美味しさはもちろん、「また来たい」と思っていただけるような、温かい空間づくりも大切にしております。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ご家族、ご友人、大切な方とのお食事。お仕事帰りのひと息。皆さまの日常の中で、少しでもホッとできる場所になれましたら幸いです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('これからも新しいメニューや季節限定メニューにも挑戦しながら、皆さまに楽しんでいただけるお店を目指してまいります。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ぜひお気軽に、ホシのキッチンへお立ち寄りください。皆さまのご来店を、心よりお待ちしております。')}
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
              <h2 className={styles.role}>店長より</h2>
              <div className={styles.messageText}>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('こんにちは。ホシのキッチン 店長でございます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('この度は、当店のホームページをご覧いただき、誠にありがとうございます。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('オープンから4か月。少しずつではありますが、地域のお客様をはじめ、多くのお客様に足を運んでいただけるようになりました。スタッフ一同、日々感謝の気持ちでいっぱいです。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('ホシのキッチンでは、お料理だけでなく、お店で過ごしていただく時間も大切にしております。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('「また来たい」「なんだか落ち着く」そう感じていただけるよう、温かい接客と居心地の良い空間づくりを心がけております。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('お一人様でも、ご家族でも、ご友人同士でも。どなたでも気軽に立ち寄れる、地域に愛される洋食レストランを目指しております。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('これからもスタッフ一同、笑顔と感謝を忘れず、お客様をお迎えしてまいります。')}
                </p>
                <p className="breakAfterPeriod">
                  {breakAfterPeriod('皆さまのご来店を、心よりお待ちしております。')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

