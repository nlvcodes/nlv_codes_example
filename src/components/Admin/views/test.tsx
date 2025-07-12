import { SetStepNav, type StepNavItem } from '@payloadcms/ui'
import { DefaultTemplate } from '@payloadcms/next/templates'
import type { AdminViewServerProps } from 'payload'


export const Test: React.FC<AdminViewServerProps> = ({
                                                       initPageResult,
                                                       params,
                                                       searchParams,
                                                     }) => {
  const navItem: StepNavItem[] = [
    {
      label: 'Analytics',
      url: '/analytics',
    },
  ]
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <SetStepNav nav={navItem} />
    </DefaultTemplate>)
}