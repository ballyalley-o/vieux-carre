'use client'

import { Fragment, useTransition, FC } from 'react'
import { PATH_DIR } from 'vc.dir'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { Button, ToastAction } from 'component/ui'
import { DynamicBagBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { transl } from 'lib/util'

interface AddToBagProps {
  item: BagItem
  bag?: Bag
}

const AddToBag: FC<AddToBagProps> = ({ bag, item }) => {
  const [isPending, startTransition] = useTransition()
  const router                       = useRouter()
  const { toast }                    = useToast()
  const existItem                    = bag && bag.items.find((x) => x.productId === item.productId)

  const handleAddToBag = async () => {
    startTransition(async () => {
      const response = await addItemToBag(item)
      if (!response.success) {
        toast({ variant: 'destructive', description: response.message })
        return
      }
      toast({
        description: response.message,
        action: (
          <ToastAction altText="go-to-bag-button" onClick={() => router.push(PATH_DIR.BAG)}>
            {transl('go_to_bag')}
          </ToastAction>
        )
      })
    })
  }

  const handleRemoveFromBag = async () => {
    startTransition(async () => {
      const response = await removeItemFromBag(item.productId)
      toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
      return
    })
  }

  const render = existItem ? (
    <DynamicBagBtn isPending={isPending} handlePlus={handleAddToBag} handleMinus={handleRemoveFromBag} amount={existItem.qty} />
  ) : (
    <Button className={"w-full rounded-sm"} type={'button'} onClick={handleAddToBag}>
      {isPending ? (
        <EllipsisLoader />
      ) : (
        <Fragment>
          <Plus /> {transl('add_to_bag')}
        </Fragment>
      )}
    </Button>
  )
  return render
}

export default AddToBag
