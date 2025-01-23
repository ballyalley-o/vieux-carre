import { FC, Fragment } from 'react'
import { Minus, Plus, Shell } from 'lucide-react'
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
        {isPending ? <Shell className="loader" /> : <Minus className="h-4 w-4 -" />}
      </Button>
      <span className="px-4">{amount}</span>
      <Button disabled={isPending} type={'button'} variant={'outline'} onClick={handlePlus} className="shadow-none px-2 rounded-sm">
        {isPending ? <Shell className="loader" /> : <Plus className="h-4 w-4" />}
      </Button>
    </Fragment>
  )
}

export default DynamicBagBtn
