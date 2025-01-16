import { FC } from "react"
import { formatCurrency } from "lib"

interface PriceSummaryRowProps {
  label: string
  price: string | number
}
const PriceSummaryRow: FC<PriceSummaryRowProps> = ({ label, price }) => {
  return (
    <div className="flex justify-between">
      <div className="">{label}</div>
      <div>{formatCurrency(price)}</div>
    </div>
  )
}

export default PriceSummaryRow