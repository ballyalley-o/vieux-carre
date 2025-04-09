import { Fragment } from 'react'
import { en } from 'public/locale'
import { EllipsisVertical, ShoppingBagIcon, User2Icon, LogOut } from 'lucide-react'
import { LinkBtn, Sheet, Button, SheetContent, Separator, SheetDescription, SheetTrigger, ThemeToggle } from 'component'
import { ProtectedNavLink } from 'component/shared/protect'
import { PATH_DIR } from 'config'
import { signOutUser, charAtName, KEY } from 'lib'

const MobileMenu = ({ user }: { user: User }) => {
  const isAdmin = user?.role === KEY.ADMIN
  const renderUser = !user ? (
    <LinkBtn href={PATH_DIR.SIGN_IN}>
      <User2Icon />
    </LinkBtn>
  ) : (
    <div className="flex flex-col space-y-2">
      <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{charAtName(user?.name ? user.name: 'User' )}</ProtectedNavLink>
      <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{en.navigation.account.label}</ProtectedNavLink>
      <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
      <Separator className="my-4" />
      {isAdmin && (
        <Fragment>
          <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{en.admin.label}</ProtectedNavLink>
          <Separator className="my-2" />
        </Fragment>
      )}
      <form action={signOutUser} className="w-full">
        <Button className="w-full py-4 px-2 h-4 justify-start" variant={'ghost'}>
          <LogOut /> {en.sign_out.label}
        </Button>
      </form>
    </div>
  )

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
          {renderUser}
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
