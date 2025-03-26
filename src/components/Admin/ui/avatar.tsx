import type { Media, User } from '@/payload-types'
import Image from 'next/image'

export const Avatar = ({ user }: { user: User }) => {
  const avatar = user?.avatar as Media

  if (avatar) {
    return <Image style={{
      borderRadius: '50%',
    }} src={`${process.env.S3}/${avatar.filename}`} alt={avatar.alt} height={25} width={25} />
  } else {
    return <svg className="graphic-account" height="25" viewBox="0 0 25 25" width="25"
                xmlns="http://www.w3.org/2000/svg">
      <circle className="graphic-account__bg" cx="12.5" cy="12.5" r="11.5"></circle>
      <circle className="graphic-account__head" cx="12.5" cy="10.73" r="3.98"></circle>
      <path className="graphic-account__body"
            d="M12.5,24a11.44,11.44,0,0,0,7.66-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z"></path>
    </svg>
  }

}

export default Avatar