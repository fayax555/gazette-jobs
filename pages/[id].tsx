import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getIdFromUrl } from 'utils'
import { connectToDatabase } from 'utils/mongodb'
import type { Listing } from 'types'
import JobBody from 'components/JobBody'

interface Props {
  listing: Listing
}

const JobDetailsPage: NextPage<Props> = ({ listing }) => {
  return <JobBody {...listing} />
}

const getListings = async () => {
  const db = await connectToDatabase()

  return await db.collection('listings').find<Listing>({}).toArray()
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id

  const listing = (await getListings()).find(({ url }) => {
    const jobId = getIdFromUrl(url)

    return jobId === id
  })

  if (!listing) return { notFound: true }

  return {
    props: {
      listing: JSON.parse(JSON.stringify(listing)),
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids: string[] = (await getListings()).map(({ url }) =>
    getIdFromUrl(url)
  )

  console.log(ids)

  const paths = ids.map((id: string) => ({ params: { id } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default JobDetailsPage
