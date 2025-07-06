import { GLOBAL } from "vieux-carre"
import { connectUrl, connect } from "lib/util/connect"



export const ASSET_DIR = {
  ICON               : {
    GOOGLE: '/image/svg/google.svg'
  },
  LOGO               : '/image/svg/vieux-carre.svg',
  LOGO_DARK          : '/image/svg/vieux-carre-white.svg',
  LOGO_RED           : '/image/svg/vieux-carre-red.svg',
  LOGO_BLK           : '/image/svg/vieux-carre-blk.svg',
  LOGO_GRAY          : '/image/svg/vieux-carre-grey.svg',
  TEST               : '/image/svg/logo.svg',
  LOGO_PRODUCTION    : connectUrl(GLOBAL.SERVER_URL, 'image/svg/vieux-carre-red.svg'),
  LOGO_PRODUCTION_PNG: connectUrl(GLOBAL.SERVER_URL, 'image/png/vieux-carre-red.png'),
  PROMO              : connect('image', 'promo', 'promo.png'),
}
