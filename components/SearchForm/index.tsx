import { FC, useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import useThaana from 'utils/useThaanaInput'
import { SearchFormWrap } from './style'

interface Props {}

const SearchForm: FC<Props> = () => {
  const router = useRouter()

  const { props: dvOfficeProps, setText: setDvoffice } = useThaana()
  const { props: dvTitleProps, setText: setDvTitle } = useThaana()

  const [isDv, setIsDv] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [titleText, setTitleText] = useState('')

  useEffect(() => {
    setSearchText((router.query.office as string) || '')
  }, [router.query.office])

  useEffect(() => {
    router.push(searchText ? `/?office=${searchText}` : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText])

  useEffect(() => {
    setSearchText(dvOfficeProps.value)
  }, [dvOfficeProps.value])

  console.log(titleText)

  return (
    <SearchFormWrap>
      <button
        onClick={() => {
          setIsDv(!isDv)
          setDvoffice('')
          setSearchText('')
        }}
      >
        <strong> {isDv ? 'Dhivehi' : 'English'}</strong>
      </button>
      <h2>Search</h2>
      <label htmlFor='office'>Office</label>
      {isDv ? (
        <input id='office' />
      ) : (
        <input
          dir='ltr'
          id='office'
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      )}
      <label htmlFor='title'>Job Title</label>
      <input {...dvTitleProps} />
    </SearchFormWrap>
  )
}

export default SearchForm
