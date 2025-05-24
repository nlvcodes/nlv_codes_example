import React from 'react'

import {Code} from './Component.client'

export type CodeBlockProps = {
  code: string,
  language?: string
  blockType: 'code'
  filename?: string
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({className, code, language, filename}) => {
  return <div className={`${[className].filter(Boolean).join(' ')} mx-4`}>
    <Code code={code} language={language} filename={filename} />
  </div>
}