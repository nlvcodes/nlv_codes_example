export default function Page() {
  return <main>
    {/* Overview example */}
    <div className={`bg-emerald-500 h-16 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/8 2xl:w-1/16`}><span
      className={`text-emerald-950 text-sm p-4 md:text-gray-600 md:text-lg md:text-center md:font-bold`}>Works for every utility class</span>
    </div>
    {/*  Mobile first example */}
    <div className={`p-2 md:flex md:gap-4`}>
      <p className={`text-center`}>Start with no prefixes for the smallest size</p>
      <p className={`hidden md:text-right md:block`}>Then add prefixes to build for bigger screen sizes</p>
    </div>
    {/*  range example */}
    <div className={`p-2`}>
      <p className={`sm:max-lg:font-bold`}>This won't be bold at the smallest or largest sizes</p>
      {/*Targeting a single breakpoint*/}
      <p className={`sm:max-md:text-red-700`}>This will only be red at the medium breakpoint</p>
      {/*Custom breakpoint*/}
      <p className={`lg:font-bold`}>This will now be bold after 70rem (1120px).</p>
      {/*Remove and redefine breakpoints*/}
      <p className={`tablet:text-red-400`}>This now uses our custom breakpoints and everything previous ignores
        breakpoint prefixes. This is defined in globals.css.</p>
      {/* using custom breakpoints in ranges */}
      <p className={`tablet:max-laptop:text-emerald-400`}>We can still use ranges here. This is defined in
        globals.css.</p>
      {/*Using arbitrary values*/}
      <p className={`max-[700px]:font-bold`}>This will be bold until 700px</p>
    </div>
    {/*Container queries, reinstate other breakpoints*/}
    <p className={`bg-indigo-950 h-16 xl:text-white`}>This is set outside a container and will switch much later because
      it's relative to the viewport</p>
    <div className={`@container bg-emerald-950 h-auto w-full`}>
      <p className={`text-black @xl:text-amber-50`}>This is set within a container and will switch much earlier because
        it's relative to its container</p>
      <p className={`@max-xl:text-amber-50`}>This is set to be this color until it reaches the max-xl container
        size.</p>
      <p className={`@lg:@max-xl:font-bold text-white`}>We can still use ranges here.</p>
      {/*Nested containers*/}
      <div className={`@container/internal`}>
        <p className={`@2xl/internal:bg-amber-50 @2xl/internal:text-amber-950`}>You can nest containers as well</p>
      </div>
      <div className={`@md:font-bold text-white`}><p>
        This should only be bold after 40 rem relative to the container size. This is defined in globals.css.
      </p></div>
      <p className={`@min-[700px]:text-white`}>This is an arbitrary value that applies white text after 700px</p>
      {/*Container query units*/}
    </div>
  </main>
}