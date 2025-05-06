'use client'
import { useTheme } from 'next-themes'

const Loading = () => {
  const { theme } = useTheme()

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
        {render()}
      </div>
    </div>
  )
}

export default Loading
