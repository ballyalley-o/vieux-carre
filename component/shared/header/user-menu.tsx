import { Fragment } from 'react'
import Link from 'next/link'
import { en } from 'public/locale'
import { auth } from 'auth'
import { signOutUser, charAtName, KEY } from 'lib'
import { User2Icon, LogOut } from 'lucide-react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Separator } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { PATH_DIR } from 'config'

const UserMenu = async () => {
  const session = await auth()
  if (!session) {
    return (
      <Button asChild variant="ghost">
        <Link href={PATH_DIR.SIGN_IN}>
          <User2Icon /> {en.sign_in.label}
        </Link>
      </Button>
    )
  }

  const isAdmin = session?.user?.role === KEY.ADMIN

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button variant="ghost" className="relative w-8 h-8 rounded-sm ml-2 flex items-center hover:font-bold justify-center bg-gray-300">
              {session?.user?.name ? charAtName(session.user.name) : <User2Icon />}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium leading-none">{session?.user?.name}</div>
              <div className="text-sm text-muted-foreground leading-none">{session?.user?.email}</div>
              <Separator className="my-4" />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="p-2">
            <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{en.navigation.account.label}</ProtectedNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2">
            <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{en.order_history.label}</ProtectedNavLink>
          </DropdownMenuItem>

          <Separator className="my-2" />
          {isAdmin && (
            <Fragment>
              <DropdownMenuItem className="p-2">
                <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{en.admin.label}</ProtectedNavLink>
              </DropdownMenuItem>
              <Separator className="my-2" />
            </Fragment>
          )}

          <DropdownMenuItem className="p-1">
            <form action={signOutUser} className="w-full">
              <Button className="w-full py-4 px-2 h-4 justify-start" variant={'ghost'}>
                <LogOut /> {en.sign_out.label}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
