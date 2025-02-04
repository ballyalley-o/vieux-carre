import { en } from '../public/locale'
import { Body, Column, Container, Head, Heading, Html, Img, Preview, Row, Section, Tailwind, Hr, Text } from '@react-email/components'
import { formatCurrency } from '../lib/util/formatter'
import { PATH_DIR } from '../config/dir/path'
import { IMAGE } from '../config/layout'
import { _mockData } from '../__mock'
import { ASSET_DIR } from 'config'

PurchaseReceiptEmail.PreviewProps = {
    order: {
        id    : crypto.randomUUID(),
        userId: '123',
        user: {
            name : 'John Doe',
            email: 'test@test.com',
        },
        paymentMethod: 'Stripe',
        shippingAddress:{
            fullName     : 'John Doe',
            streetAddress: '123 Main St',
            city         : 'Arlen',
            postalCode   : '94123',
            country      : 'US',
        },
        createdAt    : new Date(),
        totalPrice   : '100',
        taxPrice     : '10',
        shippingPrice: '10',
        itemsPrice   : '80',
        orderitems: _mockData.products.map((_product) => ({
            name     : _product.name,
            orderId  : '123',
            productId: '123',
            slug     : _product.slug,
            qty      : _product.stock,
            image    : _product.images[0],
            price    : _product.price.toString(),
        })),
        isDelivered: true,
        deliveredAt: new Date(),
        isPaid     : true,
        paidAt     : new Date(),
        paymentResult: {
            id           : '123',
            status       : 'succeeded',
            pricePaid    : '100',
            email_address: 'test@test.com'
        }
    }
} satisfies OrderInformationProps

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium'})

type OrderInformationProps = {
    order: Order
}

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>{en.view_order_receipt.label}</Preview>
      <Tailwind>
        <Head />
        <Body className={'font-sans bg-white'}>
          <Container className={'max-w-4xl'}>
          <Img src={ASSET_DIR.LOGO_PRODUCTION_PNG} width={IMAGE.EMAIL_PUCHASE_ITEM} height={IMAGE.EMAIL_PUCHASE_ITEM} className={'rounded-sm'} alt={'logo'} />
            <Heading>{en.purchase_receipt.label}</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className={'text-sm mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'}>{en.order_id.label}</Text>
                  <Text className={'text-sm font-bold mt-0 mr-4'}>{order.id.toString()}</Text>
                </Column>
                <Column align={'right'}>
                  <Text className={'text-sm mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'}>{en.purchase_date.label}</Text>
                  <Text className={'text-sm font-bold mt-0 mr-4'}>{dateFormatter.format(order.createdAt)}</Text>
                </Column>
              </Row>
            </Section>
            <Section className={'border border-solid border-gray-200 rounded-sm p-4 md:p-6 my-4'}>
                {order.orderitems.map((_item, index) => (
                    <Row key={index} className={'mt-8'}>
                        <Column className={'w-20'}>
                            <Img src={_item.image.startsWith('/') ? PATH_DIR.EMAIL_IMAGE(_item.image) : _item.image} width={IMAGE.EMAIL_PUCHASE_ITEM} height={IMAGE.EMAIL_PUCHASE_ITEM} className={'rounded-sm'} alt={_item.name} />
                        </Column>
                        <Column className={'align-top items-center'}>
                            {_item.name}&nbsp;{'x'} &nbsp;{_item.qty}
                        </Column>
                        <Column align={'right'} className={'align-top'}>
                            {formatCurrency(_item.price)}
                        </Column>
                    </Row>
                ))}
                <Hr className={'my-4'} />
                {[
                    {name: en.item.items.label, price: order.itemsPrice},
                    {name: en.tax.label, price: order.taxPrice},
                    {name: en.shipping.label, price: order.shippingPrice},
                    {name: en.total.label, price: order.totalPrice},
                ].map(({ name, price}, index) => (
                    <Row key={index} className={'py-1'}>
                        <Column align={'right'}>{name}:</Column>
                        <Column align={'right'} width={70} className={'align-top'}>
                            <Text className={'m-0'}>{formatCurrency(price)}</Text>
                        </Column>
                    </Row>
                ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}