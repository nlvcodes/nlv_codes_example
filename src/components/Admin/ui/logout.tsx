import Link from 'next/link'
import type {Config, Payload} from 'payload'

export const Logout = ({payload}: {payload: Payload}) => {
  const {admin, routes} = payload.config as Config
  return <Link aria-label={'Log out'} tabIndex={0} className={'nav__log-out'} href={`${routes?.admin}${admin?.routes?.logout}`}><svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
  <path fillRule="evenodd" clipRule="evenodd"
        d="M7.25 8V8.75H8.75V8V0.75V0H7.25V0.75V8ZM2.5 8C2.5 6.20132 3.36262 4.60434 4.69989 3.59962L3.79888 2.40038C2.10074 3.67623 1 5.70968 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 5.70968 13.8993 3.67623 12.2011 2.40038L11.3001 3.59962C12.6374 4.60434 13.5 6.20132 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8Z"
        fill="currentColor"></path>
</svg></Link>
}
