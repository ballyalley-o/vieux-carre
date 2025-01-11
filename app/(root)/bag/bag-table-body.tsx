import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TableBody, TableRow, TableCell } from 'component/ui'
import { DynamicBagBtn } from 'component/shared/btn'
import { GLOBAL, PATH_DIR } from 'config'
import { BagTableCells } from './bag-table'

interface BagTableBodyProps {
  bag: Bag
  isPending: boolean
  handleMinus: (item: BagItem) => void
  handlePlus: (item: BagItem) => void
}

const BagTableBody: FC<BagTableBodyProps> = ({ isPending, handleMinus, handlePlus, bag }) => {
  const BODY = (item: BagItem): BagTableCells => ({
    cells: [
      {
        id: 'item',
        align: 'text-left',
        value: (
          <Link href={PATH_DIR.PRODUCT_VIEW(item.slug)} className="flex items-center">
            <Image src={item.image} alt={item.name} width={50} height={50} />
            <span className="px-2">{item.name}</span>
          </Link>
        )
      },
      {
        id: 'quantity',
        align: 'text-center',
        value: <DynamicBagBtn amount={item.qty} isPending={isPending} handleMinus={() => handleMinus(item)} handlePlus={() => handlePlus(item)} />
      },
      {
        id: 'price',
        align: 'text-right',
        value: `${GLOBAL.PRICES.CURRENCY} ${item.price}`
      }
    ]
  })
  return (
    <TableBody>
      {bag.items.map((item) => (
        <TableRow key={item.slug}>
          {BODY(item).cells?.map(({ id, value, align }) => (
            <TableCell key={id} className={align}>{value}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default BagTableBody