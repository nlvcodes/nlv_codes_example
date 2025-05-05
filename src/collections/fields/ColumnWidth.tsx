// We're going to create a custom field that will keep track of our total column width to ensure we don't
// create a row that's more or less than 100%. this will return an error if that's true, but will help us
// to see how much more we need to go to get to 100%

'use client' // this is a client component, so we need to use the 'use client' directive
// we'll pull in the useAllFormFields and useField hooks from '@payloadcms/ui'
import { useAllFormFields, useField } from '@payloadcms/ui'
// then we need our types for the TextFieldClientProps and TextFieldClientComponent, which is imported from 'payload'
import type { TextFieldClientProps, TextFieldClientComponent } from 'payload'
// next we'll import getSiblingData from 'payload/shared' to gain access to the siblingData
import { getSiblingData } from 'payload/shared'
// we'll also need the Column type
import type { Column } from '@/payload-types'
// as well as React and useEffect from 'react'
import React, { useEffect } from 'react'

// export a constant called ColumnWidth with TextFieldClientComponent and that equal to an arrow function
// in the props, we'll include props with the TextFieldClientProps type assigned to it
export const ColumnWidth: TextFieldClientComponent = (props: TextFieldClientProps) => {
  // open the function and set a destructured constant called {path, field} equal to props
  const { path, field } = props
  // we'll then get our [fields] from useAllFormFields, which is a hook to get the state of all form fields
  const [fields] = useAllFormFields()
  // now we're going to destructure a constant called {setValue, showError, and errorMessage} set equal to useField({path}) to
  // get access to the field we're creating as well as set the value of that field
  const {setValue, showError, errorMessage} = useField({ path })
  // we'll use constant siblingData to store our sibling data from our fields array above for fields that are sibling to
  // our custom field
  const siblingData = getSiblingData(fields, path)
  // now we'll store an array of all of our column widths from our sibling data in a constant called columnWidths
  // after checking that siblingData.columns exists, we'll map through our siblingData.columns, naming our item
  // column with the type of Column, to pull out our column.columnWidth
  const columnWidths = siblingData.columns && siblingData.columns.map((column: Column) => column.columnWidth)

  // create a new constant called results, which is going to store a percentage value of all of our column widths after checking
  // if siblingData.columns exists
  const results = siblingData.columns && columnWidths.map((width: string) => { // we'll do this by mapping through our columnWidths
    if (width?.includes('auto')) { // and first check if width includes 'auto'
      return '100%' // if it does we can just return 100%
    } else {
      const splitFraction = width?.split('/') // otherwise we need to split the fraction
      // and then divide the numerator and the denominator and multiply by 100
      return Number(splitFraction?.[0]) / Number(splitFraction?.[1]) * 100
    }
  })

  // now we can store our percentage value in a constant called percentage
  // we'll do this by first checking if there are results in our constant and then check if our result is not a
  // number by using Math.ceiling and use reduce on our results array which will sum up our numbers. If the result
  // isn't a number, we'll return 100% – because that means the result contains
  // at least one 'auto'. Otherwise, we can return the reduced results array as a percentage
  const percentage = results && isNaN(Math.ceil(results.reduce((acc: number, column: number) => acc + column, 0)))
    ? '100%'
    : results && `${Math.ceil(results.reduce((acc: number, column: number) => acc + column, 0))}%`

  // create a constant called valid that will check if percentage equals 100%
  const valid = percentage === '100%'

  // before we return anything, we need a hook to check the state of this field and save it to our database
  // we'll use a useEffect hook to do this
  useEffect(() => { // so create a useEffect hook and pass in the arrow function
    setValue(percentage) // we'll use setValue to set the value of the field to percentage
    // and we'll need to include dependencies of setValue and percentage, as we want to track changes in these two
  }, [setValue, percentage])

  // now we can return our field, which will have a container div. this div will have a className of 'field-type', which
  // is part of Payload's styles. it'll also have a class of {field.type}, which will return another Payload class
  // we'll then check if field.admin?.readOnly is true, and if it is return 'read-only'. lastly, we'll do another check
  // to see if the field is not valid and return 'error' if it isn't
  return <div className={`field-type ${field.type} ${field.admin?.readOnly && 'read-only'} ${!valid && 'error'}`}>
    {/*
    now we'll create a label element, which will have an inline style of color, which will then check if valid is true
    if it is, we'll return black, otherwise it'll be red. we'll also need a class of 'field-label' and an htmlFor of
    field-${path} to make sure this label is associated with the input we're about to create. Inside the label, we'll
    inclue {field.label as string}
    */}
    <label style={{ color: valid ? 'black' : 'red' }} className={`field-label`}
           htmlFor={`field-${path}`}>{field.label as string}</label>
    {/* we need another div to surround our input; this div will have a class of field-type__wrap, another Payload class */}
    <div className={`field-type__wrap`}>
      {/* then we can include our input */}
      <input
        type={field.type} // with the type of field.type
        name={`field-${path}`} // a name to match our htmlFor above
        disabled={field.admin?.readOnly} // then if the field is readOnly, we'll return disabled as true
        readOnly={field.admin?.readOnly} // and the same thing for the readOnly attribute
        value={percentage} // our value will be percentage, which will update
        id={`field-${path}`} // and lastly set our id to be the same as the name and htmlFor attribute
      />
    </div>
    {/* to close out the custom Field component, we'll check if showError exists and return an errorMessage if it does */}
    {showError && <div className={`error`}>Error: {errorMessage}</div>}
  </div>
}

export default ColumnWidth // then we can export ColumnWidth as the default export