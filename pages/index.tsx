import type { NextPage, GetStaticProps } from 'next'
import { connectToDatabase } from 'utils/mongodb'
import styled from 'styled-components'
import JobItem from 'components/JobItem'
import type { JobListItem } from 'types'

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0.75rem;

  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

const Search = styled.div`
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
`

interface Props {
  jobList: JobListItem[]
}

const Home: NextPage<Props> = ({ jobList }) => {
  return (
    <Wrapper>
      <div>
        {jobList.map((jobItem) => (
          <JobItem key={jobItem.url} {...jobItem} />
        ))}
      </div>
      <Search>
        <h2>Search</h2>
        <input type='text' />
      </Search>
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
