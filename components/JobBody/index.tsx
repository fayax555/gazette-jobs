import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'
import { Listing } from 'types'
import { JobBodyWrapper } from './style'

const JobBody: FC<Listing> = ({ contentHtml }) => {
  return (
    <JobBodyWrapper>
      <Link href={'/'}>Home</Link>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </JobBodyWrapper>
  )
}

export default JobBody
