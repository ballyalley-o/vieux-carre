'use client'

import { useTheme } from 'next-themes'
import { motion, Variants } from 'framer-motion'

const boxVariants = {
  animate: (i: number) => ({
    x         : [0, 10, -10, 0],
    y         : [0, -10, 10, 0],
    transition: {
      duration: 2,
      repeat  : Infinity,
      ease    : 'easeInOut',
      delay   : i * 0.2
    }
  })
} as Variants

const Loading = () => {
  const { theme } = useTheme()
  const boxColor  = theme === 'dark' ? 'bg-white' : 'bg-gray-900'
  const render    = () => (
      [0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={boxVariants}
          animate="animate"
          className={`absolute w-4 h-4 md:w-6 md:h-6 ${boxColor} rounded-sm`}
          style={{
            top      : i % 2 === 0 ? 0: '50%',
            left     : i < 2 ? 0      : '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))
  )
  return (
    <div className={"fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50"}>
      <div className={"relative md:w-16 md:h-16 h-10 w-10"}>
        {render()}
      </div>
    </div>
  )
}

export default Loading
