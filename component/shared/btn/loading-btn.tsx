import { FC, Fragment, JSX } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { KEY } from 'lib'

interface LoadingBtnProps {
  isPending : boolean
  label     : string
  icon     ?: JSX.Element
  type     ?: ButtonType
  disabled ?: boolean
}

const LoadingBtn: FC<LoadingBtnProps> = ({
  isPending,
  icon = <ArrowRight className={'default-size_icon'} />,
  label,
  type = KEY.SUBMIT as ButtonType,
  disabled = false
}) => {
  return (
    <div className="flex gap-2">
      <Button type={type} disabled={isPending || disabled} className="w-full mt-5">
        {isPending ? (
          <EllipsisLoader />
        ) : (
          <Fragment>
            {label} {icon}
          </Fragment>
        )}
      </Button>
    </div>
  )
}

export default LoadingBtn
