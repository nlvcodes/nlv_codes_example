'use client'
import { LogOut } from 'lucide-react'
import { logout } from '../actions/logout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Logout = () => {

  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsPending(true)
    setError(null)

    const result = await logout()

    setIsPending(false)

    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'Logout failed')
    }
  }

  return <>
    {error && <p className="text-red-500">{error}</p>}
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={"text-emerald-950 rounded-md"}
    >
      {isPending ? "Logging out..." : <LogOut size={24} />}
    </button>
  </>
}

