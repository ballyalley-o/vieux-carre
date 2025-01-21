import { TableHeader, TableRow, TableHead } from 'component/ui'

// export interface TblCell {
//   id   : string
//   value: string | JSX.Element | number | ReactNode
//   align: string
// }

// export interface TblCells<T extends number> {
//   cells: TblCell[] & { length: T }
// }

// export type TblCells<T extends TblCell[]> = T
// export interface TblHeadProps<T extends TblCell[]> {
//   header: TblCells<T>
// }

const TblHead = <T extends number>({ cells }:TblCells<T>) => {
  return (
    <TableHeader>
      <TableRow>
        {cells.map((cell, index) => (
          <TableHead key={index} className={`text-${cell.align}`}>
            {cell.value}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

export default TblHead
