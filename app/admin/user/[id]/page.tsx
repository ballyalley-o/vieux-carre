import { FC, Fragment } from 'react'
import { Metadata } from 'next'
import { en } from 'public/locale'
import { getUserById, generateTitle } from 'lib'
import { notFound } from 'next/navigation'
import { UserAccountForm } from 'component/admin'
import { FormBackBtn } from 'component/shared/btn'
import { PATH_DIR } from 'config'

export const metadata: Metadata = { title: generateTitle('Update Product', 'Admin') }

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
        <h1 className="h2-bold">{en.update_user.label}</h1>
        <UserAccountForm user={user as UpdateUserAccount} />
    </Fragment>
  )
}

export default AdminUserUpdatePage
