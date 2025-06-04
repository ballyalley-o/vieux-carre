"use client"

import { FC, useState, useEffect } from 'react'
import { en } from 'public/locale'
import { useToast } from 'hook'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewDefaultValue, ReviewSchema, createUpdateReview, getReviewByProductId } from 'lib'
import { StarIcon } from 'lucide-react'
import { Button, Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, Form, DialogFooter } from 'component/ui'
import { RHFFormField, RHFFormSelect } from 'component/shared/rhf'
import { EllipsisLoader } from 'component/shared/loader'
import { ICON } from 'config/layout'

interface ReviewFormProps {
    userId           : string
    productId        : string
    onReviewSubmitted: () => void
}
const ReviewForm: FC<ReviewFormProps> = ({ userId, productId, onReviewSubmitted }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [buttonLabel, setButtonLabel] = useState<string>(en.write_review.label)
    const { toast }       = useToast()
    const form            = useForm<ReviewType>({
                                            resolver     : zodResolver(ReviewSchema),
                                            defaultValues: reviewDefaultValue
                                            })
   const { control, formState, handleSubmit, setValue } = form
   const RATING_OPTIONS = Array.from({ length: 5 }, (_, i) => (i + 1).toString())

    useEffect(() => {
        const checkReview = async () => {
            const review = await getReviewByProductId({ productId })
            if (review) {
                setButtonLabel(en.edit_review.label)
            }
        }
        checkReview()
    }, [productId])

   const handleOpenForm = async () => {
        setValue('productId', productId)
        setValue('userId', userId)
        const review = await getReviewByProductId({ productId })
        if (review) {
            setValue('title', review.title)
            setValue('description', review.description)
            setValue('rating', review.rating)
        }
        setOpen(true)
   }

   const onSubmit:  SubmitHandler<ReviewType> = async (data) => {
    const response = await createUpdateReview({ ...data, productId })
    if (!response.success) {
        return toast({ variant: 'destructive', description: response?.message })
    }
    setOpen(false)
    onReviewSubmitted()
    toast({ description: response.message })
   }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={handleOpenForm}>{buttonLabel}</Button>
            <DialogContent className={'sm:max-w-[425px]'}>
                <Form {...form}>
                    <form method={'POST'} onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{en.write_review.label}</DialogTitle>
                            <DialogDescription>{en.write_review.description}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <RHFFormField control={control} name={'title'} formKey={'title'} />
                            <RHFFormField control={control} name={'description'} formKey={'description'} />
                            <RHFFormSelect control={control} name={'rating'} formKey={'rating'} options={RATING_OPTIONS} icon={<StarIcon size={ICON.XTRA_SMALL} className={'text-muted-foreground'}/>}  disabled={formState.isSubmitting} />
                        </div>
                        <DialogFooter>
                            <Button type={'submit'} size={'sm'} className={'w-full'} disabled={formState.isSubmitting}>
                                {formState.isSubmitting ? <EllipsisLoader /> : en.submit.label}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewForm