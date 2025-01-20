import { en } from "public/locale"
import { join } from "lib"

export const NAV_CONFIG = [
    { title: en.navigation.account.label, href: join('user', 'account') },
    { title: en.navigation.order.label, href: join('user', 'order') },
]

export const NAV_CONFIG_ADMIN = [
    { title: en.overview.label, href: join('admin', 'overview') },
    { title: en.product.label, href: join('admin', 'product') },
    { title: en.order.label, href: join('admin', 'order') },
    { title: en.user.label, href: join('admin', 'user') },
]