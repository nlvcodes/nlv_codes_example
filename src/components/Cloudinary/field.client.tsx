'use client'

import {FieldLabel, SelectInput, TextInput, useField} from '@payloadcms/ui'
import type {OptionObject} from 'payload'
import React, {useState} from 'react'

export const FieldClient = ({folders}: {folders: OptionObject[]}) => {
  const {path, value, setValue} = useField()
  const [folderMode, setFolderMode] = useState<'existing' | 'new'>('existing')

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <FieldLabel label={path} path={path} />
      <div style={{display: 'flex', gap: '1rem', marginBottom: '0.5rem'}}>
        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
          <input
            type={'radio'}
            checked={folderMode === 'existing'}
            onChange={() => setFolderMode('existing')}
            value={'existing'}
            name={`${path}-mode`}
          />
          Select existing folder
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
          <input
            type={'radio'}
            checked={folderMode === 'new'}
            onChange={() => setFolderMode('new')}
            value={'new'}
            name={`${path}-mode`}
          />
          Create new folder
        </label>
      </div>
      {folderMode === 'existing' ? (
        <SelectInput
          path={path}
          name={path}
          value={value as string}
          options={folders}
          onChange={(e: any) => setValue(e.value)}
        />
      ) :
        <TextInput path={path} value={value as string} placeholder={'Enter folder path (e.g. payload/uploads)'} onChange={(e: any) => setValue(e.value)} />
      }
    </div>
  )
}