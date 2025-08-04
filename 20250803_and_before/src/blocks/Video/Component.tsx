import type { Video as VideoProps} from '@/payload-types'

export const Video = (props: VideoProps) => {
  const {videoLink, name} = props

  const processedVideoLink = videoLink.includes('https://youtu.be/')
    ? videoLink.split('https://youtu.be/')[1]
    : videoLink

  return <iframe
  className={`aspect-video object-contain h-auto my-2`}
  src={`https://www.youtube.com/embed/${processedVideoLink}`}
  title={name}
  width="100%"
  height="100%"
  allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
  allowFullScreen={true}
  >
  </iframe>
}