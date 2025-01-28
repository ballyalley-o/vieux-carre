import { FC } from 'react'
import { en } from 'public/locale'
import { Metadata } from 'next'
import { generateTitle, getAllUsers, KEY } from 'lib'
import { notFound } from 'next/navigation'
import { formatId, deleteUser, cn } from 'lib'
import { FilePenLine, Ellipsis, ListMinus, Crown } from 'lucide-react'
import { Table, Badge } from 'component/ui'
import { PageTitle } from 'component/admin'
import { TblBody, TblHead, DeleteDialg, TooltpGoBadge, DDMenu, Tooltp, Pagination, NoResult } from 'component/shared'
import { PATH_DIR } from 'config'

export const metadata: Metadata= { title: generateTitle(en.user.users.label, 'Admin') }

interface AdminUsersPageProps {
    searchParams: Promise<AppUser<number>>
}

const AdminUsersPage: FC<AdminUsersPageProps> = async ({ searchParams }) => {
    const { page, query } = await searchParams
    const users    = await getAllUsers({ page: Number(page) || 1, query })
    if (!users) return notFound()
    const isAdmin = (role: string) => role === KEY.ADMIN

    const MENU_ITEMS = (item: User) =>  {
        return ([
                { label: en.edit.label, icon: <FilePenLine />, href: PATH_DIR.ADMIN.USER_VIEW(item.id.toString()) },
                { label: <DeleteDialg id={item.id} action={deleteUser}><p className={'text-sm'}>{en.delete.label}</p></DeleteDialg>, icon: <ListMinus />, href: PATH_DIR.ADMIN.USER }
            ])
        }

    type FiveCellType = TblCells<5>
    const HEAD: FiveCellType = {
        cells: [
            { id: 'userId',  value: 'User Id', align: 'left' },
            { id: 'name',  value: 'Name', align: 'left' },
            { id: 'email',  value: 'Email', align: 'left' },
            { id: 'role',  value: 'Role', align: 'center' },
            { id: 'action',  value: '', align: 'center' },
        ]
    }

    const BODY = (item: User): FiveCellType => ({
        cells: [
            { id: 'userId',  value: <TooltpGoBadge trigger={formatId(item.id.toString())} href={PATH_DIR.ADMIN.USER_VIEW(item.id.toString())} content={`${en.go_to.label} to ${item.name}`} />, align: 'left' },
            { id: 'name',  value: item.name, align: 'left' },
            { id: 'email',  value: item.email, align: 'left' },
            { id: 'role',  value: <Badge variant={!isAdmin(item.role) ? 'secondary' : 'default'} className={cn('shadow-none', isAdmin(item.role) && 'bg-blue-600')}>{isAdmin(item.role) && (<Crown size={10} className={'opacity-50'} />)}{(item.role).toUpperCase()}</Badge>, align: 'center' },
            { id: 'action',  value: (<Tooltp content={en.action.label}><DDMenu title={<Ellipsis size={10} />} menuItems={MENU_ITEMS(item)}/></Tooltp>), align: 'right' }
        ]
    })

    return (
      <div className="space-y-2" suppressHydrationWarning>
        <PageTitle query={query} title={en.user.users.label} href={PATH_DIR.ADMIN.USER} />
        <Table>
          <TblHead cells={HEAD.cells} />
          <TblBody items={users.data as unknown as User[]} cells={BODY} />
        </Table>
        <NoResult data={users.totalPages} />
        {users.totalPages > 1 && (
          <div className="mt-5 flex justify-end">
            <Pagination page={Number(page) || 1} totalPages={users.totalPages} />
          </div>
        )}
      </div>
    )
}

export default AdminUsersPage