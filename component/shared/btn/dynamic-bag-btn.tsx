import { FC, Fragment } from 'react'
import { Minus, Plus } from 'lucide-react'
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
        {<Minus className={"default-size_icon"} />}
      </Button>
      <span className="px-4">{amount}</span>
      <Button disabled={isPending} type={'button'} variant={'outline'} onClick={handlePlus} className="shadow-none px-2 rounded-sm">
        {<Plus className={"default-size_icon"} />}
      </Button>
    </Fragment>
  )
}

export default DynamicBagBtn
