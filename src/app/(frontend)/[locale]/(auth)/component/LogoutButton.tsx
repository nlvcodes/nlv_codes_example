'use client'

import {LogOut} from 'lucide-react'
import {logout} from '../actions/logout'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsLoading(true)
    setError(null)

    const result = await logout()

    setIsLoading(false)

    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'Logout failed')
    }
  }

  return <>
    {error && <p className={`text-red-400`}>{error}</p>}
    <button onClick={handleLogout} disabled={isLoading}
            className={`px-2 py-1 cursor-pointer flex items-center text-emerald-50 fill-emerald-50 rounded-md border border-emerald-50`}
    >
      {isLoading ? 'Logging out...' : <div className={`flex items-center justify-start gap-4`}>
        <LogOut size={24} />
        <p>Logout</p>
      </div>}
    </button>
  </>

}