import { PATH_DIR } from 'vc.dir'
import { Search as SearchIcon } from 'lucide-react'
import { getAllCategories } from 'lib/action'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, Input, Button } from 'component/ui'
import { transl } from 'lib/util'

const Search = async () => {
  const data       = await getAllCategories()
  const categories = [{ category: transl('all.label') }, ...data]

  return (
    <form action={PATH_DIR.SEARCH} method={'GET'}>
      <div className={"flex w-full max-w sm items-center space-x-2"}>
        <Select name={'category'}>
          <SelectTrigger className={'w-[180px]'}>
            <SelectValue placeholder={transl('all.label')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category.category}>{category.category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input name={'query'} type={'text'} placeholder={transl('search.placeholder')} className={'md:w-[100px] lg:w-[300px]'}/>
        <Button size={'sm'} variant={'ghost'}>
            <SearchIcon />
        </Button>
      </div>
    </form>
  )
}

export default Search
