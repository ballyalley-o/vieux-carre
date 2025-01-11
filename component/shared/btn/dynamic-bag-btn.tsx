import { FC, Fragment } from 'react'
import { Minus, Plus, Loader } from 'lucide-react'
import { Button } from 'component/ui'

interface DynamicBagBtnProps {
  isPending: boolean
  handleMinus: () => void
  handlePlus: () => void
  amount: number
}
const DynamicBagBtn: FC<DynamicBagBtnProps> = ({ isPending, handleMinus, handlePlus, amount }) => {
  return (
    <Fragment>
      <Button disabled={isPending} type={'button'} variant={'outline'} onClick={handleMinus} className="shadow-none px-2 rounded-sm">
        {isPending ? <Loader className="w-4 h-4 animate-spin " /> : <Minus className="h-4 w-4 -" />}
      </Button>
      <span className="px-4">{amount}</span>
      <Button disabled={isPending} type={'button'} variant={'outline'} onClick={handlePlus} className="shadow-none px-2 rounded-sm">
        {isPending ? <Loader className="w-4 h-4 animate-spin " /> : <Plus className="h-4 w-4" />}
      </Button>
    </Fragment>
  )
}

export default DynamicBagBtn
