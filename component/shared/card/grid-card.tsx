import { FC, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'component/ui'

interface GridCardProps {
  label   : string
  span    : number
  children: ReactNode
}
const GridCard: FC<GridCardProps> = ({ label, span, children }) => {
  return (
    <Card className={`col-span-${span}`}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default GridCard
