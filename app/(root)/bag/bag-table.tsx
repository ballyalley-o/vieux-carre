'use client'

import { FC, Fragment, useTransition } from 'react'
import { PATH_DIR } from 'vc.dir'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { ArrowRight } from 'lucide-react'
import { Table, Button } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { BagTableHead, BagTableBody, BagSubtotalCard } from 'component/shared/bag'
import { transl } from 'lib/util'

interface BagTableProps {
  bag: Bag
}

const BagTable: FC<BagTableProps> = ({ bag }) => {
  const [isPending, startTransition] = useTransition()
  const { toast }                    = useToast()
  const router                       = useRouter()

  const subtotal = bag  && bag.items.reduce((acc, item) => acc + item.qty, 0)

  const handleRemoveItem = async (item: BagItem) => {
    startTransition(async () => {
      const response = await removeItemFromBag(item.productId)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
    })
  }

  const handleAddItem = async (item: BagItem) => {
    startTransition(async () => {
      const response = await addItemToBag(item)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
      }
    })
  }

  const handleNavigateCheckout = () => {
    startTransition(async () => router.push(PATH_DIR.SHIPPING))
  }

  const renderNavigateCheckoutButton = () => {
    return (
      <Button className="w-full" disabled={isPending} onClick={handleNavigateCheckout}>
        {isPending ? <EllipsisLoader /> : (<Fragment> <ArrowRight className='w-4 h-4' /> {'Proceed to Checkout'}</Fragment>)}
      </Button>
    )
  }

  return (
    <Fragment>
      <h1 className={'py-4 h2-bold'}>{transl('your_bag.label')}</h1>
      {!bag || bag.items.length === 0 ? (
        <div>
          {transl('bag_empty')} <Link href={PATH_DIR.ROOT}>{transl('go_shopping')}</Link>
        </div>
      ) : (
        <div className={'grid md:grid-cols-4 md:gap-5'}>
          <div className={'overflow-x-auto md:col-span-3'}>
            <Table>
              <BagTableHead />
              <BagTableBody bagItems={bag.items} isPending={isPending} handleMinus={handleRemoveItem} handlePlus={handleAddItem} withQtyController />
            </Table>
          </div>
          <BagSubtotalCard bagItemsPrice={bag.itemsPrice} subtotal={subtotal} checkoutButton={renderNavigateCheckoutButton} />
        </div>
      )}
    </Fragment>
  )
}

export default BagTable
