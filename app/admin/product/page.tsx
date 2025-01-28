import { FC } from 'react'
import { en } from 'public/locale'
import { Metadata } from 'next'
import Link from 'next/link'
import { formatCurrency, formatId, getAllProducts, deleteProduct, generateTitle } from 'lib'
import { FilePenLine, ListMinus, SquareArrowOutUpRight, Ellipsis, XIcon } from 'lucide-react'
import { Button, Table, Badge } from 'component/ui'
import { TblHead, TblBody, Pagination, DDMenu, DeleteDialg, TooltpGoBadge, Tooltp, LinkBtn } from 'component/shared'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: generateTitle(en.product.products.label, 'Admin') }

interface AdminProductsPageProps {
    searchParams: Promise<AppProductsPage<string>>
}
const AdminProductsPage: FC<AdminProductsPageProps> = async ({ searchParams }) => {
    const { page, query, category } = await searchParams
    const products                  = await getAllProducts({ query, page: Number(page) || 1, category })

    const MENU_ITEMS = (item: Product) =>  {
       return ([
            { label: en.view.label, icon: <SquareArrowOutUpRight />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()) },
            { label: en.edit.label, icon: <FilePenLine />, href: PATH_DIR.ADMIN.PRODUCT_VIEW(item.id.toString()) },
            { label: <DeleteDialg id={item.id.toString()} action={deleteProduct}><p className={'text-sm'}>{en.delete.label}</p></DeleteDialg>, icon: <ListMinus />, href: PATH_DIR.ADMIN.PRODUCT }
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
            { id: 'productId',  value: <TooltpGoBadge trigger={formatId(item.id.toString())} href={PATH_DIR.PRODUCT_VIEW(item.slug.toString())} content={`${en.go_to.label} this Product`} />, align: 'left' },
            { id: 'name',  value: item.name, align: 'left' },
            { id: 'price',  value: formatCurrency(item.price), align: 'left' },
            { id: 'category',  value: item.category, align: 'center' },
            { id: 'stock',  value: item.stock, align: 'center' },
            { id: 'rating',  value: item.rating, align: 'center' },
            { id: 'action',  value: (<Tooltp content={en.action.label}><DDMenu title={<Ellipsis size={10} />} menuItems={MENU_ITEMS(item)}/></Tooltp>), align: 'right' }
        ]
    })

    return (
    <div className={'space-y-2'}>
        <div className={'flex-between'}>
            <div className="space-y-4 gap-3">
                <h1 className={'h2-bold'}>{en.product.products.label}</h1>
                {query && (
                    <div className={'flex items-center align-center space-x-2'}>
                        <p className={'text-sm'}> &nbsp;{en.filtered_by.label}:</p> <span><div className={'align-center'}> <Badge variant={'secondary'}><i>{query}</i></Badge> <LinkBtn href={PATH_DIR.ADMIN.PRODUCT} variant={'ghost'} size={'sm'} className={'py-0 px-2'}><XIcon size={15}/></LinkBtn></div></span>
                    </div>
                )}
            </div>
            <Button asChild variant={'outline'}>
                <Link href={PATH_DIR.ADMIN.PRODUCT_CREATE}>{en.create_product.label}</Link>
            </Button>
        </div>
        <Table>
            <TblHead cells={HEAD.cells} />
            <TblBody cells={BODY} items={products.data as unknown as Product[]}/>
        </Table>
        {products.totalPages === 0 && (<div className={'flex justify-center space-y-6'}> <p className={'text-center text-2xl text-muted-foreground'}>{en.zero_results.label}</p></div>)}
        {products.totalPages > 1 && (
            <div className="mt-5 flex justify-end">
                <Pagination page={Number(page) || 1} totalPages={products.totalPages}/>
            </div>
        )}
    </div>
    );
}

export default AdminProductsPage;