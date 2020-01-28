import { useDarkModeManager } from '../contexts/LocalStorage'

const LIGHT_MODE = false
const DARK_MODE = true

// define theme colors
const WHITE = '#FFFFFF'
const BLACK = '#000000'

const BACKGROUND = {
  [LIGHT_MODE]: WHITE,
  [DARK_MODE]: BLACK
}
const TEXT = {
  [LIGHT_MODE]: BLACK,
  [DARK_MODE]: WHITE
}
const LINK = {
  [LIGHT_MODE]: '#0000EE',
  [DARK_MODE]: '#20C20E'
}

export default function useTheme() {
  const [isDarkMode] = useDarkModeManager()

  return {
    isDarkMode,
    colors: {
      background: BACKGROUND[isDarkMode],
      text: TEXT[isDarkMode],
      link: LINK[isDarkMode]
    }
  }
}
