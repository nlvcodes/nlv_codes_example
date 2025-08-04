import Link from 'next/link'

export const BeforeListContent = () => {
  return <div>
    <span><p>This is a collection of blog posts.</p> <Link href={'/posts'} target={'_blank'}>View Posts</Link></span>
  </div>
};