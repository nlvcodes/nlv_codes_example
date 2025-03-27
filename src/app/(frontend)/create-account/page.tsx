import React from 'react'
import CreateForm from './components/createForm'


export default async function Page(): Promise<React.ReactElement> {
  return <div className={`h-[calc(100vh-50px)] bg-emerald-50/20`}>
    <CreateForm />
  </div>
}