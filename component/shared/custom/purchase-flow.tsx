import { Fragment } from 'react'
import { en } from 'public/locale'
import { cn } from 'lib'
import { GLOBAL } from 'config'

type ProcessFlowLocaleKey = keyof typeof en.purchase_flow

const PurchaseFlow = ({ current = 0 }) => {
  const lastElement = GLOBAL.PURCHASE_FLOW[GLOBAL.PURCHASE_FLOW.length - 1]
  return (
    <div className="flex-between flex-col space-x-2 space-y-2 mb-10 md:flex-row">
      {(GLOBAL.PURCHASE_FLOW as ProcessFlowLocaleKey[]).map((step, index) => (
        <Fragment key={index}>
          <div className={cn('p-2 w-56 rounded-sm text-center text-sm', index === current && 'bg-secondary', index < current && 'opacity-40')}>
            {index < current ? en.purchase_flow[step].completed : en.purchase_flow[step].label}
          </div>
          {step !== lastElement && <hr className={cn('w-16 border-t mx-2', index < current ? 'border-green-500' : 'border-gray-300')} />}
        </Fragment>
      ))}
    </div>
  )
}

export default PurchaseFlow
