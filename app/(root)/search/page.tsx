import { FC, Fragment } from 'react'
import { en } from 'public/locale'
import Link from 'next/link'
import { getAllProducts, getAllCategories } from 'lib'
import { NoResult, ProductCard } from 'component/shared'
import { PATH_DIR } from 'config'

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
          <div className="text-xl mb-2 mt-3">{en.department.label}</div>
          <div>
            <ul className={'space-y-1'}>
              <li>
                <Link className={`${(category === 'all' || category === '') && 'font-bold'}`} href={getFilterUrl({ _category:'all' })}>{en.any.label}</Link>
              </li>
              {categories.map((_c, index) => (
                <li key={index}>
                  <Link href={getFilterUrl({ _category: _c.category })} className={`${category === _c.category && 'font-bold'}`}>{_c.category}</Link>
                </li>
              ))}
            </ul>
          </div>
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
