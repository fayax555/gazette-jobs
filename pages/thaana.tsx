import { FC, useState } from 'react'
import styled from 'styled-components'
import { thaanaKeyboard } from 'utils/thaanaKeyboard'

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
`

interface Props {}

const Thaana: FC<Props> = () => {
  const [text, setText] = useState('')

  return (
    <Wrapper>
      <input
        // dir='ltr'
        type='text'
        value={text}
        onChange={(e) => setText(thaanaKeyboard(e.target))}
      />
    </Wrapper>
  )
}

export default Thaana
