import { FC, useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import useThaana from 'utils/useThaana'
import { SearchFormWrap } from './style'

interface Props {}

const SearchForm: FC<Props> = () => {
  const router = useRouter()

  const { props: dvOfficeProps, setText: setDvOffice } = useThaana()
  const { props: dvTitleProps, setText: setDvTitle } = useThaana()

  const [isDv, setIsDv] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText((router.query.office as string) || '')
  }, [router.query.office])

  useEffect(() => {
    const title = dvTitleProps.value
    const office = dvOfficeProps.value

    const getQuery = () => {
      if (searchText && title) return { office: searchText, title }
      if (office && title) return { office, title }
      if (searchText) return { office: searchText }
      if (office) return { office }
      if (title) return { title }
      return {}
    }

    router.push({ query: getQuery() })

    // 'router' dep should not be included even if eslint is complaining
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dvOfficeProps.value, dvTitleProps.value, searchText])

  useEffect(() => {
    setSearchText(dvOfficeProps.value)
  }, [dvOfficeProps.value])

  return (
    <SearchFormWrap>
      <button
        onClick={() => {
          setIsDv(!isDv)
          setDvOffice('')
          setSearchText('')
          setDvTitle('')
        }}
      >
        <strong> {isDv ? 'Dhivehi' : 'English'}</strong>
      </button>
      <h2>Search</h2>
      <label htmlFor='office'>Office</label>
      {isDv ? (
        <input id='office' {...dvOfficeProps} />
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
