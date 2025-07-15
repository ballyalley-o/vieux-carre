import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from 'vieux-carre.authenticate'
import { signOutUser, charAtName, KEY, cn } from 'lib'
import { User2Icon, LogOut, ExternalLink } from 'lucide-react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, Separator } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'
import { PATH_DIR } from 'config'
import { transl } from 'lib/util/translate'

const UserMenu = async () => {
  const session = await auth()
  if (!session) {
    return (
      <Button asChild variant="ghost">
        <Link href={PATH_DIR.SIGN_IN}>
          <User2Icon /> {transl('sign_in.label')}
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
            <Button variant="ghost" className={cn('relative w-8 h-8 rounded-md ml-2 flex items-center hover:font-bold justify-center bg-accent')}>
              {session?.user?.image ? <Image src={session.user.image} fill alt={'user image'} sizes='auto' /> : session?.user?.name ? charAtName(session.user.name) : <User2Icon/>}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={'w-56'} align="end" forceMount>
          <DropdownMenuLabel className={'font-normal'}>
            <div className={'flex flex-col space-y-2'}>
              <div className={'text-sm font-medium leading-none'}>{session?.user?.name}</div>
              <div className={'text-sm text-muted-foreground leading-none'}>{session?.user?.email}</div>
              <Separator className={'my-4'} />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className={'p-2'}>
            <ProtectedNavLink href={PATH_DIR.USER.ACCOUNT}>{transl('navigation.account.label')}</ProtectedNavLink>
          </DropdownMenuItem>
          <DropdownMenuItem className={'p-2'}>
            <ProtectedNavLink href={PATH_DIR.USER.ORDER}>{transl('order_history.label')}</ProtectedNavLink>
          </DropdownMenuItem>

          <Separator className={'my-2'} />
          {isAdmin && (
            <Fragment>
              <DropdownMenuItem className={'p-2'}>
                <ProtectedNavLink href={PATH_DIR.ADMIN.OVERVIEW}>{transl('admin.label')}</ProtectedNavLink>
              </DropdownMenuItem>
              <Separator className={'my-2'} />
            </Fragment>
          )}

          <DropdownMenuItem className={'p-2'}>
            <div className={'flex justify-evenly items-center gap-2 h-4'}>
              <ProtectedNavLink href={PATH_DIR.SUPPORT}>{transl('need_help.label')}</ProtectedNavLink>
              <ExternalLink size={15} className={'opacity-35'} />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className={"p-1"}>
            <form action={signOutUser} className="w-full">
              <Button className={'w-full py-4 px-2 h-4 justify-start'} variant={'ghost'}>
                <LogOut /> {transl('sign_out.label')}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
