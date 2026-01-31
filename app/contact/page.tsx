'use client'

import { useState, FormEvent } from 'react'
import styles from './page.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // バリデーション
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('すべての項目を入力してください。')
      setIsSubmitting(false)
      return
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('正しいメールアドレスを入力してください。')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '送信に失敗しました。しばらくしてから再度お試しください。')
        return
      }
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setError('送信に失敗しました。しばらくしてから再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (isSubmitted) {
    return (
      <div className={styles.contactPage}>
        <section className={styles.hero}>
          <div className="container">
            <h1>お問い合わせ</h1>
          </div>
        </section>

        <section className={styles.successSection}>
          <div className="container">
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h2>送信完了</h2>
              <p>
                お問い合わせありがとうございます。<br />
                内容を確認次第、ご連絡させていただきます。
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className={styles.backButton}
              >
                もう一度送信する
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={styles.contactPage}>
      <section className={styles.hero}>
        <div className="container">
          <h1>お問い合わせ</h1>
          <p className={styles.heroSubtitle}>ご質問やご要望がございましたら、お気軽にお問い合わせください</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                お名前 <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="山田 太郎"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                メールアドレス <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                お問い合わせ内容 <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows={8}
                placeholder="お問い合わせ内容をご記入ください"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
