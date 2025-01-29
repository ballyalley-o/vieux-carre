import { en } from 'public/locale'
import Link from 'next/link'
import { getAllCategories } from 'lib'
import { Logs } from 'lucide-react'
import { Button, Drawer, DrawerContent, DrawerTitle, DrawerTrigger, DrawerHeader, DrawerClose, Badge } from 'component/ui'
import { PATH_DIR } from 'config'

const CategoryDrwr = async () => {
const categories = await getAllCategories()
  return (
    <Drawer direction={'left'}>
      <DrawerTrigger asChild>
        <Button variant={'ghost'}>
          <Logs size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={'h-full max-w-sm rounded-sm'}>
        <DrawerHeader>
          <DrawerTitle>{en.select_by_category.label}</DrawerTitle>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <Button key={index} variant={'ghost'} className={'w-full justify-start'} asChild>
                <DrawerClose asChild>
                  <Link href={PATH_DIR.SEARCH_CATEGORY(category.category)} className={'w-full justify-between'}>
                  {category.category} <Badge variant={'secondary'}>{category._count}</Badge>
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}

export default CategoryDrwr
