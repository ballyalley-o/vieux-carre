import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import { getAllProducts, getAllCategories, PRICE, RATING } from 'lib'
import { NoResult, ProductCard } from 'component/shared'
import { PATH_DIR } from 'config'
import FilterList from './filter-list'

interface SearchPageProps {
  searchParams: Promise<AppSearchPage<string>>
}
const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { query = 'all', category = 'all', price = 'all', rating = 'all', sort = 'newest', page = '1' } = await searchParams

  const getFilterUrl = ({ _category , _price, _rating, _sort, _page }:{ _category?: string, _price?: string, _rating?: string, _sort?: string, _page?: string})  => {
    const params = { query, category, price, rating, sort, page }
    if (_category) params.category = _category
    if (_price) params.price       = _price
    if (_rating) params.rating     = _rating
    if (_sort) params.sort         = _sort
    if (_page) params.page         = _page

    return PATH_DIR.SEARCH_QUERY(new URLSearchParams(params).toString())
  }

  const products   = await getAllProducts({ query, category, price, rating, sort, page: Number(page) })
  const categories = await getAllCategories()

  return (
    <Fragment>
      <div className="grid md:grid-cols-5 md:gap-5">
        <div className="filter-links">
         <FilterList
          title={en.category.label}
          items={categories}
          selectedValue={category}
          getUrl={(value ) => getFilterUrl({ _category: value })}
          formatLabel={(item) => item.category}
          extractValue={(item) => item.category}
         />
         <FilterList
          title={en.price.prices.label}
          items={PRICE}
          selectedValue={price}
          getUrl={(value) => getFilterUrl({ _price: value })}
          formatLabel={(item) => item.name}
          extractValue={(item) => item.value}
        />
        <FilterList
          title={en.rating.label}
          items={RATING}
          selectedValue={rating}
          getUrl={(value) => getFilterUrl({ _rating: value })}
          formatLabel={(item) => `${item} stars and up`}
          extractValue={(item) => item.toString()}
        />
        </div>
        <div className="md:col-span-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {products.data.length <=0  && <NoResult data={products.data.length} />}
            {products.data.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SearchPage
