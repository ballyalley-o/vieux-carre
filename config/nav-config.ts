import { en } from "public/locale"
import { join } from "lib"

export const NAV_CONFIG = [
    { title: en.navigation.account.label, href: join('user', 'account') },
    { title: en.navigation.order.label, href: join('user', 'order') },
]