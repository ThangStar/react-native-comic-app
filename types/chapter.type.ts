export interface RootChapter {
    status: string
    message: string
    data: Data
  }
  
  export interface Data {
    domain_cdn: string
    item: Item
  }
  
  export interface Item {
    _id: string
    comic_name: string
    chapter_name: string
    chapter_title: string
    chapter_path: string
    chapter_image: ChapterImage[]
  }
  
  export interface ChapterImage {
    image_page: number
    image_file: string
  }
  