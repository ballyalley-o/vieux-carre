
import { useTheme } from 'next-themes'
import { palette, ThemeMode } from 'asset/style'

export const useAppColors = () => {
  const { theme } = useTheme()
  return palette[theme as ThemeMode] || palette.light
}
