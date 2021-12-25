import { FC, useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useThaana from 'utils/useThaanaInput'

export const SearchFormWrap = styled.section`
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

  const { thaanaProps, setThaanaText } = useThaana()

  const [searchText, setSearchText] = useState('')
  const [isDv, setIsDv] = useState(false)

  useEffect(() => {
    setSearchText((router.query.office as string) || '')
  }, [router.query.office])

  useEffect(() => {
    router.push(searchText ? `/?office=${searchText}` : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    setSearchText(thaanaProps.value)
  }, [thaanaProps.value])

  return (
    <SearchFormWrap>
      <button
        onClick={() => {
          setIsDv(!isDv)
          setThaanaText('')
          setSearchText('')
        }}
      >
        <strong> {isDv ? 'Dhivehi' : 'English'}</strong>
      </button>
      <h2>Search</h2>
      <label htmlFor='office'>Office</label>
      {isDv ? (
        <input {...thaanaProps} />
      ) : (
        <input
          dir='ltr'
          id='office'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      <label htmlFor=''>Job Title</label>
      <input dir='ltr' type="text" />
    </SearchFormWrap>
  )
}

export default SearchForm
