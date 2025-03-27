import React, { useState } from 'react'
import {Loader} from 'lucide-react'

export default function SubmitButton({loading, text}: {loading: boolean, text: string}): React

  .ReactElement {
  return <button
    type={'submit'}
    className={`bg-emerald-950 text-emerald-50 p-2 w-full rounded-md`}
    disabled={loading}
  >
    {text}{" "}
    <Loader className={`animate-spin ${loading ? 'inline-block' : 'hidden'}`} />
  </button>
}