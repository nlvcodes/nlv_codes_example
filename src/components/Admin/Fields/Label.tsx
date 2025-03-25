'use client'
import type {TextFieldLabelClientComponent} from 'payload'
import {useRowLabel} from '@payloadcms/ui'

export const CustomRowLabel = () => {
  const {data, rowNumber} = useRowLabel<{listItem?: string}>()

  const label = `${data.listItem || `List item ${String(rowNumber! +1).padStart(2, '0')}`}`

  return <div>{label}</div>

}

export const CustomTextLabel: TextFieldLabelClientComponent = () => {
  return <div>
    <p>Custom Title Label</p>
  </div>
}