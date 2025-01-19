import { TableBody, TableRow, TableCell } from 'component/ui'
import { TblCells } from './tbl-head'

export interface TblBodyProps<T> {
  items: T[]
  cells: (item: T) => TblCells
}

// interface TblBodyProps<T extends TblCell[]> {
//   rows: Array<{ [K in keyof T]: T[K]['value'] }>
// }

const TblBody = <T,>({ cells, items }: TblBodyProps<T>) => {
  return (
    <TableBody>
      {items.map((item, rowIndex) => (
        <TableRow key={rowIndex}>
          {cells(item).cells.map((cell) => (
            <TableCell key={cell.id} className={`text-${cell.align}`}>
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TblBody
