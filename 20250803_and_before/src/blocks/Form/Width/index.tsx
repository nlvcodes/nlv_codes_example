import React from 'react'

export const Width = ({children, width}: {children: React.ReactNode, width: string}) => {
  let calcWidth: string
  switch (width) {
    case 'full':
      calcWidth = '100%'
      break
    default:
      calcWidth = `calc(${width} * 100% - 0.5rem)`
      break
  }

  return <div style={{flexBasis: calcWidth}}>
    {children}
  </div>
}