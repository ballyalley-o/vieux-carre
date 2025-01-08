'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { useToast } from 'hook'
import { addItemToBag } from 'lib/action'
import { Button, ToastAction } from 'component/ui'
import { PATH_DIR } from 'config'

interface AddToBagProps {
  item: BagItem
}

const AddToBag: FC<AddToBagProps> = ({ item }) => {
  const router = useRouter()
  const { toast } = useToast()
  const handleAddToBag = async () => {
    const response = await addItemToBag(item)

    if (!response.success) {
      toast({ variant: 'destructive', description: response.message })
      return
    }
    toast({
      description: `${item.name} added to Bag`,
      action: (
        <ToastAction className="bg-primary text-white hover:bg-gray-800" altText="Go to Bag" onClick={() => router.push(PATH_DIR.BAG)}>
          {'Go to Bag'}
        </ToastAction>
      )
    })
  }
  return (
    <Button className="w-full rounded-sm" type={'button'} onClick={handleAddToBag}>
      <Plus /> {'Add to Bag'}
    </Button>
  )
}

export default AddToBag
