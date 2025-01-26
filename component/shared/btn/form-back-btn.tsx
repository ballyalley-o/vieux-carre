"use client"
import { FC } from 'react'
import { en } from 'public/locale'
import { ArrowLeft } from 'lucide-react'
import { Tooltp } from 'component/shared/tooltp'
import { Button } from 'component/ui'
import { ProtectedNavLink } from 'component/shared/protect'

interface FormBackBtnProps {
  href               ?: string
  label              ?: string
  withLink           ?: boolean
  handleExclusiveBack?: () => void
}

const FormBackBtn: FC<FormBackBtnProps> = ({ href = '', label,  handleExclusiveBack, withLink = false }) => {

 const handleBackButton = () => {
  window.history.back()
 }
  return (
    <Tooltp content={en.go_back}>
        {withLink ? (
          <Button variant={'ghost'}>
            <ProtectedNavLink href={href} className={'flex flex-row items-center gap-2'}>
              <ArrowLeft className={'default-size_icon'} />  &nbsp; <span>{label}</span>
            </ProtectedNavLink>
          </Button>
        )
        :
        (
          <Button variant={'ghost'} onClick={handleBackButton || handleExclusiveBack}>
            <ArrowLeft className={'default-size_icon'} />
          </Button>
        )}
    </Tooltp>
  )
}

export default FormBackBtn
