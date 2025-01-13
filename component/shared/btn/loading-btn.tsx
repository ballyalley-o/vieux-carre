import { FC, Fragment, JSX } from 'react'
import { Loader, ArrowRight } from 'lucide-react'
import { Button } from 'component/ui'
import { KEY } from 'lib'

interface LoadingBtnProps {
  isPending : boolean
  label     : string
  icon     ?: JSX.Element
  type     ?: ButtonType
}

const LoadingBtn: FC<LoadingBtnProps> = ({
  isPending,
  icon = <ArrowRight className={'default-size_icon'} />,
  label,
  type = KEY.SUBMIT as ButtonType
}) => {
  return (
    <div className="flex gap-2">
      <Button type={type} disabled={isPending} className="w-full mt-5">
        {isPending ? (
          <Loader className={'loader'} />
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
