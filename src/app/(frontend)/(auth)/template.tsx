import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import {getUser} from './actions/getUser'

interface Props {
  children: ReactNode
}

const Template: React.FC<Props> = async ({children}) => {
  const user = await getUser()
  if (!user) {
    redirect('/login')
    return null
  }
  return <>{children}</>
}

export default Template