'use client';
import { FaImage, FaTrash } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';
import TextInput from '@/components/Form/TextInput';
import Select from '@/components/Form/Select';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';

const BannerInput = ({
  t,
  title,
  onChangeImage,
  banners = [],
  onChangeDetail,
  rules,
  isSingle = false,
}) => {
  const swiperRef = useRef(null);
  const [activeBanner, setActiveBanner] = useState(
    banners.length > 0
      ? {
          index: 0,
          image: banners[0].image,
          text: banners[0].text,
          link: banners[0].link,
        }
      : { isInput: true },
  );

  useEffect(() => {
    if (banners?.filter((item) => !item.isInput).length > 0) {
      const lastIndex = banners.length - 1;
      swiperRef.current?.slideTo(lastIndex);
    }
  }, [banners]);

  const handleChangeActiveBanner = (swiper) => {
    const selectedData = banners.find(
      (_, index) => index === swiper.activeIndex,
    );
    if (selectedData) {
      setActiveBanner({ ...selectedData, index: swiper.activeIndex });
    } else {
      setActiveBanner({ isInput: true });
    }
  };

  return (
    <div className="mb-[20px]">
      <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold mb-[10px]">
        {title}
      </h3>

      <div className="relative font-helvetica_regular mb-[10px]">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleChangeActiveBanner}
          className="w-full"
        >
          {banners?.map((banner, index) => (
            <SwiperSlide key={index}>
              {banner.isInput ? (
                <label
                  htmlFor="images"
                  className="cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[683px] lg:h-[289px] flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30"
                >
                  <FaImage className="text-[18px] lg:text-[50px]" />
                  <p className="text-bodyBase lg:text-h5">
                    {t(`CONTENTS.Unggah / Letakkan Di Sini`)}
                  </p>
                  <input
                    name="images"
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onChangeImage(e, index)}
                  />
                </label>
              ) : (
                <div
                  className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[683px] lg:h-[289px] relative bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {rules?.map((rule, i) => (
        <p
          className="text-bodySm font-helvetica_regular lg:text-bodyBase text-primary-50"
          key={i}
        >
          {rule}
        </p>
      ))}
      {banners?.filter((banner) => !banner.isInput).length > 0 && (
        <div className="flex lg:space-x-[20px] mt-[10px]">
          <TextInput
            name="title"
            label={t(`CONTENTS.Judul`)}
            onChange={(e) =>
              onChangeDetail({ ...activeBanner, title: e.target.value })
            }
            value={activeBanner?.title || ''}
            isRequired
          />
          <TextInput
            name="link"
            label={t(`BANNER.Mengarahkan Ke`)}
            onChange={(e) =>
              onChangeDetail({ ...activeBanner, link: e.target.value })
            }
            value={activeBanner?.link || ''}
            isRequired
          />
          <div className="flex items-center lg:space-x-[10px]">
            {!isSingle && (
              <div className="flex flex-col space-y-[5px] w-full h-full">
                <label
                  className={`font-helvetica-regular text-netral-90 text-labelSm md:text-labelBase`}
                >
                  Order
                  <span className="text-primary-50">*</span>
                </label>
                <Select
                  selected={activeBanner?.order}
                  options={Array.from(
                    { length: banners.length },
                    (_, i) => i + 1,
                  )}
                  placeholder="1"
                  onChange={(value) =>
                    onChangeDetail({ ...activeBanner, order: value })
                  }
                />
              </div>
            )}

            <FaTrash
              className={`text-primary-50 text-[24px] ${
                isSingle ? 'lg:text-[24px]' : 'lg:text-[50px]'
              } cursor-pointer`}
            />

            {!isSingle && (
              <div className="flex space-x-[10px] items-center">
                <div className="bg-primary-50 p-[5px] rounded-full hidden lg:block cursor-pointer">
                  <GrLinkPrevious className="text-[24px] md:text-[30px] text-netral-10" />
                </div>
                <div className="bg-primary-50 p-[5px] rounded-full hidden lg:block cursor-pointer">
                  <GrLinkNext className="text-[24px] md:text-[30px] text-netral-10" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerInput;
