import Link from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  > a {
    font-size: 1.75rem;
  }
`

interface Props {}

const Index: FC<Props> = () => {
  return (
    <Wrapper>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </Wrapper>
  )
}

export default Index
