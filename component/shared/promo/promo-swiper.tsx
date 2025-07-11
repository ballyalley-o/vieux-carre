'use client'

import { Promotion } from 'vieux-carre.authenticate/generated'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/autoplay'

interface PromoSwiperProps {
    promos: Promotion[]
}

const PromoSwiper = ({ promos }: PromoSwiperProps) => {
    SwiperCore.use([Autoplay])
    return (
    <Swiper autoplay={{ delay: 5000 }} loop spaceBetween={5} allowTouchMove>
        {promos.map((_promo) => ( <SwiperSlide key={_promo.id}><p>{_promo.content}</p></SwiperSlide> ))}
    </Swiper>
    )
}

export default PromoSwiper