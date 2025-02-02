import { KEY } from "lib/constant"

export const themeToggle = (theme: string | undefined, systemTheme: string | undefined) => {
    if (theme === KEY.DARK) return 'night'
    if (theme === KEY.LIGHT) return 'flat'
    return systemTheme === KEY.DARK ? 'night' : 'flat'
  }
