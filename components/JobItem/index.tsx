import { Dispatch, FC, SetStateAction } from 'react'
import { getIdFromUrl } from 'utils'
import Link from 'next/link'
import type { JobListItem } from 'types'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'
import { Wrapper } from './style'
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%s few seconds',
    m: '1 minutes',
    mm: '%d minutes',
    h: '1 hours',
    hh: '%d hours',
    d: '1 days',
    dd: '%d days',
    M: '1 months',
    MM: '%d months',
    y: '1 years',
    yy: '%d years',
  },
})

type dayjsEngToDv = [
  string,
  'few' | 'minutes' | 'hours' | 'days' | 'months' | 'years'
]

const engToDv = {
  few: 'މީގެ އިރުކޮޅެއް',
  hours: 'ގަޑިއިރު',
  minutes: 'މިނެޓް',
  days: 'ދުވަސް',
  months: 'މަސް',
  years: 'އަހަރު',
}

// މީގެ އިރުކޮޅެއް ކުރިން
// a while ago

interface Props extends JobListItem {
  setBlackList: Dispatch<SetStateAction<string[]>>
}

const JobItem: FC<Props> = ({
  isEnglish,
  office,
  officeHref,
  url,
  title,
  publishedDate,
  retracted,
  setBlackList,
}) => {
  const [number, word] = dayjs(publishedDate)
    .fromNow()
    .split(' ') as dayjsEngToDv

  return (
    <Wrapper retracted={!!retracted} className={isEnglish ? 'en' : ''}>
      <div>
        <span
          onClick={() => {
            setBlackList((currList) => [...new Set([...currList, officeHref])])
          }}
        >
          X
        </span>{' '}
        <Link href={`/?office=${officeHref}`}>
          <a title='view more from this office'>{office}</a>
        </Link>{' '}
        <span>
          {number} {isEnglish ? `${word} ago` : `${engToDv[word]} ކުރިން`}
        </span>
      </div>
      <Link href={`/${getIdFromUrl(url)}`}>
        <a title='view details'>{title}</a>
      </Link>
      {retracted && <p className='retracted'>{retracted}</p>}
    </Wrapper>
  )
}

export default JobItem
