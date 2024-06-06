export interface RootDetails {
    status: string
    message: string
    data: Data
  }
  
  export interface Data {
    seoOnPage: SeoOnPage
    breadCrumb: BreadCrumb[]
    params: Params
    item: Item
    APP_DOMAIN_CDN_IMAGE: string
  }
  
  export interface SeoOnPage {
    og_type: string
    titleHead: string
    seoSchema: SeoSchema
    descriptionHead: string
    og_image: string[]
    updated_time: number
    og_url: string
  }
  
  export interface SeoSchema {
    "@context": string
    "@type": string
    name: string
    url: string
    image: string
    director: string
  }
  
  export interface BreadCrumb {
    name: string
    slug?: string
    position: number
    isCurrent?: boolean
  }
  
  export interface Params {
    slug: string
    crawl_check_url: string
  }
  
  export interface Item {
    _id: string
    name: string
    slug: string
    origin_name: string[]
    content: string
    status: string
    thumb_url: string
    sub_docquyen: boolean
    author: string[]
    category: Category[]
    chapters: Chapter[]
    updatedAt: string
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
  }
  
  export interface Chapter {
    server_name: string
    server_data: ServerDaum[]
  }
  
  export interface ServerDaum {
    filename: string
    chapter_name: string
    chapter_title: string
    chapter_api_data: string
  }
  