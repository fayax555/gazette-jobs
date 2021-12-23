import styled, { css } from 'styled-components'

interface Retracted {
  retracted: boolean
}

// if the job post is 'ބާތިލްކުރެވިފައި'/'retracted', it will be grayed out
// const retractStyle = (props: Retracted, c?: string) =>
//   props.retracted ? '#ccc' : c || '#000'

const retractStyle = css<Retracted>`
  color: ${({ retracted }) => (retracted ? '#ccc' : '#000')};
`

export const Wrapper = styled.div<Retracted>`
  border: 1px solid #888;
  padding: 2.5rem;
  border-radius: 0.5rem;

  > div {
    > span:nth-child(1) {
      font-size: 1.75rem;
      ${retractStyle}
    }

    > span:nth-child(2) {
      color: ${({ retracted }) => (retracted ? '#ccc' : '#555')};
      font-size: 1.25rem;
    }
  }

  > a {
    font-size: 2.25rem;
    padding-top: 0.75em;
    display: block;
    ${retractStyle}

    &:hover {
      color: #161691;
      text-decoration: underline;
    }
  }

  .retracted {
    color: red;
    margin: 0;
    padding-top: 0.5rem;
    text-align: center;
    font-size: 1.2rem;
  }
`
