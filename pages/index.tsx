import type { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { connectToDatabase } from 'utils/mongodb'
import styled from 'styled-components'
import JobItem from 'components/JobItem'
import type { JobListItem, OfficeName, Offices } from 'types'
import SearchForm from 'components/SearchForm'
import Link from 'next/link'

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0.75rem;

  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

interface Props {
  lists: { jobList: JobListItem[]; officeNames: OfficeName }
}

const Home: NextPage<Props> = ({ lists: { jobList, officeNames } }) => {
  const { query } = useRouter()

  let listToSearch: JobListItem[]

  const getOfficeName = () => {
    const searchedOffices = []

    for (const property in officeNames) {
      if (property.includes(String(query.office)))
        searchedOffices.push(officeNames[property])
    }

    return searchedOffices
  }

  // filter office
  const filteredJobList = jobList.filter(({ officeHref }) =>
    officeHref.includes(String(query.office))
  )

  listToSearch = filteredJobList

  // return multiple office names that matches the search keyword instead of just returning the first one matched
  const filteredJobListDv = jobList.filter(({ officeHref }) =>
    getOfficeName().includes(officeHref)
  )

  if (!query.office) {
    listToSearch = jobList
  } else if (filteredJobList.length) {
    listToSearch = filteredJobList
  } else {
    listToSearch = filteredJobListDv
  }

  return (
    <>
      <Link href=''>
        <a>Home</a>
      </Link>
      <Wrapper>
        <div>
          {listToSearch?.map((jobItem) => (
            <JobItem key={jobItem.url} {...jobItem} />
          ))}
        </div>
        <SearchForm />
      </Wrapper>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await connectToDatabase()

  const jobList = await db
    .collection('listings')
    .find<JobListItem>({}, { projection: { contentHtml: 0 } })
    .toArray()

  const officeNames = (await db.collection('officenames').findOne<Offices>({}))
    ?.officeNames

  return {
    props: {
      lists: JSON.parse(JSON.stringify({ jobList, officeNames })),
    },
    revalidate: 1,
  }
}

export default Home
