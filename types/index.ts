export interface JobListItem {
  _id: string
  isEnglish: boolean
  office: string
  officeHref: string
  title: string
  url: string
  publishedDate: Date
  retracted: string
}

export interface Listing extends JobListItem {
  contentHtml: string
}

export interface Offices {
  _id: string
  officeNames: OfficeName
}

export interface OfficeName {
  [key: string]: string
}
