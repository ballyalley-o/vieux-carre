import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { getUserById, generateTitle, transl } from 'lib'
import { notFound } from 'next/navigation'
import { UserAccountForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: generateTitle(transl('update_product.label'), transl('admin.label')) }

interface AdminUserUpdatePageProps {
  params: Promise<{ id: string }>
}
const AdminUserUpdatePage: FC<AdminUserUpdatePageProps> = async ({ params }) => {
  const { id } = await params
  const user   = await getUserById(id)
  if (!user) return notFound()
  return (
    <Fragment>
        <FormBackBtn href={PATH_DIR.ADMIN.USER} withLink />
        <h1 className="h2-bold">{transl('update_user.label')}</h1>
        <UserAccountForm user={{ ...user, address: user.address as ShippingAddress} as UpdateUserAccount} />
    </Fragment>
  )
}

export default AdminUserUpdatePage
