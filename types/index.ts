export interface JobListItem {
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
