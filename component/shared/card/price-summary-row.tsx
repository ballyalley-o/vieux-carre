import { FC } from "react"
import { formatCurrency } from "lib"

interface PriceSummaryRowProps {
  label     : string
  price     : string | number
  className?: string
}
const PriceSummaryRow: FC<PriceSummaryRowProps> = ({ label, price, className }) => {
  return (
    <div className="flex justify-between">
      <div className={className}>{label}</div>
      <div className={className}>{formatCurrency(price)}</div>
    </div>
  )
}

export default PriceSummaryRow