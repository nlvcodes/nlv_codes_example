'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {Check} from 'lucide-react'
import React from 'react'

const Checkbox: React.FC<{
  ref?: React.Ref<HTMLButtonElement>
} & React.ComponentProps<typeof CheckboxPrimitive.Root>> = ({className, ref, ...props}) => (
  <CheckboxPrimitive.Root className={`peer h-4 w-4 shirnk-0 rounded border border-emerald-950 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-950 data-[state=checked]:text-emerald-50`}
                          ref={ref} {...props}
  >
    <CheckboxPrimitive.Indicator className={`flex items-center justify-center text-current`}>
      <Check className={`h-4 w-4`} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)

export {Checkbox}