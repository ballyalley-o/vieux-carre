export const colors = {
  grey: {
    50 : '#EEEFF1',
    100: '#D3D8DE',
    200: '#B6BFC8',
    300: '#99A5B2',
    400: '#8291A1',
    500: '#6C7E91',
    600: '#5F6f7F',
    700: '#4E5B68',
    800: '#3F4853',
    900: '#2D333B'
  },
  blue: {
    50 : '#E6F3FF',
    100: '#BAD9F5',
    200: '#8DBFEB',
    300: '#61A5E0',
    400: '#3D8CD6',
    500: '#1A73CC',
    600: '#1563B0',
    700: '#105294',
    800: '#0B4178',
    900: '#072F5C'
  },
  red: {
    50 : '#FEEEEE',
    100: '#FCC7C7',
    200: '#FA9F9F',
    300: '#F87777',
    400: '#F64F4F',
    500: '#F42727',
    600: '#D02323',
    700: '#AD1F1F',
    800: '#891B1B',
    900: '#651717'
  }
} as const

export const palette = {
  light: {
    background: {
      primary    : colors.grey[50],
      secondary  : colors.grey[100],
      tertiary   : colors.grey[200],
      destructive: colors.red[50]
    },
    text: {
      primary    : colors.grey[900],
      secondary  : colors.grey[700],
      tertiary   : colors.grey[500],
      destructive: colors.red[500]
    },
    border: {
      default    : colors.grey[200],
      hover      : colors.grey[300],
      focus      : colors.blue[400],
      destructive: colors.red[500]
    },
    action: {
      primary    : colors.blue[500],
      hover      : colors.blue[600],
      active     : colors.blue[700],
      disabled   : colors.grey[300],
      destructive: colors.red[500]
    },
    chart: {
      stroke : colors.grey[400],
      grid   : colors.grey[200],
      tooltip: colors.grey[50],
      series : [colors.blue[500], colors.blue[700], colors.grey[500], colors.grey[700]]
    }
  },
  dark: {
    background: {
      primary    : colors.grey[900],
      secondary  : colors.grey[800],
      tertiary   : colors.grey[700],
      destructive: colors.red[900]
    },
    text: {
      primary    : colors.grey[50],
      secondary  : colors.grey[200],
      tertiary   : colors.grey[400],
      destructive: colors.red[500]
    },
    border: {
      default    : colors.grey[700],
      hover      : colors.grey[600],
      focus      : colors.blue[400],
      destructive: colors.red[500]
    },
    action: {
      primary    : colors.blue[500],
      hover      : colors.blue[400],
      active     : colors.blue[300],
      disabled   : colors.grey[700],
      destructive: colors.red[500]
    },
    chart: {
      stroke : colors.grey[200],
      grid   : colors.grey[800],
      tooltip: colors.grey[900],
      series : [colors.blue[400], colors.blue[200], colors.grey[400], colors.grey[200]]
    }
  }
} as const

export type ColorScale = keyof typeof colors
export type ColorShade = keyof typeof colors.grey
export type ThemeMode  = keyof typeof palette

export const getColor = (scale: ColorScale, shade: ColorShade) => {
  return colors[scale][shade]
}