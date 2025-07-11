import { GLOBAL } from 'vieux-carre'
import { ShoppingBag, DollarSign, WalletCards, Headset } from 'lucide-react'
import { Card, CardContent } from 'component/ui'
import { transl } from 'lib/util'

const ServiceCard = () => {
    const CURRENCY                = GLOBAL.PRICES.CURRENCY_SYMBOL
    const FREE_SHIPPING_THRESHOLD = CURRENCY + GLOBAL.PRICES.NO_SHIPPING_THRESHOLD
    const MONEY_BACK_DAYS         = GLOBAL.PROMOTION.MONEY_BACK_DAYS

    const CARD_CONTENTS = [
        { icon: <ShoppingBag />, title: transl('free_shipping.label'), description: transl('free_shipping.description') + FREE_SHIPPING_THRESHOLD },
        { icon: <DollarSign />, title: transl('money_back_guarantee.label'), description: MONEY_BACK_DAYS + transl('money_back_guarantee.description') },
        { icon: <WalletCards />, title: transl('flexible_payment.label'), description: transl('flexible_payment.description') },
        { icon: <Headset />, title: transl('all_day_support.label'), description: transl('all_day_support.description') },
    ]

  return (
    <div>
      <Card>
        <CardContent className={'grid md:grid-cols-4 gap-4 p-4 justify-items-center text-center'}>
            {CARD_CONTENTS.map((_content, index) => (
                <div key={index} className={"space-y-2 justify-items-center"}>
                 {_content.icon}
                    <div className={'text-sm font-bold'}>{_content.title}</div>
                    <div className={"text-xs text-muted-foreground"}>
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
