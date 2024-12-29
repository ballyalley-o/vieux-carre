'use client'
import { useTheme } from 'next-themes'

const Loading = () => {
  const { theme } = useTheme()
  const colors = {
    primary: theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-gray-100' : 'bg-gray-50',
    secondary: theme === 'light' ? 'bg-gray-50' : theme === 'dark' ? 'bg-grey-800' : 'bg-gray-900'
  }

  const patterns = [
    { color: colors.primary, animation: 'shuffle1' },
    { color: colors.secondary, animation: 'shuffle2' },
    { color: colors.primary, animation: 'shuffle3' },
    { color: colors.secondary, animation: 'shuffle4' }
  ]
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        {patterns?.map(({ color, animation }, index) => (
          <div key={index} className={`absolute w-6 h-6 ${color} rounded-sm animate-[${animation}_2s_ease-in-out_infinite]`} />
        ))}
      </div>
    </div>
  )
}

export default Loading
