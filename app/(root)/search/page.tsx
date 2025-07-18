export const dynamic = 'force-dynamic'
import { FC, Fragment } from 'react'
import { PATH_DIR } from 'vc.dir'
import { getAllProducts, getAllCategories, PRICE, RATING, KEY, SORT_ORDER, transl } from 'lib'
import { NoResult, ProductCard, LinkBtn } from 'component/shared'
import { NoScrollBtn } from 'component/shared/btn'
import FilterList from './filter-list'
import FilterTitle from './filter-title'

const DEFAULT_QUERY = KEY.ALL
interface SearchPageProps {
  searchParams: Promise<AppSearchPage<string>>
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { query = DEFAULT_QUERY, category = DEFAULT_QUERY, price = DEFAULT_QUERY, rating = DEFAULT_QUERY } = await searchParams

  const isQuery    = query && query       !== DEFAULT_QUERY && query.trim()    !== ''
  const isCategory = category && category !== DEFAULT_QUERY && category.trim() !== ''
  const isPrice    = price && price       !== DEFAULT_QUERY && price.trim()    !== ''
  const isRating   = rating && rating     !== DEFAULT_QUERY && rating.trim()   !== ''

  if (isQuery || isCategory || isPrice || isRating) {
    return {
      title: transl('search.label') + `${isQuery ? query : ''} ${isCategory ? `${transl('category.label')}: ${category}` : ''} ${isPrice ? `${transl('price.label')}: ${price}` : ''} ${isRating ? `${transl('rating.label')}: ${rating}` : ''}`,
    }
  } else {
    return {
      title: transl('search_product.label'),
    }
  }
}

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { query = DEFAULT_QUERY, category = DEFAULT_QUERY, price = DEFAULT_QUERY, rating = DEFAULT_QUERY, sort = KEY.NEWEST, page = '1' } = await searchParams

  const getFilterUrl = ({ _category , _price, _rating, _sort, _page }:{ _category?: string, _price?: string, _rating?: string, _sort?: string, _page?: string})  => {
    const params = { query, category, price, rating, sort, page }
    if (_category) params.category = _category
    if (_price) params.price       = _price
    if (_rating) params.rating     = _rating
    if (_sort) params.sort         = _sort
    if (_page) params.page         = _page

    return PATH_DIR.SEARCH_QUERY(new URLSearchParams(params).toString())
  }

  const [products, categories] = await Promise.all([getAllProducts({ query, category, price, rating, sort, page: Number(page) }), getAllCategories()])

  return (
    <Fragment>
      <div className={"grid md:grid-cols-5 md:gap-5"}>
        <div className={"filter-links"}>
         <FilterList
          title={transl('category.label')}
          items={categories}
          selectedValue={category}
          getUrl={(value ) => getFilterUrl({ _category: value })}
          formatLabel={(item) => item.category}
          extractValue={(item) => item.category}
         />
         <FilterList
          title={transl('price.prices.label')}
          items={PRICE}
          selectedValue={price}
          getUrl={(value) => getFilterUrl({ _price: value })}
          formatLabel={(item) => item.name}
          extractValue={(item) => item.value}
        />
        <FilterList
          title={transl('rating.label')}
          items={RATING}
          selectedValue={rating}
          getUrl={(value) => getFilterUrl({ _rating: value })}
          formatLabel={(item) => `${item} stars +`}
          extractValue={(item) => item.toString()}
        />
        </div>
        <div className={"md:col-span-4 space-y-4"}>
          <div className={"flex-between flex-col md:flex-row my-4"}>
            <div className={"flex items-center"}>
              {query !== DEFAULT_QUERY && query !== '' && (<FilterTitle href={PATH_DIR.SEARCH} filter={query} filterTypeLabel={transl('query.label') || ''}  /> )}
              {category !== DEFAULT_QUERY && category !== '' && (<FilterTitle href={getFilterUrl({ _category: DEFAULT_QUERY })} filter={category} filterTypeLabel={transl('category.label') || ''}  /> )}
              {price !== DEFAULT_QUERY && (<FilterTitle href={getFilterUrl({ _price: DEFAULT_QUERY })} filter={price} filterTypeLabel={transl('price.label') || ''}  /> )}
              {rating !== DEFAULT_QUERY && (<FilterTitle href={getFilterUrl({ _rating: DEFAULT_QUERY })} filter={`${rating} stars +`} filterTypeLabel={transl('rating.label') || ''}  /> )}
              {(category !== DEFAULT_QUERY || price !== DEFAULT_QUERY || rating !== DEFAULT_QUERY) && <LinkBtn href={PATH_DIR.SEARCH} variant={'ghost'} size={'sm'} className={'py-0 px-2 text-red-500'}>{transl('clear.label')}</LinkBtn>}
            </div>
            <div className="">
              {transl('sort_by.label')}:
              {SORT_ORDER.map((_item, index) => (
                <NoScrollBtn key={index} href={getFilterUrl({ _sort: _item})}  className={`mx-2 ${sort === _item && 'font-bold'}`}>{_item}</NoScrollBtn>
              ))}
            </div>
          </div>
        <div className={"grid grid-cols-2 gap-4 md:grid-cols-3"}>
            {products.data.length <=0  && <NoResult data={products.data.length} />}
            {products.data.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SearchPage
