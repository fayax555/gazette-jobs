import type { NextPage, GetStaticProps } from 'next'
import { connectToDatabase } from 'utils/mongodb'
import styled from 'styled-components'
import JobItem from 'components/JobItem'
import type { JobListItem } from 'types'

export const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0.75rem;

  display: grid;
  gap: 2rem;
`

interface Props {
  jobList: JobListItem[]
}

const Home: NextPage<Props> = ({ jobList }) => {
  console.log(jobList)

  return (
    <Wrapper>
      {jobList.map((jobItem) => (
        <JobItem key={jobItem.url} {...jobItem} />
      ))}
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToDatabase()

  const jobList = await db
    .collection('listings')
    .find<JobListItem>(
      {},
      { projection: { attachments: 0, officeInfoHtml: 0, bodyHtml: 0 } }
    )
    .toArray()

  return {
    props: {
      jobList: JSON.parse(JSON.stringify(jobList)),
    },
    revalidate: 1,
  }
}

export default Home
