import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

const recipientEmail = 'hoshi.syo@gmail.com' // ホシのキッチンのメールアドレス

// 個人情報保護: お問い合わせ内容はメール送信のみに使用し、DB・ファイル・サーバーログには保存しません。

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

    // 1) Gmail SMTP が設定されていればこちらを使用（お店のGmailに確実に届く）
    const gmailUser = process.env.GMAIL_USER || recipientEmail
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      })

      await transporter.sendMail({
        from: `ホシのキッチン <${gmailUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: '【ホシのキッチン】お問い合わせ',
        text: emailBody,
      })

      return NextResponse.json(
        { message: 'お問い合わせを受け付けました。' },
        { status: 200 }
      )
    }

    // 2) Resend が設定されていればこちらを使用
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error(
        'メール送信の設定がありません。.env.local に GMAIL_APP_PASSWORD または RESEND_API_KEY を設定してください。'
      )
      return NextResponse.json(
        { error: 'メール送信の設定が完了していません。しばらくしてから再度お試しください。' },
        { status: 503 }
      )
    }

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: 'ホシのキッチン <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: '【ホシのキッチン】お問い合わせ',
      text: emailBody,
    })

    if (error) {
      console.error('Resend 送信エラー:', (error as { message?: string; name?: string })?.message ?? error)
      return NextResponse.json(
        { error: '送信に失敗しました。しばらくしてから再度お試しください。' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'お問い合わせを受け付けました。' },
      { status: 200 }
    )
  } catch (error) {
    console.error('お問い合わせ送信エラー:', error instanceof Error ? error.message : 'Unknown')
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}
