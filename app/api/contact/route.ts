import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'すべての項目を入力してください。' },
        { status: 400 }
      )
    }

    // メール送信処理
    // 実際のメール送信にはnodemailerやSendGridなどのサービスを使用
    // ここでは送信先メールアドレスを設定
    const recipientEmail = 'hoshi.syo@gmail.com' // ホシのキッチンのメールアドレス
    
    // メール本文を作成
    const emailBody = `
お問い合わせがありました。

【お名前】
${name}

【メールアドレス】
${email}

【お問い合わせ内容】
${message}

---
このメールは「ホシのキッチン」のお問い合わせフォームから送信されました。
`

    // 実際のメール送信処理はここに実装
    // 例: nodemailerを使用する場合
    // const transporter = nodemailer.createTransport({...})
    // await transporter.sendMail({
    //   from: email,
    //   to: recipientEmail,
    //   subject: '【ホシのキッチン】お問い合わせ',
    //   text: emailBody,
    // })

    // 開発環境ではコンソールに出力（本番環境では削除）
    console.log('=== お問い合わせメール ===')
    console.log(`送信先: ${recipientEmail}`)
    console.log(emailBody)

    return NextResponse.json(
      { message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    )
  } catch (error) {
    console.error('お問い合わせ送信エラー:', error)
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}
