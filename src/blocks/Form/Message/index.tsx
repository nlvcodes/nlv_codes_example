import {RichText} from '@/components/RichText'
import React from 'react'
import {SerializedEditorState} from '@payloadcms/richtext-lexical/lexical'

export const Message = ({message}: {message: SerializedEditorState}) => {
  return (
    <div className={`w-full`}>
      {message && <RichText data={message} />}
    </div>
  )
}