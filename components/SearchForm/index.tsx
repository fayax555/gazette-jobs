import { FC, useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export const SearchFormWrap = styled.form`
  text-align: center;
  border: 2px solid #0e65c9;
  padding: 1rem;
  height: 40rem;

  input {
    display: block;
    padding: 0.75rem 1rem;
    font-size: 1.5rem;
    width: 100%;
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

interface Props {}

const SearchForm: FC<Props> = () => {
  const router = useRouter()

  const [searchText, setText] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    router.push(`/?office=${searchText}`)
    console.log('submit')
  }

  console.log(searchText)

  useEffect(() => {
    setText((router.query.office as string) || '')
  }, [router.query.office])

  return (
    <SearchFormWrap onSubmit={handleSubmit}>
      <h2>Search</h2>
      <label htmlFor='office'>Office</label>
      <input
        id='office'
        type='text'
        value={searchText}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Search</button>
    </SearchFormWrap>
  )
}

export default SearchForm
