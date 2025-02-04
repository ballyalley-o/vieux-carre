import { TableBody, TableRow, TableCell } from 'component/ui'
import { cn } from 'lib'

export interface TblBodyProps<T> {
  items     : T[]
  cells     : (item: T) => TblCells<number>
  className?: string
}

const TblBody = <T,>({ cells, items, className }: TblBodyProps<T>) => {
  return (
    <TableBody>
      {items.map((item, rowIndex) => (
        <TableRow key={rowIndex}>
          {cells(item).cells.map((cell) => (
            <TableCell key={cell.id} className={cn(`text-${cell.align}`, className && className)}>
              {cell.value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TblBody
