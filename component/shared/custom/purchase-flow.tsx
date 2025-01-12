import { Fragment } from 'react'
import { cn } from 'lib'
import { GLOBAL } from 'config'

interface BaseLocale  {
  purchase_flow: Record<string, {label: string, description: string, completed: string}>
}

type ProcessFlowLocaleKey<T extends BaseLocale> = keyof T['purchase_flow']
interface PurchaseFlowProps<T extends BaseLocale> {
  locale: T
  current?: number
}

const PurchaseFlow = <T extends BaseLocale> ({ locale, current = 0 }: PurchaseFlowProps<T>) => {
  const lastElement = GLOBAL.PURCHASE_FLOW[GLOBAL.PURCHASE_FLOW.length - 1]
  return (
    <div className="flex-between flex-col space-x-2 space-y-2 mb-10 md:flex-row">
      {(GLOBAL.PURCHASE_FLOW as ProcessFlowLocaleKey<T>[]).map((step, index) => (
        <Fragment key={index}>
          <div className={cn('p-2 w-56 rounded-sm text-center text-sm', index === current && 'bg-secondary', index < current && 'opacity-40')}>
            {index < current ? locale.purchase_flow[step as string].completed : locale.purchase_flow[step as string].label}
          </div>
          {step !== lastElement && <hr className={cn('w-16 border-t mx-2', index < current ? 'border-green-500' : 'border-gray-300')} />}
        </Fragment>
      ))}
    </div>
  )
}

export default PurchaseFlow
