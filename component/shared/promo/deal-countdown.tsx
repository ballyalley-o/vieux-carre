'use client'

import { ReactNode, useEffect, useState } from 'react'
import { en } from 'public/locale'
import Image from 'next/image'
import { LinkBtn } from 'component/shared/btn'
import { EllipsisLoader } from 'component/shared/loader'
import { PATH_DIR, ASSET_DIR, oneDay, oneHr, oneMin, oneSec } from 'config'
import { cn } from 'lib'

const TARGET_DATE = new Date('2025-02-14:00:00')

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

const StatBox =({ label, value }: { label: string, value: number}) => (
  <li className={"p-4 w-full text-center"}>
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
)

const DealCountdown = () => {
  const [time, setTime ] = useState<TimeType>()

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
        <h3 className={'text-3xl font-bold'}>{en.loading.loading_countdown}</h3>
        <span><EllipsisLoader/></span>
      </div>
    </section>
  )

  const renderUlStatBoxex = ({ _time }: { _time: TimeType }) => (
    <ul className={'grid grid-cols-4'}>
      <StatBox label={en.day.days.label} value={_time.days} />
      <StatBox label={en.hour.hours.label} value={_time.hours} />
      <StatBox label={en.minute.minutes.label} value={_time.minutes} />
      <StatBox label={en.second.seconds.label} value={_time.seconds} />
    </ul>
  )

  const renderPromo = ({ title,  description, children, hasEnded = false }: { title: string, description: string, children: ReactNode, hasEnded?: boolean }) => {
    return (
      <section className={'grid grid-cols-1 md:grid-cols-2 my-20'}>
        <div className={'flex flex-col gap-2 justify-center'}>
          <h3 className={'text-3xl font-bold'}>{title}</h3>
          <p>{description}</p>
          {children}
          <div className={cn('my-4 md:text-left text-center')}>
            <LinkBtn variant={'secondary'} href={PATH_DIR.SEARCH}>
              {en.view_product.view_products.label}
            </LinkBtn>
          </div>
        </div>

        <div className={cn('flex justify-center sm:w-full sm:h-auto', hasEnded && 'opacity-20')}>
          {/* TODO: #37 instead of a static image here, get the deal of the month image.
              its starts with creating an action to fetch the product who has the deal of the month flag. (only one product should be the deal of the month.),
              use te index image of that product.
                if theres more than one deal of the month flag,
                  throw a dialog to ask if admin wants to replace the deal of the month
                    if yes,
                      look for the previous deal of the month and toggle off the deal of the month flag, and toggle the new deal of the month
                    if no
                      return
                else
                  toggle the deal of the month flag
              it should ask for how much discount the price would be. */}
          <Image src={ASSET_DIR.PROMO} alt={'promotion'} width={200} height={300} />
        </div>
      </section>
    )
  }

  if (!time) {
    return (<LoadingDiv/>)
  }

  return noTime({ _time: time }) ? (
    renderPromo({ title: en.deal_has_ended.label, description: en.deal_has_ended.description, children: null, hasEnded: true })
  ) : (
    renderPromo({ title: en.deal_of_the_month.label, description: en.deal_of_the_month.description, children: renderUlStatBoxex({ _time: time }) }))
}

export default DealCountdown
