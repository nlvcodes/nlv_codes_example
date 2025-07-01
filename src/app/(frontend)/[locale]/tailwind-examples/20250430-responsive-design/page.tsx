export default function Page() {
  return <main>
    <div className={`bg-emerald-500 h-16 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/8 2xl:w-1/16`}>
      <span className={`text-emerald-950 text-sm p-4 md:text-gray-600 md:text-lg md:text-center md:font-bold`}>Works for every utility class</span>
    </div>
    <div className={`p-2 md:flex md:gap-4`}>
      <p className={`text-center`}>Start with no prefixes for the smallest size</p>
      <p className={`hidden md:text-right md:block`}>Then add prefixes to build for bigger screen sizes</p>
    </div>
    <div className={`p-2`}>
      <p className={`sm:max-lg:font-bold`}>This won't be bold at the smallest or the largest sizes</p>
      <p className={`sm:max-md:text-red-700`}>This will only be red at the small breakpoint</p>
    </div>
    <div className={`p-2`}>
      <p className={`sm:font-bold`}>This will now be bold after 36rem or 576px</p>
    </div>
    <div className={`p-2`}>
      <p className={`tablet:text-red-400`}>This now uses our custom breakpoints and everything previous ignores
        breakpoint prefixes. This is defined in globals.css</p>
      <p className={`tablet:max-laptop:text-emerald-400`}>We can still use ranges here. This is also defined in
        globals.css</p>
    </div>
    <div className={`p-2`}>
      <p className={`max-[700px]:font-bold`}>This will be bold until 700px</p>
    </div>
    <div className={`p-2`}>
      <p className={`bg-indigo-950 h-16 xl:text-white`}>This is set outside a container and will switch much later
        because it's relative to the viewport.</p>
      <div className={`@container bg-emerald-950 h-auto w-full`}>
        <p className={`text-black @xl:text-amber-50`}>This is set within a container and will switch much earlier
          because it's relative to its container.</p>
        <p className={`@max-xl:text-amber-50`}>This is set to be this color until it reaches the max-xl container</p>
        <p className={`@lg:@max-xl:font-bold text-white`}>We can still use ranges here.</p>
        <div className={`@container/internal`}>
          <p className={`@2xl/internal:bg-amber-50 @2xl/internal:text-amber-950`}>You can nest containers as well.</p>
        </div>
        <p className={`@md:font-bold`}>This should only be bold after 40rem relative to the container size. This is
          defined in globals.css</p>
        <p className={`@min-[700px]:text-white`}>This is an arbitrary value that applies white text after 700px</p>
      </div>
      <div className={`@container w-full bg-emerald-500`}>
        <p className={`bg-emerald-950 text-emerald-50 w-[50cqw]`}>We can set container query units using arbitrary values</p>
        <p className={`bg-amber-950 text-amber-50 w-[75cqw]`}>1 container query unit is essentially 1% of the container</p>
        <p className={`bg-amber-950 text-amber-50 w-[25cqw]`}>25%</p>
        <p className={`bg-amber-950 text-amber-50 w-[33cqw]`}>33%</p>
      </div>
    </div>
  </main>
}