import { FC, useRef, useState, useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;

  input {
    margin-top: 5rem;
    display: block;
    padding: 0.75rem 1rem;
    font-size: 2rem;
    width: 100%;
  }

  button {
    margin-top: 1rem;
    display: block;
    padding: 0.75rem 1rem;
    font-size: 2rem;
    width: 100%;
  }
`

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

interface Props {}

const Thaana: FC<Props> = () => {
  const [text, setText] = useState('')
  const [pos, setPos] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (pos) {
      // maintain cursor position
      inputRef.current?.setSelectionRange(pos, pos)
    }
  }, [pos])

  const props = {
    ref: inputRef,
    type: 'text',
    value: text,
    dir: 'rtl',
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value
      .split('')
      .map((char: string) => keyMap[char] || char)
      .join('')

    setText(txt)

    const p = e.target.selectionStart
    if (p) setPos(p)
  }

  return (
    <Wrapper>
      <input {...props} onChange={handleChange} />
    </Wrapper>
  )
}

export default Thaana
