import { FC } from 'react'
import { en } from 'public/locale'
import { Pencil } from 'lucide-react'
import LinkBtn from './link-btn'

interface EditBtnProps {
    href    : string
    variant?: ButtonVariant
}

const EditBtn: FC<EditBtnProps> = ({ href, variant }) => {
    return (
      <LinkBtn href={href} variant={variant}>
        <Pencil className={'default-size_icon'} />
        {en.edit.label}
      </LinkBtn>
    )
}

export default EditBtn