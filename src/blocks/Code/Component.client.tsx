'use client'
import {Highlight, themes} from 'prism-react-renderer'
import React from 'react'
import {CopyButton} from './CopyButton'

type Props = {
  code: string
  language?: string
  filename?: string
}

export const Code: React.FC<Props> = ({code, language = '', filename}) => {
  if (!code) return null

  return <Highlight language={language} code={code} theme={themes.vsDark}>
    {({getLineProps, getTokenProps, tokens}) => (
      <pre className={`bg-gray-950 px-4 pb-8 text-xs rounded-md overflow-x-auto text-wrap`}>
        <CopyButton code={code} language={language} filename={filename} />
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({className: 'table-row', line})}>
            <span className={`table-cell select none text-right text-white/25`}>{ i + 1 }</span>
            <span className={'table-cell pl-4'}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token})} />
              ))}
            </span>
          </div>
        ))}
      </pre>
    )}
  </Highlight>
}
