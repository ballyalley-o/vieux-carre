import { FC, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'component/ui'
import { cn } from 'lib'

interface GridCardProps {
  label     : string
  span     ?: number
  children  : ReactNode
  className?: string
}

const spanClasses: { [key: number]: string } = {
  1 : 'col-span-1',
  2 : 'col-span-2',
  3 : 'col-span-3',
  4 : 'col-span-4',
  5 : 'col-span-5',
  6 : 'col-span-6',
  7 : 'col-span-7',
  8 : 'col-span-8',
  9 : 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
}

const GridCard: FC<GridCardProps> = ({ label, span = 1, children, className }) => {
  const spanClass = spanClasses[span] || 'col-span-1'

  return (
    <Card className={cn('', className, spanClass)}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default GridCard
