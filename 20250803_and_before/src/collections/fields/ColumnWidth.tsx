'use client'

import {useAllFormFields, useField} from '@payloadcms/ui'
import type {TextFieldClientProps, TextFieldClientComponent} from 'payload'
import {getSiblingData} from 'payload/shared'
import type {Column} from '@/payload-types'
import React, { useEffect } from 'react'

export const ColumnWidth: TextFieldClientComponent = (props: TextFieldClientProps) => {
  const {path, field} = props
  const [fields] = useAllFormFields()

  const {setValue, showError, errorMessage} = useField({path})

  const siblingData = getSiblingData(fields, path)
  const columnWidths = siblingData.columns && siblingData.columns.map((column: Column) => column.columnWidth)
  const results = siblingData.columns && columnWidths.map((width: string) => {
    if (width?.includes('auto')) {
      return '100%'
    } else {
      const splitFraction = width?.split('/')
      return Number(splitFraction?.[0]) / Number(splitFraction?.[1]) * 100
    }
  })
  const percentage = results && isNaN(Math.ceil(results.reduce((acc: number, column: number) => acc + column, 0))) ? '100%' : results && `${Math.ceil(results.reduce((acc: number, column: number) => acc + column, 0))}%`

  const valid = percentage === '100%'

  useEffect(() => {
    setValue(percentage)
  }, [setValue, percentage])

  return <div className={`field-type ${field.type} ${field.admin?.readOnly && 'read-only'} ${!valid && 'error'}`}>
    <label style={{ color: valid ? 'black' : 'red'}} className={`field-label`} htmlFor={`field-${path}`}>
      {field.label as string}
    </label>
    <div className={`field-type__wrap`}>
      <input
        type={field.type}
        name={`field-${path}`}
        disabled={field.admin?.readOnly}
        readOnly={field.admin?.readOnly}
        value={percentage}
        id={`field-${path}`}
      />
    </div>
    {showError && <div className={`error`}>Error: {errorMessage}</div>}
  </div>
}

export default ColumnWidth