'use client'
import { use } from 'react'

export default function Pages({ pages }: { pages: Promise<{ id: string; updatedAt: string }[]> }) {
  const allPages = use(pages)

  return (
    <ul>
      {allPages.map((page) => (
        <li key={page.id}>{page.updatedAt}</li>
      ))}
    </ul>
  )
}