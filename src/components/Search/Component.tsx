"use client"

import React, {useState, useEffect} from 'react'
import {useDebounce} from '@/utilities/useDebounce'
import {useRouter} from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <form
    onSubmit={(e) => {
      e.preventDefault()
    }}>
      <label htmlFor={'search'} className={`sr-only`}>Search</label>
      <input id={'search'}
             onChange={(e) => setValue(e.target.value)}
             placeholder={'Search'}
             className={`border border-emerald-950 text-emerald-950 rounded-md px-4 py-2`}
      />
      <button type={'submit'} className={`sr-only`}>submit</button>
    </form>
  )
}