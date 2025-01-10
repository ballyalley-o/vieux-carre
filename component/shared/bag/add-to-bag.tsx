'use client'

import { Fragment, FC } from 'react'
import { useRouter } from 'next/navigation'
import { Minus, Plus } from 'lucide-react'
import { useToast } from 'hook'
import { addItemToBag, removeItemFromBag } from 'lib/action'
import { Button, ToastAction } from 'component/ui'
import { PATH_DIR } from 'config'
import { en } from 'public/locale'

interface AddToBagProps {
  item: BagItem
  bag?: Bag
}

const AddToBag: FC<AddToBagProps> = ({ bag, item }) => {
  const router = useRouter()
  const { toast } = useToast()
  const existItem = bag && bag.items.find((x) => x.productId === item.productId)

  const handleAddToBag = async () => {
    const response = await addItemToBag(item)
    if (!response.success) {
      toast({ variant: 'destructive', description: response.message })
      return
    }
    toast({
      description: response.message,
      action: (
        <ToastAction className="bg-primary text-white hover:bg-gray-800" altText="Go to Bag" onClick={() => router.push(PATH_DIR.BAG)}>
          {en.go_to_bag}
        </ToastAction>
      )
    })
  }

  const handleRemoveFromBag = async () => {
    const response = await removeItemFromBag(item.productId)
    toast({ variant: response.success ? 'default' : 'destructive', description: response.message })
    return
  }

  const render = existItem ? (
    <Fragment>
      <Button type={'button'} variant={'outline'} onClick={handleRemoveFromBag} className="shadow-none rounded-sm">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-5 font-bold">{existItem.qty}</span>
      <Button type={'button'} variant={'outline'} onClick={handleAddToBag} className="shadow-none rounded-sm">
        <Plus className="h-4 w-4" />
      </Button>
    </Fragment>
  ) : (
    <Button className="w-full rounded-sm" type={'button'} onClick={handleAddToBag}>
      <Plus /> {en.add_to_bag}
    </Button>
  )
  return render
}

export default AddToBag
