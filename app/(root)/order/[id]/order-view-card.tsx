import { FC, Fragment, JSX } from 'react'
import { Card, CardContent, Badge, Table } from 'component/ui'
import { formatDateTime } from 'lib'
import { BagTableHead, BagTableBody, BagTableBodyProps } from 'component/shared/bag'

interface OverViewCardProps {
    title             : string
    subtitle         ?: string
    subtitle2        ?: string
    badgeCondition   ?: boolean
    showTable        ?: boolean
    variant          ?: BadgeVariant
    dateAt           ?: Date
    badgeLabel       ?: string
    notBadgeLabel    ?: string
    orderItems       ?: OrderItem[]
    bagTableBodyProps?: BagTableBodyProps
    icon             ?: JSX.Element
}
/**
 * OrderViewCard component displays a card with a title, subtitle, and conditional content.
 * It can show either a table of children elements or a badge based on the provided conditions.
 *
 * @param {string} title - The title to be displayed in the card.
 * @param {string} subtitle - The subtitle to be displayed in the card.
 * @param {string} subtitle2 - Optional: added paragraph element to be displayed in the card.
 * @param {boolean} badgeCondition - Condition to determine which badge to display.
 * @param {boolean} showTable - Condition to determine whether to show the table of children elements.
 * @param {string} [variant='secondary'] - The variant of the badge to be displayed.
 * @param {Date} dateAt - The date to be formatted and displayed in the badge.
 * @param {string} badgeLabel - The label to be displayed in the badge when badgeCondition is true.
 * @param {string} notBadgeLabel - The label to be displayed in the badge when badgeCondition is false.
 * @param {React.ReactNode} children - The children elements to be displayed when showTable is true.
 * @param {JSX.Element} icon - The icon to be displayed in the card.
 *
 * @returns {JSX.Element} The rendered OrderViewCard component.
 */
const OrderViewCard: FC<OverViewCardProps> = ({
  title,
  subtitle,
  subtitle2,
  badgeCondition,
  showTable,
  variant = 'secondary',
  dateAt,
  badgeLabel,
  notBadgeLabel,
  icon,
  orderItems = [],
}) => {
  return (
    <Card>
      <CardContent className={'p-4 gap-4'}>
        <h2 className={'text-xl pb-4'}>{title}</h2>
        <div className={`${icon && 'flex items-center' } mb-2`}>
          {icon && (<Fragment><div className="mr-2">{icon}</div><span><p>{subtitle}</p></span></Fragment>)}
          {!icon && (subtitle && <p>{subtitle}</p>)}
          {subtitle2 && <p>{subtitle2}</p>}
        </div>
        {showTable ? (
          <Table>
            <BagTableHead />
            <BagTableBody bagItems={orderItems} />
          </Table>
        ) : badgeCondition ? (
          <Badge variant={variant}>
            {badgeLabel} &nbsp; {formatDateTime(dateAt!).dateTime}
          </Badge>
        ) : (
          <Badge variant={'destructive'}>{notBadgeLabel}</Badge>
        )}
      </CardContent>
    </Card>
  )
}

export default OrderViewCard
