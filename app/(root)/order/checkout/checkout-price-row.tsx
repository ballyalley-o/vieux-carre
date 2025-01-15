import { FC } from "react"
import { formatCurrency } from "lib"

interface CheckoutPriceRowProps {
  label: string
  price: string | number
}
const CheckoutPriceRow: FC<CheckoutPriceRowProps> = ({ label,  price }) => {
  return (
    <div className="flex justify-between">
      <div className="">{label}</div>
      <div>{formatCurrency(price)}</div>
    </div>
  )
}

export default CheckoutPriceRow