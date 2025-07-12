import { PATH_DIR } from 'vc.dir'
import Link from 'next/link'
import { Button } from 'component/ui'
import { transl } from 'lib'

const ProductBtn = () => {
  return (
    <div className={'flex justify-center items-center my-8'}>
      <Button asChild variant={'ghost'} className={'px-8 py-4 text-lg font-semibold'}>
        <Link href={PATH_DIR.SEARCH}>{transl('view_all_products.label')}</Link>
      </Button>
    </div>
  )
}

export default ProductBtn
