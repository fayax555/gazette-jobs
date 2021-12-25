import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

const keyMap = {
  q: 'ް',
  w: 'އ',
  e: 'ެ',
  r: 'ރ',
  t: 'ތ',
  y: 'ޔ',
  u: 'ު',
  i: 'ި',
  o: 'ޮ',
  p: 'ޕ',
  a: 'ަ',
  s: 'ސ',
  d: 'ދ',
  f: 'ފ',
  g: 'ގ',
  h: 'ހ',
  j: 'ޖ',
  k: 'ކ',
  l: 'ލ',
  z: 'ޒ',
  x: '×',
  c: 'ޗ',
  v: 'ވ',
  b: 'ބ',
  n: 'ނ',
  m: 'މ',
  Q: 'ޤ',
  W: 'ޢ',
  E: 'ޭ',
  R: 'ޜ',
  T: 'ޓ',
  Y: 'ޠ',
  U: 'ޫ',
  I: 'ީ',
  O: 'ޯ',
  P: '÷',
  A: 'ާ',
  S: 'ށ',
  D: 'ޑ',
  F: 'ﷲ',
  G: 'ޣ',
  H: 'ޙ',
  J: 'ޛ',
  K: 'ޚ',
  L: 'ޅ',
  Z: 'ޡ',
  X: 'ޘ',
  C: 'ޝ',
  V: 'ޥ',
  B: 'ޞ',
  N: 'ޏ',
  M: 'ޟ',
  ',': '،',
  ';': '؛',
  '?': '؟',
  '<': '>',
  '>': '<',
  '[': ']',
  ']': '[',
  '(': ')',
  ')': '(',
  '{': '}',
  '}': '{',
} as { [key: string]: string }

const useThaanaInput = () => {
  const [value, setText] = useState('')
  const [pos, setPos] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // maintain cursor position
    if (pos) inputRef.current?.setSelectionRange(pos, pos)
  }, [pos, value])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // when the last character is deleted, the cursor should be at the beginning (pos = 0) instead of pos = 1
    if (e.key === 'Backspace' && pos === 1) setPos(0)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value
      .split('')
      .map((char: string) => keyMap[char] || char)
      .join('')

    setText(txt)

    const p = e.target.selectionStart

    if (p) setPos(p)
  }

  return {
    props: { onChange, onKeyDown, value, type: 'text', ref: inputRef },
    setText,
  }
}

export default useThaanaInput