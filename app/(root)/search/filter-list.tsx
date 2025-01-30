import { Fragment } from 'react'
import { en } from 'public/locale'
import Link from 'next/link'
import { Separator } from 'component/ui'

interface FilterListProps<T> {
  title: string
  items: T[]
  selectedValue: string
  getUrl: (value: string) => string
  formatLabel: (item: T) => string
  extractValue: (item: T) => string
}

const getActiveClass = (isActive: boolean) => (isActive ? 'font-bold' : '')

/**
 * A generic component that renders a list of filter options.
 *
 * @template T - The type of the items in the filter list.
 * @param {FilterSectionProps<T>} props - The props for the FilterList component.
 * @param {string} props.title - The title of the filter section.
 * @param {T[]} props.items - The list of items to display as filter options.
 * @param {string} props.selectedValue - The currently selected filter value.
 * @param {(value: string) => string} props.getUrl - A function to generate the URL for a given filter value.
 * @param {(item: T) => string} props.formatLabel - A function to format the label for a given item.
 * @param {(item: T) => string} props.extractValue - A function to extract the value from a given item.
 * @returns {JSX.Element} The rendered filter list component.
 */
const FilterList = <T,>({ title, items, selectedValue, getUrl, formatLabel, extractValue }: FilterListProps<T>) => {
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
                <Link href={getUrl(value)} className={getActiveClass(selectedValue === value)}>
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
