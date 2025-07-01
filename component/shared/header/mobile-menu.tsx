import { Fragment } from 'react'
import { en } from 'public/locale'
import { NAV_CONFIG, NAV_CONFIG_ADMIN } from 'config/nav-config'
import { PATH_DIR } from 'config/dir'
import { EllipsisVertical, User2Icon } from 'lucide-react'
import { LinkBtn, Sheet, Button, SheetContent, Separator, SheetDescription, SheetTrigger } from 'component'
import { ProtectedNavLink } from 'component/shared/protect'
import { BagNavLink } from 'component/shared/bag'
import { ThemeToggle } from 'component/shared/header'
import { signOutUser, KEY } from 'lib'

const MobileMenu = ({ user, count, moduleType }: { user: User, count: number, moduleType: ModuleType }) => {
  const isAdmin = user?.role === KEY.ADMIN

  const NAV_CONFIG_MAP = {
    admin: NAV_CONFIG_ADMIN,
    user : NAV_CONFIG
  }

  const navConfig = NAV_CONFIG_MAP[moduleType] || NAV_CONFIG

  const renderUser = !user ? (
    <LinkBtn href={PATH_DIR.SIGN_IN}>
      <User2Icon /> {en.sign_in.label}
    </LinkBtn>
  ) : (
    <div className="flex flex-col space-y-2">
      {isAdmin && (
        <Fragment>
          <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{en.admin.label}</ProtectedNavLink>
          <Separator className="my-2" />
        </Fragment>
      )}
      <ThemeToggle className={'flex justify-start'} />
      <form action={signOutUser} className="w-full">
        <Button className="w-full py-4 px-0 h-4 justify-start text-muted-foreground" variant={'ghost'}>
          {en.sign_out.label}
        </Button>
      </form>
    </div>
  )

  return (
    <nav className={"md:hidden"}>
      <Sheet>
        <BagNavLink itemCount={count}/>
        <SheetTrigger className={"align-middle"}>
          <EllipsisVertical />
        </SheetTrigger>
        <SheetContent className={"w-[200px] special-elite"}>
          <div className={'flex flex-col h-full justify-between'}>
            <div className={'flex flex-col space-y-4 mt-5'}>
                {navConfig.map(({ title, href }, index) => (
                  <ProtectedNavLink key={index}href={href}>{title}</ProtectedNavLink>
                ))}
                 <Separator className="my-4" />
                {!user ? null : (
                  <Fragment>
                    <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT} className={'justify-start'}>{en.account.label}</ProtectedNavLink>
                    <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
                  </Fragment>
                )}
            </div>
            <div className={"mt-auto flex flex-col"}>
              {renderUser}
            </div>
          </div>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
