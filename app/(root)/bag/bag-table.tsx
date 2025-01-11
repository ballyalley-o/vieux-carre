'use client'

import { FC, JSX, ReactNode, Fragment, useTransition } from 'react'
import { en } from 'public/locale'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { Table} from 'component/ui'
import { PATH_DIR } from 'config'
import BagTableHead from './bag-table-head'
import BagTableBody from './bag-table-body'


interface BagTableCell {
  id: string
  value: string | JSX.Element | number | ReactNode
  align: string
}

export interface BagTableCells {
  cells: [BagTableCell, BagTableCell, BagTableCell]
}

interface BagTableProps {
  bag: Bag
}

const BagTable: FC<BagTableProps> = ({ bag }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  // const router = useRouter()

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

  return (
    <Fragment>
      <h1 className="py-4 h2-bold">{'Bag Table'}</h1>
      {!bag || bag.items.length === 0 ? (
        <div>
          {en.bag_empty} <Link href={PATH_DIR.ROOT}>{en.go_shopping}</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <BagTableHead />
              <BagTableBody bag={bag} isPending={isPending} handleMinus={handleRemoveItem} handlePlus={handleAddItem} />
            </Table>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default BagTable
