import { EllipsisVertical, ShoppingBagIcon, User2Icon } from 'lucide-react'
import { LinkButton, Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger, ThemeToggle } from 'component'
import { PATH_DIR } from 'config'

const MobileMenu = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-start">
          <SheetTitle>{'Menu'}</SheetTitle>
          <ThemeToggle />
          <LinkButton href={PATH_DIR.BAG}>
            <ShoppingBagIcon />
          </LinkButton>
          <LinkButton href={PATH_DIR.SIGN_IN}>
            <User2Icon />
          </LinkButton>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
