'use client'
import { CopyIcon, ClipboardCheck } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function CopyButton({ code, language = 'TypeScript', filename }: { code: string, language?: string, filename?: string }) {
  const [copied, setCopied] = useState(false)

  function updateCopyStatus() {
    if (!copied) {
      setCopied(() => true)
      toast.info('Code copied to clipboard!')
      setTimeout(() => {
          setCopied(() => false)
        }, 5000,
      )
    }
  }

  return <div className={`w-full text-emerald-50/75 flex ${filename ? 'justify-between' : 'justify-end'} font-sans items-center flex-wrap py-2`}>
    {filename && <p>
          {filename}
        </p>}
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(code)
        updateCopyStatus()
      }}
      className={`flex my-4 gap-4 ${!copied ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      disabled={copied}
    >

      <div className={`flex gap-2 items-center ${!copied ? 'opacity-100' : 'opacity-50'}`}>{language && !copied ? language.toLowerCase() : 'copied!'}
        {copied
          ? <ClipboardCheck className={`stroke-emerald-50 h-4 w-4`} />
          : <CopyIcon className={`stroke-emerald-50 h-4 w-4`} />}
      </div>
    </button>
  </div>

}