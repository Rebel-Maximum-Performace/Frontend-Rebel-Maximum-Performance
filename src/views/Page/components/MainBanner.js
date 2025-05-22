'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Button from '@/components/Button';
import { useWebContext } from '@/context/WebContext';

const MainBanner = ({ mainBanners = [] }) => {
  const swiperRef = useRef(null);
  const [activeslide, setActiveslide] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const { t, setLoading } = useWebContext();

  const onClickBanner = () => {
    setShowOverlay(!showOverlay);
  };
  const onClickPagination = (index) => {
    setActiveslide(index);
    swiperRef.current.slideTo(index);
  };

  return (
    <div className="relative font-helvetica_regular">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveslide(swiper.activeIndex)}
        className="w-full"
      >
        {mainBanners?.map((banner, index) => (
          <SwiperSlide key={index} onClick={onClickBanner}>
            <div className="relative w-full cursor-pointer">
              {/* Gambar banner yang responsive */}
              <img
                src={banner.image}
                alt="Banner"
                className="w-full h-auto object-cover"
              />

              {/* Overlay konten */}
              {showOverlay && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center flex-col text-center p-4">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-bodyMd lg:text-display text-netral-10">
                      {banner.text}
                    </h1>
                    <a
                      href={banner.link || '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        color="third"
                        variant="contained"
                        className="cursor-pointer mt-[10px] lg:mt-[20px]"
                      >
                        {t(`HOMEPAGE.Beli Sekarang`)}
                      </Button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination */}
      <div className="w-full flex justify-center items-center py-[10px]">
        {mainBanners?.map((_, index) => (
          <span
            key={index}
            onClick={() => onClickPagination(index)}
            className={`rounded-full w-[15px] h-[15px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] mr-[20px] cursor-pointer ${
              activeslide === index ? 'bg-primary-50' : 'bg-secondary-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;
