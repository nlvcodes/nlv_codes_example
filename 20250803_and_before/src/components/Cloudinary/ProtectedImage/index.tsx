'use client'

import React, {useState, useEffect} from 'react'
import {fetchSignedURL, requiresSignedURL} from 'payload-storage-cloudinary/client'
import type {CollectionSlug} from 'payload'

export function ProtectedImage({doc, collection = "documents"}: {doc: any, collection?: CollectionSlug}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadImage() {
      if (!requiresSignedURL(doc)) {
        setImageUrl(doc.url)
        return
      }
      setLoading(true)
      try {
        const url = await fetchSignedURL(collection, doc.id)
        console.log(url)
        setImageUrl(url)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }
    loadImage()
  }, [doc, collection])
  if (loading) return <div>Loading...</div>
  if (error) return <div>You are unable to view this content</div>
  if (!imageUrl) return <div>No image</div>

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageUrl} alt={doc.alt} />
}
