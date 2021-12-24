import { FC } from 'react'
import styled from 'styled-components'
import useThaana from 'utils/useThaanaInput'

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

interface Props {}

const Thaana: FC<Props> = () => {
  const inputProps = useThaana()

  return (
    <Wrapper>
      <input {...inputProps} />
    </Wrapper>
  )
}

export default Thaana
