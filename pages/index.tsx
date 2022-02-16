import { useState } from 'react'
import type { NextPage, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { JobItem, SearchForm, BlackList } from 'components'
import { useScrollRestoration } from 'utils'
import { connectToDatabase } from 'utils/mongodb'

import type { JobListItem, OfficeName, Offices } from 'types'

interface Props {
  lists: { jobList: JobListItem[]; officeNames: OfficeName }
}

const Home: NextPage<Props> = ({ lists: { jobList, officeNames } }) => {
  const router = useRouter()
  useScrollRestoration(router)
  const { query } = router

  const [blackList, setBlackList] = useState<string[]>([])

  // remove blacklisted offices from jobList
  jobList = jobList.filter((job) => !blackList.includes(job.office))
  jobList = jobList.filter((job) => !blackList.includes(job.officeHref))

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

  // return multiple office names that matches the search keyword instead of just returning the first one matched
  const filteredJobListDv = jobList.filter(({ officeHref }) =>
    getOfficeName().includes(officeHref)
  )

  // filter jobList by office
  if (query.office) {
    if (filteredJobList.length) {
      jobList = filteredJobList
    } else {
      jobList = filteredJobListDv
    }
  }

  // filter jobList by title
  if (query.title) {
    jobList = jobList.filter(({ title }) =>
      title.includes(query.title as string)
    )
  }

  return (
    <Wrapper>
      <div>
        {jobList.map((jobItem) => (
          <JobItem key={jobItem.url} {...jobItem} {...{ setBlackList }} />
        ))}
      </div>
      <div>
        <SearchForm />
        <BlackList {...{ blackList, setBlackList, officeNames }} />
      </div>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0.75rem;

  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`

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
