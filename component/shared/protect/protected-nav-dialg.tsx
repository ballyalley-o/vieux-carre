import { FC } from 'react'
import { en } from 'public/locale'
import { AlertDialog, AlertDialogTitle, AlertDialogContent, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from 'component/ui'

interface ProtectedNavDialgProps {
  open: boolean
  setOpen: (open: boolean) => void
  confirmedNavigation: () => void
}

const ProtectedNavDialg: FC<ProtectedNavDialgProps> = ({ open, setOpen, confirmedNavigation }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
      <AlertDialogTitle>{en.message.default.title}</AlertDialogTitle>
        <p>{en.message.unsaved_changes.description}</p>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>{en.stay.label}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmedNavigation}>{en.leave.label}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProtectedNavDialg
