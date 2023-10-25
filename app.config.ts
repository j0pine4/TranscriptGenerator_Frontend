export default defineAppConfig({
  ui: {
    // primary: 'primary-pink',
    primary: 'purple',
    gray: 'neutral',
    card: {
      background: "bg-black dark:bg-black",
      base: 'h-full'
    },
    tabs: {
      wrapper: 'flex items-center flex-col justify-center',
      list: {
        base:'',
        background: "bg-black dark:bg-black border border-white/5 hover:bg-black/80",
        height: 'h-14',
        width: 'max-w-sm',
        tab: {
          height: 'h-10'
        }
      },
    }
  }
})