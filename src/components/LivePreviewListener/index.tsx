'use client'

import {getClientSideURL} from '@/utilities/getURL'
import {useRouter} from 'next/navigation'
import React from 'react'
import {RefreshRouteOnSave as PayloadLivePreview} from '@payloadcms/live-preview-react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()

  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}