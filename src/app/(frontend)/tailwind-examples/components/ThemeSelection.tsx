'use client'
import React, {useEffect, useState} from 'react'
import {Lightbulb, LightbulbOff, X} from 'lucide-react'

export const ThemeSelection = ({ children }: { children: React.ReactNode }) => {
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (event: MediaQueryListEvent) => {
      localStorage.removeItem('theme')
      setIsDarkMode(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

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

  return <main className={`dark:bg-violet-950`}>
    <div className={`flex items-center justify-center gap-4 py-4`}>
      {isDarkMode ? <LightbulbOff onClick={toggleDarkMode} className={`dark:stroke-yellow-100`} /> :
        <Lightbulb onClick={toggleDarkMode} />
    }
      <X onClick={removeTheme} className={`dark:stroke-violet-50`} />
    </div>
    {children}
  </main>

}