import { FC } from 'react'
import { Listing } from 'types'
import { JobBodyWrapper } from './style'

const JobBody: FC<Listing> = ({ contentHtml }) => {
  return (
    <JobBodyWrapper>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </JobBodyWrapper>
  )
}

export default JobBody
