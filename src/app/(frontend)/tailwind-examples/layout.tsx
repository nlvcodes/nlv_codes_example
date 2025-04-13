import { ThemeSelection } from './components/ThemeSelection'
import React from 'react'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeSelection>
      {children}
    </ThemeSelection>
  )
}