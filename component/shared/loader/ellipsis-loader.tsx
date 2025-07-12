'use client'

import { FC } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from 'lib/util'

interface EllipsisLoaderProps {
  className?: string
  dotSize  ?: string
  dotColor ?: string
}

const dotVariants = {
  animate: (i: number) => ({
    opacity   : [0.3, 1, 0.3],
    scale     : [1, 1.5, 1],
    transition: {
      duration: 1.2,
      repeat  : Infinity,
      ease    : 'easeInOut',
      delay   : i * 0.2
    }
  })
} as Variants

const EllipsisLoader: FC<EllipsisLoaderProps> = ({ className, dotSize = 'text-xl', dotColor = 'mono-contrast-button-text', ...props }) => {
  return (
    <div className={cn('flex text-center justify-center gap-1', className)} {...props}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={cn(dotSize, dotColor)}
          variants={dotVariants}
          animate={"animate"}
          custom={i}>
          .
        </motion.span>
      ))}
    </div>
  )
}

export default EllipsisLoader
