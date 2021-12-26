import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import useThaana from 'utils/useThaana'
import type { OfficeName } from 'types'

const Wrapper = styled.section`
  border: 2px solid #0e65c9;
  text-align: center;
  padding: 1rem;
  margin-top: 1rem;

  input,
  label {
    display: block;
    width: 100%;
  }

  input {
    padding: 0.75rem 1rem;
    font-size: 1.5rem;
  }

  button {
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

const BlackListedOffices = styled.div`
  border: 2px solid #0e65c9;
  margin: 1rem 0;
  > h4 {
    font-weight: bold;
  }
`

interface Props {
  officeNames: OfficeName
  blackList: string[]
  setBlackList: Dispatch<SetStateAction<string[]>>
}

const Index: FC<Props> = ({ officeNames, blackList, setBlackList }) => {
  const { props: officeProps, setText: setOffice } = useThaana()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const officeNameList = Object.entries(officeNames).flat()
    const val = officeProps.value.toLocaleLowerCase().trim()

    if (!officeNameList.includes(val)) {
      alert('Office does not exist')
      return
    }

    setBlackList([...new Set([...blackList, val])])
    setOffice('')
  }

  return (
    <Wrapper>
      <h3>BlackList Office</h3>
      <BlackListedOffices>
        <h4>Office Names</h4>
        <ul>
          {blackList.map((office) => (
            <li key={office}>{office}</li>
          ))}
        </ul>
      </BlackListedOffices>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Office Name
          <input {...officeProps} />
        </label>
        <button type='submit'>Add</button>
      </form>
    </Wrapper>
  )
}

export default Index
