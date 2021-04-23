import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import SimpleImage from '@editorjs/simple-image'

export const EDITOR_JS_TOOLS = { 
  embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      },
      inlineToolbar: true
    },
  table: Table,
  paragraph: Paragraph,
  list: List,
  image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: 'https://localhost:44329/api/Data/ByContent', // Your backend file uploader endpoint
          byUrl: 'https://localhost:44329/api/Data/ByUrl', // Your endpoint that provides uploading by Url
        }
      }
    },
  link: {
      class: LinkTool,
      config: {
        endpoint: 'https://localhost:44329/api/Data/urimeta', // Your backend endpoint for url data fetching
      }
    },
  checklist: CheckList,
  header: Header,
  delimiter: Delimiter,
  simpleImage: SimpleImage
}