export default defineAppConfig({
  ui: {
    // primary: 'primary-pink',
    primary: 'purple',
    gray: 'neutral',
    input: {
      base: "py-3 px-4 block rounded-md text-black text-sm focus:border-primary focus:ring-primary sm:p-4"
    },
    card: {
      base: 'h-full',
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
    },
    notifications: {
      position: 'right-0 top-0'
    }
  }
})