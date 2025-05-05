import type { Video as VideoProps } from '@/payload-types'
// we need to import our Video types as VideoProps so we can name our exported constant Video

export const Video = (props: VideoProps) => {
  // export a constant called Video with the VideoProps type assigned to it
  const { videoLink, name } = props // we only need videoLink and name from our props

  // we need a constant to store our video link so we can include it in a variety of ways in the CMS
  // we'll first check if videoLink.includes('https://youtu.be/') is true, if it is, we'll split the string on 'https://youtu.be/'
  // this will return only the video ID, which we'll then use to create the iframe src. If it isn't true, we'll just return the videoLink,
  // since that means it'll only be the video ID already
  const processedVideoLink = videoLink.includes('https://youtu.be/')
    ? videoLink.split('https://youtu.be/')[1]
    : videoLink

  // this iframe is the general YouTube embed code. you can find this when you right click on a YouTube video and select "Embed"
  return <iframe
      className='aspect-video object-contain h-auto my-2'
    // we're using Tailwind CSS to style this, so we'll use the aspect-video class to make the iframe responsive in a 16/9 aspect ratio
    // we'll also use the object-contain class to make the iframe's content scale to fit the iframe's container
    // and we'll use the h-auto class to make the iframe's height auto-adjust to the iframe's content
    // and we'll use the my-2 class to add some margin to the iframe
      src={`https://www.youtube.com/embed/${processedVideoLink}`}
    // we'll include the processedVideoLink in the iframe's src by adding it to YouTube's embed URL
      title={name}
      // to make things clear, we'll return the video name as the iframe's title
      width="100%"
      // we want the width to be 100%
      height="100%"
      // and it's the same with the height
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      // then we can set a couple of other attributes for the iframe
      allowFullScreen={true}
      // and finally allowFullScreen and close off the iframe
    ></iframe>
}

