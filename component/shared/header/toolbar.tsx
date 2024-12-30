import Link from 'next/link'
import { EllipsisVertical, ShoppingBagIcon, User2Icon } from 'lucide-react'
import { ThemeToggle, Button, Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from 'component'
import { PATH_DIR } from 'config'

const Toolbar = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggle />
        <Button asChild variant="ghost">
          <Link href={PATH_DIR.BAG}>
            <ShoppingBagIcon /> {'Bag'}
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href={PATH_DIR.SIGN_IN}>
            <User2Icon /> {'Sign In'}
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>{'Menu'}</SheetTitle>
            <ThemeToggle />
            <Button asChild variant={'ghost'}>
              <Link href={PATH_DIR.BAG}>
                <ShoppingBagIcon />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={PATH_DIR.SIGN_IN}>
                <User2Icon />
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Toolbar
