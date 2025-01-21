import { FC, JSX, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'component/ui'

interface AdminOverviewCardProps {
  label   : string
  icon    : JSX.Element
  children: ReactNode
}
const AdminOverviewCard: FC<AdminOverviewCardProps> = ({ label, icon, children }) => {
  return (
    <Card>
      <CardHeader className={'flex flex-row items-center justify-between space-y-0 pb-2'}>
        <CardTitle className={'text-sm font-medium'}>{label}</CardTitle>
        {icon && icon}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default AdminOverviewCard
