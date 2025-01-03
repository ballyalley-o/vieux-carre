'use client'
import { useTheme } from 'next-themes'

const Loading = () => {
  const { theme } = useTheme()
  // const colors = {
  //   primary: theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-gray-100' : 'bg-gray-50',
  //   secondary: theme === 'light' ? 'bg-gray-50' : theme === 'dark' ? 'bg-grey-800' : 'bg-gray-900'
  // }

  // const patterns = [
  //   { color: colors.primary, animation: 'shuffle1' },
  //   { color: colors.secondary, animation: 'shuffle2' },
  //   { color: colors.primary, animation: 'shuffle3' },
  //   { color: colors.secondary, animation: 'shuffle4' }
  // ]

  const render = () => {
    if (typeof window === 'undefined') return null
    if (theme === 'dark') {
      return (
        <div className="relative w-16 h-16">
          <div className={`absolute w-6 h-6 bg-gray-50 rounded-sm animate-[shuffle1_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-100 rounded-sm animate-[shuffle2_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-50 rounded-sm animate-[shuffle3_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-100 rounded-sm animate-[shuffle4_2s_ease-in-out_infinite]`} />
        </div>
      )
    } else {
      return (
        <div className="relative w-16 h-16">
          <div className={`absolute w-6 h-6 bg-gray-800 rounded-sm animate-[shuffle1_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-900 rounded-sm animate-[shuffle2_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-800 rounded-sm animate-[shuffle3_2s_ease-in-out_infinite]`} />
          <div className={`absolute w-6 h-6 bg-gray-900 rounded-sm animate-[shuffle4_2s_ease-in-out_infinite]`} />
        </div>
      )
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        {/* {patterns?.map(({ color, animation }, index) => (
          <div key={index} className={`absolute w-6 h-6 ${color} rounded-sm animate-[${animation}_2s_ease-in-out_infinite]`} />
        ))} */}
        {render()}
      </div>
    </div>
  )
}

export default Loading
