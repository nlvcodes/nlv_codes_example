import React from 'react'
// import {Roboto} from 'next/font/google'
import localFont from 'next/font/local'

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: '400',
// })

const pnt = localFont({
  src: [
    {path: './Proxima-Nova-Thin.otf', weight: '100', style: 'normal'},
    // {path: './Proxima-Nova-Thin-Italic.otf', weight: '100', style: 'italic'},
  ],
  preload: true,
  fallback: ['sans-serif'],
  adjustFontFallback: false,
  variable: '--brand-font',
})

export default function Layout({children}: { children: React.ReactNode}) {
  return (
    <main className={pnt.className}>
      <div>{children}</div>
    </main>
  )
}