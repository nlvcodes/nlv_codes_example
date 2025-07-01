import Link from 'next/link';
import React from 'react';
import {useTranslations} from 'next-intl'

export default function NotFound() {
  const t = useTranslations()

  return (
    <div content={'container py-28 mx-auto text-center'}>
      <div className={'max-w-none'}>
        <h1 className={'mb-0'}>404</h1>
        <p className={'mb-4'}>{t('page-not-found')}</p>
      </div>
      <Link href={'/'} className={'bg-emerald-950 text-emerald-50 px-4 py-2'}>{t('go-home')}</Link>
    </div>
  )
}