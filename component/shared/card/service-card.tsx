import { en } from 'public/locale'
import { GLOBAL } from 'vieux-carre'
import { ShoppingBag, DollarSign, WalletCards, Headset } from 'lucide-react'
import { Card, CardContent } from 'component/ui'

const ServiceCard = () => {
    const CURRENCY                = GLOBAL.PRICES.CURRENCY_SYMBOL
    const FREE_SHIPPING_THRESHOLD = CURRENCY + GLOBAL.PRICES.NO_SHIPPING_THRESHOLD
    const MONEY_BACK_DAYS         = GLOBAL.PROMOTION.MONEY_BACK_DAYS

    const CARD_CONTENTS = [
        { icon: <ShoppingBag />, title: en.free_shipping.label, description: en.free_shipping.description + FREE_SHIPPING_THRESHOLD },
        { icon: <DollarSign />, title: en.money_back_guarantee.label, description: MONEY_BACK_DAYS + en.money_back_guarantee.description },
        { icon: <WalletCards />, title: en.flexible_payment.label, description: en.flexible_payment.description },
        { icon: <Headset />, title: en.all_day_support.label, description: en.all_day_support.description },
    ]

  return (
    <div>
      <Card>
        <CardContent className={'grid md:grid-cols-4 gap-4 p-4'}>
            {CARD_CONTENTS.map((_content, index) => (
                 <div key={index} className={"space-y-2"}>
                 {_content.icon}
                 <div className={'text-sm font-bold'}>{_content.title}</div>
                    <div className="text-xs text-muted-foreground">
                       {_content.description}
                    </div>
               </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default ServiceCard
