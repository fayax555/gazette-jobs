export interface JobListItem {
  office: string
  title: string
  url: string
  publishedDate: Date
  retracted: string
}

export interface Listing extends JobListItem {
  contentHtml: string
}
