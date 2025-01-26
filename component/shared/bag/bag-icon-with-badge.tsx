import { FC } from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import { Button, Badge } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { PATH_DIR } from 'config'

interface BagIconWithBadgeProps {
  itemCount: number
}

const BagIconWithBadge: FC<BagIconWithBadgeProps> = ({ itemCount }) => {
  const limit = itemCount > 9 ? '9+' : itemCount
  return (
    <div className={'relative inline-block'}>
      <Button asChild variant={'ghost'}>
        <ProtectedNavLink href={PATH_DIR.BAG} className={'flex items-center'}>
            <div className={'relative text-lg'}>
              <ShoppingBagIcon className={'bag-size_icon'}/>
              {itemCount > 0 && <Badge variant={'outline'} className={'absolute -top-2 -right-2 px-1 py-0 text-xs rounded-lg bg-red-500 shadow-none text-white'}>{limit}</Badge>}
            </div>
        </ProtectedNavLink>
      </Button>
    </div>
  )
}

export default BagIconWithBadge
