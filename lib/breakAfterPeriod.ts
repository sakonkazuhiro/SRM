/**
 * 「。」の直後に改行を入れ、見やすい記載にする。
 * 今後も本文表示でこの関数を通すと、句点のあとで改行されます。
 */
export function breakAfterPeriod(text: string): string {
  return text.replace(/。/g, '。\n')
}
