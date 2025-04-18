'use client'

import { FC, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { ArrowRight } from 'lucide-react'
import { Table, Card, CardContent, Button, Badge } from 'component/ui'
import { EllipsisLoader } from 'component/shared/loader'
import { PATH_DIR } from 'config'
import { formatCurrency } from 'lib/util'
import { BagTableHead, BagTableBody } from 'component/shared/bag'

interface BagTableProps {
  bag: Bag
}

const BagTable: FC<BagTableProps> = ({ bag }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

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
      <h1 className="py-4 h2-bold">{'Your Bag'}</h1>
      {!bag || bag.items.length === 0 ? (
        <div>
          {en.bag_empty} <Link href={PATH_DIR.ROOT}>{en.go_shopping}</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <BagTableHead />
              <BagTableBody bagItems={bag.items} isPending={isPending} handleMinus={handleRemoveItem} handlePlus={handleAddItem} withQtyController />
            </Table>
          </div>
          <Card className="rounded-sm shadow-none">
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl justify-between flex">
                <div>
                  {en.subtotal.label} &nbsp;
                  <Badge variant={'secondary'} className="text-md">
                    {subtotal}
                  </Badge>
                  &nbsp;:&nbsp;
                </div>
                <span className="font-bold"> {formatCurrency(bag.itemsPrice)}</span>
              </div>
              {renderNavigateCheckoutButton()}
            </CardContent>
          </Card>
        </div>
      )}
    </Fragment>
  )
}

export default BagTable
