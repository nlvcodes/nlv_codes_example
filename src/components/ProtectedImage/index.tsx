'use client'
import React, { useState, useEffect } from 'react'
import {
  fetchSignedURL,
  requiresSignedURL,
  createPrivateImageComponent,
  useSignedURL,
} from 'payload-storage-cloudinary/client'
import type { CollectionSlug } from 'payload'
import type { Document } from '@/payload-types'
import { getTransformationUrl } from 'payload-storage-cloudinary/client'


const PrivateImage = createPrivateImageComponent(React)

export function BasicImage({document}: {document: any}) {
  if (!document) return <div>no media</div>

  return (
    <div>
      <PrivateImage
        doc={document}
        collection="documents"
        alt={document.alt || 'Private image'}
        className="w-full max-w-md"
        fallback={<div>Loading...</div>}
      />
    </div>
  )
}

export function PremiumImage({document: doc}: {document: Document}) {
  if (!doc.isPrivate) {
    // Public file - use normal URL
    return <img src={doc.url!} alt={doc.alt} />
  }

  if (doc.enablePublicPreview && doc.previewUrl) {
    // Show watermarked/blurred preview
    return (
      <div>
        <img src={doc.previewUrl!} alt={`${doc.alt} - Preview`} />
      </div>
    )
  }

  // No public preview available
  return <div>This image requires authentication</div>
}

export function ProtectedImage({ doc, collection = 'media' }: { doc: any, collection?: CollectionSlug }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadImage() {
      // Check if this image needs a signed URL
      if (!requiresSignedURL(doc)) {
        setImageUrl(doc.url!)
        return
      }

      setLoading(true)
      try {
        const url = await fetchSignedURL(collection, doc.id)
        setImageUrl(url)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    loadImage()
  }, [doc, collection])

  if (loading) return <div>Loading...</div>
  if (error) return <div>You're not authorized to see this content</div>
  if (!imageUrl) return null

  return <img src={imageUrl} alt={doc.alt} />
}