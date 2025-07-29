'use client'
import Image from 'next/image'
import Headshot from 'public/headshot.jpeg'

const imageLoader = ({ src, width, quality }: {src?: string, width?: number, quality?: number}) => {
  return `https://images.nlvcodes.com/${src}?w=${width}&q=${quality}`
}

export default function Page() {
  return <div><p>This is some text</p></div>
  // <Image
  //   src="https://pub-026ef14ddd9f4accbb73db5607cd7043.r2.dev/nlvcodes/headshot.png"
  //   width={200}
  //   height={200}
  //   // fill
  //   // sizes="(max-width: 768px) 100vw, 33vw"
  //   quality={100}
  //   alt={"NLV Codes"}
  //   // loader={imageLoader}
  //   // loading={"lazy"}
  //   // placeholder={"blur"}
  //   // blurDataURL={`data:image/png...`}
  //   onLoad={(e) => console.log(e)}
  //   onError={(e) => console.error(e)}
  //   priority
  //   style={{borderRadius: '50%'}}
  //   // overrideSrc={Headshot.src}
  // />
}