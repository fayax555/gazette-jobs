import Link from 'next/link'
import styled from 'styled-components'

interface Props {}

const Navbar = () => {
  return (
    <Wrapper>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;

  > a {
    font-size: 1.75rem;
  }
`

export default Navbar
