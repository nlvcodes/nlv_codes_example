import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
})

const pn = localFont({
  // src: './Proxima-Nova-Thin.otf',
  src: [
    { path: './Proxima-Nova-Thin.otf', weight: '100', style: 'normal' },
  ],
  preload: true,
	fallback: ['system-ui'],
	adjustFontFallback: 'Arial',
	variable: '--brand-font'
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main lang="en"
          // className={roboto.className}
      className={pn.className}
    >
      <div>{children}</div>
    </main>
  )
}