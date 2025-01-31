import { FC } from 'react'
import { XIcon } from 'lucide-react'
import { Badge } from 'component/ui'
import { LinkBtn } from 'component/shared'
import { ICON } from 'config/layout'


interface FilterTitleProps {
    href           : string;
    filter         : string;
    filterTypeLabel?: string;
}
const FilterTitle: FC<FilterTitleProps> = ({ href, filter, filterTypeLabel }) => {
    return (
        <div className={'flex items-center align-center space-x-2'}>
        <p className={'text-sm'}> &nbsp;{filterTypeLabel}:</p>
        <span><div className={'flex align-center space-x-2'}>
            <Badge variant={'secondary'}><i>{filter}</i></Badge>
            <span><LinkBtn href={href} variant={'ghost'} size={'sm'} className={'py-0 px-2'}><XIcon size={ICON.SMALL} /></LinkBtn></span>
          </div>
        </span>
      </div>
     );
}

export default FilterTitle;