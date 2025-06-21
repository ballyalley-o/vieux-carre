import { join } from "lib/util/join"
import { transl } from 'lib/util/translate'

export const NAV_CONFIG = [
    { title: transl('navigation.account.label'), href: join('user', 'account') },
    { title: transl('navigation.order.label'), href: join('user', 'order') },
]

export const NAV_CONFIG_ADMIN = [
    { title: transl('overview.label'), href: join('admin', 'overview') },
    { title: transl('product.label'), href: join('admin', 'product') },
    { title: transl('order.label'), href: join('admin', 'order') },
    { title: transl('user.label'), href: join('admin', 'user') },
]