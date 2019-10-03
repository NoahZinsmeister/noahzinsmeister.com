import { useDarkModeManager } from '../contexts/Cookie'

const LIGHT_MODE = false
const DARK_MODE = true

// define theme colors
const WHITE = '#FFFFFF'
const BLACK = '#000000'
const BACKGROUNDS = {
  [LIGHT_MODE]: WHITE,
  [DARK_MODE]: BLACK
}
const TEXTS = {
  [LIGHT_MODE]: BLACK,
  [DARK_MODE]: WHITE
}
const LINKS = {
  [LIGHT_MODE]: '#0000EE',
  [DARK_MODE]: '#20C20E'
}

export default function useTheme() {
  const [isDarkMode] = useDarkModeManager()

  return {
    isDarkMode,
    colors: {
      background: BACKGROUNDS[isDarkMode],
      text: TEXTS[isDarkMode],
      link: LINKS[isDarkMode]
    }
  }
}
