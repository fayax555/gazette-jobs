import styled from 'styled-components'

export const SearchFormWrap = styled.section`
  text-align: center;
  border: 2px solid #0e65c9;
  padding: 1rem;
  /* height: 32rem; */

  label {
    margin-top: 1rem;
    width: 100%;
  }

  input {
    display: block;
    padding: 0.75rem 1rem;
    width: 100%;
    font-size: 1.5rem;
  }

  > button {
    margin-top: 2rem;
    display: block;
    padding: 0.75rem 1rem;
    font-size: 1.5rem;
    width: 100%;
    background: #0e65c9;
    color: #fff;
    border: none;
    border-radius: 0.5rem;

    &:hover {
      background: #4b729e;
      color: #fff;
    }
  }
`
