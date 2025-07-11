'use client'

import { ReactNode, useEffect, useState } from 'react'
import { PATH_DIR } from 'vc.dir'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LinkBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { oneDay, oneHr, oneMin, oneSec, lastDayOfTheMonth } from 'config'
import { cn, transl } from 'lib'

const MotionImage = motion.create(Image)

const TARGET_DATE = lastDayOfTheMonth

const calculateTimeRemaining = (targetDate: Date) => {
  const currentDate = new Date()
  const timeDiff    = Math.max(Number(targetDate) - Number(currentDate), 0)
  return {
    days   : Math.floor(timeDiff / oneDay),
    hours  : Math.floor((timeDiff % oneDay) / oneHr),
    minutes: Math.floor((timeDiff % oneHr) / oneMin),
    seconds: Math.floor((timeDiff % oneMin) / oneSec)
  }
}

type TimeType = ReturnType<typeof calculateTimeRemaining>
const noTime = ({ _time }: {_time: TimeType}) => _time.days === 0 && _time.hours === 0 && _time.minutes === 0 && _time.seconds === 0

const StatBox = ({ label, value }: { label: string; value: number }) => {
  const padded = String(value).padStart(2, '0')
  const [prev, setPrev] = useState(padded)
  const [flip, setFlip] = useState(false)

  useEffect(() => {
    if (padded !== prev) {
      setFlip(true)
      const timeout = setTimeout(() => {
        setPrev(padded)
        setFlip(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [padded, prev])

  return (
    <li className={'flip-card--container'}>
      <div className={'flip-card--wrapper'}>

        <div className={cn('flip-card--top', flip ? 'animate-flip-down' : '')} style={{ transform: flip ? 'rotateX(-90deg)' : 'rotateX(0deg)' }}>
          <div className={'flip-card-text--top'}>{prev}</div>
        </div>

        <div className={cn('flip-card--bottom', flip ? 'animate-flip-up' : '')} style={{ transform: flip ? 'rotateX(90deg)' : 'rotateX(0deg)', transitionDelay: flip ? '150ms' : '0ms' }}>
          <div className={'flip-card-text--bottom'}>{padded}</div>
        </div>

        <div className={'flip-card--divider'}></div>
      </div>
      <p className={'mt-2'}>{label}</p>
    </li>
  )
}

const DealCountdown = ({ product }: { product: Product }) => {
  const [time, setTime] = useState<TimeType>()

  useEffect(() => {
    setTime(calculateTimeRemaining(TARGET_DATE))
    const timeInterval = setInterval(()=> {
      const newTime = calculateTimeRemaining(TARGET_DATE)
      setTime(newTime)

      if (noTime({ _time: newTime })) {
        clearInterval(timeInterval)
      }
      return () => clearInterval(timeInterval)
    }, 1000)
  },[])

  const LoadingDiv = () => (
    <section className={'grid grid-cols-1 md:grid-cols-2 my-20'}>
      <div className={'flex flex-col gap-2 justify-center'}>
        <h3 className={'text-3xl font-bold'}>{transl('loading.loading_countdown')}</h3>
        <span><EllipsisLoader /></span>
      </div>
    </section>
  )

  const renderUlStatBoxex = ({ _time }: { _time: TimeType }) => (
    <ul className={'grid grid-cols-4'}>
      <StatBox label={transl('day.days.label')} value={Number(_time.days)} />
      <StatBox label={transl('hour.hours.label')} value={Number(_time.hours)} />
      <StatBox label={transl('minute.minutes.label')} value={Number(_time.minutes)} />
      <StatBox label={transl('second.seconds.label')} value={Number(_time.seconds)} />
    </ul>
  )

  const renderPromo = ({ title,  description, children, hasEnded = false }: { title: string, description: string, children: ReactNode, hasEnded?: boolean }) => {
    return (
      <section className={'grid grid-cols-1 md:grid-cols-2 my-20 '}>
        <div className={'flex flex-col gap-2 justify-center'}>
          <h3 className={'text-3xl font-bold'}>{title}</h3>
          <p>{description}</p>
          {children}
          {hasEnded && (
            <div className={cn('my-4 md:text-left text-center')}>
              <LinkBtn variant={'secondary'} href={PATH_DIR.SEARCH}>
                {transl('view_product.view_products.label')}
              </LinkBtn>
            </div>
          )}
        </div>

        <div className={cn('flex justify-center md:justify-end sm:w-full sm:h-auto', hasEnded && 'opacity-20')}>
          <Link href={PATH_DIR.PRODUCT_VIEW(product?.slug)}>
            <div className="inline-block overflow-hidden rounded-md">
              <MotionImage src={product?.images[0]} alt={'promotion'} width={400} height={300} className={"block"} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
            </div>
          </Link>
        </div>
      </section>
    )
  }

  if (!time) {
    return (<LoadingDiv/>)
  }

  return noTime({ _time: time }) ? (
    renderPromo({ title: transl('deal_has_ended.label'), description: transl('deal_has_ended.description'), children: null, hasEnded: true })
  ) : (
    renderPromo({ title: transl('deal_of_the_month.label'), description: transl('deal_of_the_month.description'), children: renderUlStatBoxex({ _time: time }) }))
}

export default DealCountdown
