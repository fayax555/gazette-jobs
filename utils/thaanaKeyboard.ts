export const thaanaKeyboard = (target: EventTarget & HTMLInputElement) => {
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

  let { selectionStart, selectionEnd } = target

  selectionStart = 1
  selectionEnd = 1
  console.log({ selectionStart, selectionEnd })

  const txt = target.value
    .split('')
    .map((char: string) => keyMap[char] || char)
    .join('')
  console.log(target)

  // console.log(txt)

  return txt
}
