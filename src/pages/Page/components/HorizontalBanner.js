'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import 'swiper/css';

import { FreeMode } from 'swiper/modules';
import Link from 'next/link';
import { useWebContext } from '@/context/WebContext';

const HorizontalBanner = ({ lists }) => {
  const swiperRef = useRef(null);
  const onPrevBanner = () => {
    swiperRef.current.slidePrev();
  };
  const onNextBanner = () => {
    swiperRef.current.slideNext();
  };
  const { setLoading } = useWebContext();

  return (
    <div className="relative flex justify-between items-center">
      <FaChevronLeft
        className="text-[18px] lg:text-[24px] cursor-pointer text-primary-50"
        onClick={onPrevBanner}
      />
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          481: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        loop
        freeMode
        modules={[FreeMode]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-[90%]"
      >
        {lists?.map((list, index) => (
          <SwiperSlide key={index}>
            <Link href={list.link || '/'} onClick={() => setLoading(true)}>
              <div className="cursor-pointer">
                <div
                  className="pt-[100%] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${list.image})` }}
                />
                <p className="text-bodySm lg:text-bodyBase text-netral-90 font-helvetica_regular text-center mt-[10px]">
                  {list.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <FaChevronRight
        className="text-[18px] lg:text-[24px] cursor-pointer text-primary-50"
        onClick={onNextBanner}
      />
    </div>
  );
};

export default HorizontalBanner;
