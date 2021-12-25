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

interface propOptions {
  spellCheck?: true | false
  autoCapitalize?: 'none' | 'one' | 'words' | 'sentences' | 'characters'
}

const useThaanaInput = (options?: propOptions) => {
  const [value, setText] = useState('')
  const [pos, setPos] = useState(-1)

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // maintain cursor position when char is inserted in middle of text
    if (pos) ref.current?.setSelectionRange(pos, pos)
  }, [pos, value])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // maintain cursor position when last char is removed with backspace
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

  options = {
    spellCheck: false,
    autoCapitalize: 'none',
  }

  return {
    props: { onChange, onKeyDown, value, ...options, ref, type: 'text' },
    setText,
  }
}

export default useThaanaInput
