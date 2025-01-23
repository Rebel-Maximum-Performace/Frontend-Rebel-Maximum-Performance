"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const ProductBanner = ({ productBanners }) => {
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        className="w-full"
      >
        {productBanners?.map((banner, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-[30px] md:h-[50px] lg:h-[100px] overflow-hidden"
          >
            <Image
              src={banner.image}
              alt={`product-banner-${index}`}
              className="w-full h-full object-cover"
              width={980}
              height={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductBanner;
