import { Fragment } from 'react'
import { en } from 'public/locale'
import Link from 'next/link'
import { Separator } from 'component/ui'

interface FilterSectionProps<T> {
  title: string
  items: T[]
  selectedValue: string
  getUrl: (value: string) => string
  formatLabel: (item: T) => string
  extractValue: (item: T) => string
}

const getActiveClass = (isActive: boolean) => (isActive ? 'font-bold' : '')
const FilterList = <T,>({ title, items, selectedValue, getUrl, formatLabel, extractValue }: FilterSectionProps<T>) => {
  return (
    <Fragment>
      <div className="text-xl mb-5 mt-3">{title}</div>
      <div className={'mb-5'}>
        <ul className={'space-y-4'}>
          <li>
            <Link className={getActiveClass(selectedValue === 'all')} href={getUrl('all')}>
              {en.any.label}
            </Link>
          </li>
          {items.map((_i, index) => {
            const value = extractValue(_i)
            return (
              <li key={index}>
                <Link href={getActiveClass(selectedValue === value)} className={getUrl(value)}>
                 {formatLabel(_i)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <Separator />
    </Fragment>
  )
}

export default FilterList
