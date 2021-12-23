import styled, { css } from 'styled-components'

interface Retracted {
  retracted: boolean
}

// if the job post is 'ބާތިލްކުރެވިފައި'/'retracted', it will be grayed out
const retractStyle = (props: Retracted, color = '#000') =>
  props.retracted ? '#ccc' : color

export const Wrapper = styled.div<Retracted>`
  border: 1px solid #888;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  max-width: 55rem;
  margin-bottom: 1.5rem;

  > div {
    > a {
      font-size: 1.5rem;
      color: ${(p) => retractStyle(p, '#102d7c')};
    }

    > span {
      color: ${(p) => retractStyle(p, '#555')};
      font-size: 1.25rem;
    }
  }

  > a {
    font-size: 1.75rem;
    padding-top: 0.75em;
    display: block;
    color: ${retractStyle};

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
