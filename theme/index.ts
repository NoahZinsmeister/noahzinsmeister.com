import { lighten } from 'polished'

import { useDarkModeManager } from '../contexts/LocalStorage'

enum Mode {
  LIGHT,
  DARK
}

// define theme colors
const WHITE = '#FFFFFF'
const BLACK = '#000000'

const BACKGROUND = {
  [Mode.LIGHT]: WHITE,
  [Mode.DARK]: lighten(0.025, BLACK)
}
const TEXT = {
  [Mode.LIGHT]: BLACK,
  [Mode.DARK]: WHITE
}
const LINK = {
  [Mode.LIGHT]: '#0000EE',
  [Mode.DARK]: '#20C20E'
}

export default function useTheme() {
  const [isDarkMode] = useDarkModeManager()

  return {
    isDarkMode,
    colors: {
      background: BACKGROUND[isDarkMode ? Mode.DARK : Mode.LIGHT],
      text: TEXT[isDarkMode ? Mode.DARK : Mode.LIGHT],
      link: LINK[isDarkMode ? Mode.DARK : Mode.LIGHT]
    }
  }
}
