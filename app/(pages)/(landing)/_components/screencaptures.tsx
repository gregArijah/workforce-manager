'use client'
import React, { useState, useEffect } from 'react';
// Import required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles.css';

export default function ScreenshotSwiper() {
  const [slidesPerView, setSlidesPerView] = useState(3); // Initial slidesPerView

  useEffect(() => {
    // Update slidesPerView based on screen size
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
    //   } else if (window.innerWidth < 1024) {
    //     setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    // Update slidesPerView on window resize
    window.addEventListener('resize', updateSlidesPerView);

    return () => {
      // Remove resize event listener when component unmounts
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <div className='bg-white flex items-md:py-12'>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Image src='/screenshots/staff1.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/staff2.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/staff3.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/admin1.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/admin2.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/admin3.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/admin4.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>
        <SwiperSlide><Image src='/screenshots/admin5.png' alt='staffscreen' height={150} width={150} className='py-12 flex items-center' ></Image></SwiperSlide>


        
      </Swiper>
    </div>
  );
}
