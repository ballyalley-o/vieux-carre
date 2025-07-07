import { connect } from "lib/util/connect"
import { transl } from 'lib/util/translate'

export const NAV_CONFIG = [
    { title: transl('navigation.account.label'), href: connect('user', 'account') },
    { title: transl('navigation.order.label'), href: connect('user', 'order') },
]

export const NAV_CONFIG_ADMIN = [
    { title: transl('overview.label'), href: connect('admin', 'overview') },
    { title: transl('product.label'), href: connect('admin', 'product') },
    { title: transl('order.label'), href: connect('admin', 'order') },
    { title: transl('user.label'), href: connect('admin', 'user') },
]