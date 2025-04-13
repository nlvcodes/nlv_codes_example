import Link from 'next/link'


export default function Page() {
  return <div className={`text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
    <h1>This is dark mode</h1>
    <Link href={`/tailwind-examples/20250430-responsive-design`}>Responsive Design</Link>
  </div>
}