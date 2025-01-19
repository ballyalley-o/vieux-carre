import { ReactNode, JSX } from 'react'
import { TableHeader, TableRow, TableHead } from 'component/ui'

interface BagTableCell {
  id   : string
  value: string | JSX.Element | number | ReactNode
  align: string
}

export interface BagTableCells {
  cells: [BagTableCell, BagTableCell, BagTableCell]
}

const BagTableHead = () => {
  const HEADER: BagTableCells = {
    cells: [
      { id: 'item', value: 'Item', align: 'left' },
      { id: 'quantity', value: 'Quantity', align: 'center' },
      { id: 'price', value: 'Price', align: 'right' }
    ]
  }

  return (
    <TableHeader>
      <TableRow>
        {HEADER.cells.map((cell, index) => (
          <TableHead key={index} className={`text-${cell.align}`}>
            {cell.value}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

export default BagTableHead
