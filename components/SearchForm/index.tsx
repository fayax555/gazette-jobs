import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useThaana from 'utils/useThaana'
import { SearchFormWrap } from './style'

interface QueryObj {
  [key: string]: string | undefined
}

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

    const getQuery = (): QueryObj => {
      if (searchText) return { ...router.query, office: searchText, title }
      if (title || office) return { ...router.query, title, office }
      return {}
    }

    const query: QueryObj = {}
    // remove empty query params
    for (const key in getQuery()) {
      if (getQuery()[key]) query[key] = getQuery()[key]
    }

    router.push({ query })

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
      <label>
        Office
        {isDv ? (
          <input {...dvOfficeProps} />
        ) : (
          <input
            dir='ltr'
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
      </label>

      <label>
        Job Title
        <input {...dvTitleProps} />
      </label>
    </SearchFormWrap>
  )
}

export default SearchForm
