import { EllipsisVertical, ShoppingBagIcon, User2Icon } from 'lucide-react'
import { LinkBtn, Sheet, SheetContent, SheetDescription, SheetTrigger, ThemeToggle } from 'component'
import { PATH_DIR } from 'config'

const MobileMenu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start w-[100px]">
          <ThemeToggle />
          <LinkBtn href={PATH_DIR.BAG}>
            <ShoppingBagIcon />
          </LinkBtn>
          <LinkBtn href={PATH_DIR.SIGN_IN}>
            <User2Icon />
          </LinkBtn>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
