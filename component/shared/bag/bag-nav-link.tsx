import { FC } from 'react'
import { ShoppingBagIcon } from 'lucide-react'
import { PATH_DIR } from 'config/dir'
import { Badge } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'

interface BagNavLinkProps {
  itemCount: number
}

const BagNavLink: FC<BagNavLinkProps> = ({ itemCount }) => {
  const limit = itemCount > 9 ? '9+' : itemCount
  return (
    <div className={'relative inline-block align-middle mr-5'}>
        <ProtectedNavLink href={PATH_DIR.BAG} className={'flex items-center'}>
            <div className={'relative'}>
              <ShoppingBagIcon size={20} />
              {itemCount > 0 && <Badge variant={'outline'} className={'absolute -top-2 -right-2 px-1 py-0 text-xs rounded-lg bg-red-500 shadow-none text-white'}>{limit}</Badge>}
            </div>
        </ProtectedNavLink>
    </div>
  )
}

export default BagNavLink
