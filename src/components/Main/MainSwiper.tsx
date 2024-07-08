import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { symptomData } from '@/lib/common';
import { pickRandomElements } from '@/lib/utils';
import SymptomBanner from '@/components/Main/SymptomBanner';

const MainSwiper = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 5000 }}
      pagination={{ clickable: true }}
      spaceBetween='20'
      className='flex flex-col gap-y-4 mx-4 w-full'
    >
      {pickRandomElements(symptomData, 10).map((item) => (
        <SwiperSlide key={item.key}>
          <SymptomBanner symptom={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MainSwiper;