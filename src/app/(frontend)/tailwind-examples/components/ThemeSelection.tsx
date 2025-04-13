'use client'

import React, { useEffect, useState } from 'react'
import { Lightbulb, LightbulbOff, X } from 'lucide-react'


export const ThemeSelection = ({ children }: { children: React.ReactNode }) => {

  // checks if theme value exists or what the user's preferences are
  const initialState = () => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) {
        return storedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialState)

  // apply the theme and store it in localStorage
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      localStorage.removeItem('theme')
      setIsDarkMode(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Update DOM and localStorage when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((current) => !current)
  }

  const removeTheme = () => {
    localStorage.removeItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(systemPrefersDark)
  }

  return <main className={'dark:bg-violet-950'}>
    <div className={`flex items-center justify-center gap-4 py-4`}>
      {isDarkMode ?
        <LightbulbOff className={`dark:stroke-yellow-100`} onClick={toggleDarkMode} /> :
        <Lightbulb onClick={toggleDarkMode} />
      }
      <X onClick={removeTheme} className={`dark:stroke-violet-50`} />
    </div>
    {children}
  </main>
}