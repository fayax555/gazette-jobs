import type { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { connectToDatabase } from 'utils/mongodb'
import styled from 'styled-components'
import JobItem from 'components/JobItem'
import type { JobListItem } from 'types'
import SearchForm from 'components/SearchForm'

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0.75rem;

  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

interface Props {
  jobList: JobListItem[]
}

const Home: NextPage<Props> = ({ jobList }) => {
  const { query } = useRouter()

  // filter office
  const filteredJobList = jobList.filter(
    ({ officeHref }) => officeHref === query.office
  )

  return (
    <Wrapper>
      <div>
        {(query.office ? filteredJobList : jobList).map((jobItem) => (
          <JobItem key={jobItem.url} {...jobItem} />
        ))}
      </div>
      <SearchForm />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToDatabase()

  const jobList = await db
    .collection('listings')
    .find<JobListItem>({}, { projection: { contentHtml: 0 } })
    .toArray()

  return {
    props: {
      jobList: JSON.parse(JSON.stringify(jobList)),
    },
    revalidate: 1,
  }
}

export default Home
