import { FC } from 'react'
import { Listing } from 'types'
import styled from 'styled-components'

const JobBody = ({ contentHtml }: Listing) => {
  return (
    <JobBodyWrapper>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </JobBodyWrapper>
  )
}

const JobBodyWrapper = styled.div`
  font-size: 1.8rem;
  color: #111;
`

export default JobBody
