import { GLOBAL } from "vieux-carre"
import { joinServer, join } from "lib/util/join"



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
  LOGO_PRODUCTION    : joinServer(GLOBAL.SERVER_URL, 'image/svg/vieux-carre-red.svg'),
  LOGO_PRODUCTION_PNG: joinServer(GLOBAL.SERVER_URL, 'image/png/vieux-carre-red.png'),
  PROMO              : join('image', 'promo', 'promo.png'),
}
