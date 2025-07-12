'use client'

import { FC, Fragment, useState, useEffect } from 'react'
import { PATH_DIR } from 'vc.dir'
import Link from 'next/link'
import { formatDateTime, getReviews, transl } from 'lib'
import { UserIcon, Calendar } from 'lucide-react'
import { Badge, Card, CardHeader, CardDescription, CardTitle, CardContent } from 'component/ui'
import { ProductRating } from 'component/shared/product'
import { ICON } from 'config/layout'
import ReviewForm from './review-form'

interface ReviewListProps {
  userId: string
  productId: string
  productSlug: string
}
const ReviewList: FC<ReviewListProps> = ({ userId, productId, productSlug }) => {
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        const loadReviews = async () => {
            const response = await getReviews({ productId })
            setReviews(response?.data)
        }
        loadReviews()
    }, [productId])

    const reload = async () => {
      const response = await getReviews({ productId })
      setReviews([...response.data])
    }
  return (
    <Fragment>
      <div className="space-y-4">
        {reviews.length <= 0 && <div>{transl('message.currently_no_reviews.description')}</div>}
        {userId ? (
          <Fragment>
            <ReviewForm userId={userId} productId={productId} onReviewSubmitted={reload} />
          </Fragment>
        ) : (
          <div>
            {transl('please.label')}&nbsp;
            <Link href={PATH_DIR.PRODUCT_CALLBACK(productSlug)} className={'text-blue-700 px-2'}>
              <Badge variant={'secondary'}>{transl('sign_in.label')}</Badge>
            </Link>
            &nbsp;{transl('message.to_write_review.description')}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {reviews.map((_review, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex-between">
                  <CardTitle>{_review.title}</CardTitle>
                </div>
                <CardDescription>{_review.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <ProductRating value={_review.rating} />
                    <div className="flex items-center">
                        <UserIcon size={ICON.XTRA_SMALL} className={'mr-1'} />
                        {_review.user ? _review.user.name : transl('user.label')}
                    </div>
                    <div className={'flex items-center'}>
                        <Calendar size={ICON.XTRA_SMALL} className={'mr-1'} />
                        {formatDateTime(_review.createdAt).dateTime}
                    </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default ReviewList
