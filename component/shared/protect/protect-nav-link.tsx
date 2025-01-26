'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { en } from 'public/locale'
import { useFormState } from 'store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { AlertDialogTitle, AlertDialog, AlertDialogContent,AlertDialogDescription,  AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from 'component/ui'
import { cn } from 'lib'

interface ProtectedNavLinkProps {
  href      : string
  children  : React.ReactNode
  className?: string
}

const ProtectedNavLink: React.FC<ProtectedNavLinkProps> = ({ href, children, className }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [nextPath, setNextPath] = useState<string | null>(null)
  const { isDirty, setDirty } = useFormState()
  const pathname = usePathname()
  const router = useRouter()
  const triggerRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!showDialog && triggerRef.current) {
      triggerRef.current.focus()
    }
  }, [showDialog])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (isDirty) {
      e.preventDefault()
      setNextPath(path)
      setShowDialog(true)
    }
  }

  const confirmNavigation = () => {
    setDirty(false)
    setShowDialog(false)
    if (nextPath) {
      router.push(nextPath)
      setNextPath(null)
    }
  }

  return (
    <Fragment>
       <Link
        href={href}
        ref={triggerRef}
        onClick={(e) => handleNavigation(e, href)}
        className={cn('text-sm font-medium transition-colors hover:text-primary ease-in-out', className, pathname.includes(href) ? 'font-semibold' : 'text-muted-foreground')}>
          {children}
      </Link>
      {showDialog && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogTitle>{en.message.default.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {en.message.unsaved_changes.description}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDialog(false)}>
                {en.cancel.label}
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmNavigation}>
                {en.leave.label}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Fragment>
  )
}

export default ProtectedNavLink
