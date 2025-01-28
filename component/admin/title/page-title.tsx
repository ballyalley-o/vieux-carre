import { FC } from 'react'
import { en } from 'public/locale'
import { XIcon } from 'lucide-react'
import { Badge } from 'component/ui'
import { LinkBtn } from 'component/shared'

interface PageTitleProps {
    query: string
    title: string
    href : string
}

const PageTitle: FC<PageTitleProps> = ({ query, title, href }) => {
  return (
    <div className="space-y-4 gap-3">
      <h1 className={'h2-bold'}>{title}</h1>
      {query && (
        <div className={'flex items-center align-center space-x-2'}>
          <p className={'text-sm'}> &nbsp;{en.filtered_by.label}:</p>
          <span><div className={'flex align-center space-x-2'}>
              <Badge variant={'secondary'}><i>{query}</i></Badge>
              <span><LinkBtn href={href} variant={'ghost'} size={'sm'} className={'py-0 px-2'}><XIcon size={15} /></LinkBtn></span>
            </div>
          </span>
        </div>
      )}
    </div>
  )
}

export default PageTitle
