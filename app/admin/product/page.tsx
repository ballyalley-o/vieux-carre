import { FC } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { formatCurrency, formatId, getAllProducts } from 'lib'
import { en } from 'public/locale'
import { FilePenLine, ListMinus, SquareArrowOutUpRight } from 'lucide-react'
import { Button, Table } from 'component/ui'
import { TblHead, TblBody, Pagination, DDMenu } from 'component/shared'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: 'Products | Admin' }

interface AdminProductsPageProps {
    searchParams: Promise<AppProductsPage<string>>
}
const AdminProductsPage: FC<AdminProductsPageProps> = async ({ searchParams }) => {
    const { page, query, category } = await searchParams
    const products                  = await getAllProducts({ query, page: Number(page) || 1, category })


    const MENU_ITEMS = (item: Product) =>  {
       return ([
            { label: en.view.label, icon: <SquareArrowOutUpRight />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()), withSeparator: true },
            { label: en.edit.label, icon: <FilePenLine />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()) },
            { label: en.delete.label, icon: <ListMinus />, href: PATH_DIR.ADMIN.PRODUCT }
        ])
    }

    type SevenCellType = TblCells<7>
    const HEAD: SevenCellType = {
        cells: [
            { id: 'productId',  value: 'Product Id', align: 'left' },
            { id: 'name',  value: 'Name', align: 'left' },
            { id: 'price',  value: 'Price', align: 'left' },
            { id: 'category',  value: 'Category', align: 'center' },
            { id: 'stock',  value: 'Stock', align: 'center' },
            { id: 'rating',  value: 'Rating', align: 'center' },
            { id: 'action',  value: '', align: 'right w-[100px]' },
        ]
    }

    const BODY = (item: Product): SevenCellType => ({
        cells: [
            { id: 'productId',  value: formatId(String(item.id)), align: 'left' },
            { id: 'name',  value: item.name, align: 'left' },
            { id: 'price',  value: formatCurrency(item.price), align: 'left' },
            { id: 'category',  value: item.category, align: 'center' },
            { id: 'stock',  value: item.stock, align: 'center' },
            { id: 'rating',  value: item.rating, align: 'center' },
            { id: 'action',  value: (<DDMenu title={en.action.label} menuItems={MENU_ITEMS(item)}/>), align: 'right' }
        ]
    })

    return (
    <div className={'space-y-2'}>
        <div className={'flex-between'}>
            <h1 className={'h2-bold'}>{en.product.products.label}</h1>
            <Button asChild variant={'ghost'}>
                <Link href={PATH_DIR.ADMIN.PRODUCT_CREATE}>{en.create_product.label}</Link>
            </Button>
        </div>
        <Table>
            <TblHead cells={HEAD.cells} />
            <TblBody cells={BODY} items={products.data as unknown as Product[]}/>
        </Table>
        {products?.totalPages && products?.totalPages > 1 && (
            <div className="mt-5 flex justify-end">
                <Pagination page={Number(page) || 1} totalPages={products.totalPages}/>
            </div>
        )}
    </div>
    );
}

export default AdminProductsPage;