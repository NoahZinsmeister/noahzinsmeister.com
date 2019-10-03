import { useBodyKeyDown } from '../hooks'
import { useDarkModeManager } from '../contexts/Cookie'
import SVGIcon, { GITHUB } from './SVGIcon'
import Emoji from './Emoji'
import Link from './Link'
import useTheme from '../theme'

export default function Layout({ children }) {
  const [isDarkMode, toggleDarkMode] = useDarkModeManager()
  const theme = useTheme()

  useBodyKeyDown('d', toggleDarkMode)

  return (
    <div className="root">
      <div className="header">
        <Emoji
          style={{ margin: '1rem' }}
          emoji={isDarkMode ? '🌘' : '🌔'}
          label={isDarkMode ? 'moon' : 'sun'}
          onClick={toggleDarkMode}
        />
      </div>

      <div className="body">{children}</div>

      <div className="footer">
        <Link style={{ margin: '1rem', lineHeight: 0 }} href="https://github.com/NoahZinsmeister/noahzinsmeister.com">
          <SVGIcon name={GITHUB} width="24px" fill={theme.colors.text} />
        </Link>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          width: 100vw;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .header {
          display: flex;
          flex: 0 1 auto;
          justify-content: flex-end;
        }

        .body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          align-items: center;
        }

        .footer {
          display: flex;
          flex: 0 1 auto;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  )
}
