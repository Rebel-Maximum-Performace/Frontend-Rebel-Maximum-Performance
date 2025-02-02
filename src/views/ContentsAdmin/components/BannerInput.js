'use client';
import { FaImage, FaTrash } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TextInput from '@/components/Form/TextInput';
import Select from '@/components/Form/Select';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import Image from 'next/image';
import useInitBannerInput from '../hooks/useInitBannerInput';
import Popup from '@/components/Popup';
import Button from '@/components/Button';

const BannerInput = ({
  title,
  type,
  banners = [],
  rules,
  isSingle = false,
  setDataForm,
  dataForm,
  defaultActiveBanner,
  setRemoveImages,
}) => {
  const {
    t,
    swiperRef,
    activeBanner,
    handleChangeActiveBanner,
    onChangeImage,
    onChangeDetail,
    onDeleteBanner,
    onChangeOrder,
    getWidthBanner,
    popupDeleteConfirmation,
    onClosePopup,
    handleDeleteBanner,
  } = useInitBannerInput({
    type,
    setDataForm,
    dataForm,
    banners,
    defaultActiveBanner,
    setRemoveImages,
  });

  return (
    <div className="mb-[20px]">
      <h3 className="text-bodyMd md:text-h3 font-helvetica_bold mb-[10px]">
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
                <div
                  className={`relative w-full max-w-[1080px] mx-auto ${getWidthBanner(
                    type,
                  )}`}
                >
                  <label
                    htmlFor={`Input-${type}`}
                    className={`w-full h-full absolute top-0 cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30`}
                  >
                    <FaImage className="relative text-[18px] md:text-[50px]" />
                    {activeBanner.isError ? (
                      <p className="text-bodySm md:text-h5 text-center text-primary-50">
                        {activeBanner.message}
                      </p>
                    ) : (
                      <p className="text-bodyBase md:text-h5">
                        {t(`CONTENTS.Unggah / Letakkan Di Sini`)}
                      </p>
                    )}
                    <input
                      name={`Input-${type}`}
                      id={`Input-${type}`}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onChangeImage(e, index)}
                    />
                  </label>
                </div>
              ) : (
                <div
                  className={`relative w-full max-w-[1080px] mx-auto ${getWidthBanner(
                    type,
                  )}`}
                >
                  <Image
                    src={
                      typeof banner.image === 'string'
                        ? banner.image
                        : URL.createObjectURL(banner.image)
                    }
                    alt={`banner-${index}`}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {activeBanner.isInput &&
        rules?.map((rule, i) => (
          <p
            className="text-bodySm font-helvetica_regular lg:text-bodyBase text-primary-50"
            key={i}
          >
            {rule}
          </p>
        ))}
      {banners?.filter((banner) => !banner.isInput).length > 0 && (
        <div className="flex flex-col md:flex-row md:space-x-[20px] space-y-[15px] md:space-y-0 mt-[10px]">
          {!activeBanner.isInput && type !== 'productPageBanner' && (
            <TextInput
              name="text"
              label={t(`BANNER.Teks`)}
              placeholder={t(`BANNER.Masukkan Teks`)}
              onChange={(e) => onChangeDetail('text', e.target.value)}
              value={activeBanner?.text || ''}
              isRequired
            />
          )}
          {!activeBanner.isInput && type !== 'productPageBanner' && (
            <TextInput
              name="link"
              label={t(`BANNER.Mengarahkan Ke`)}
              placeholder={t(`CONTENTS.Masukkan Link`)}
              onChange={(e) => onChangeDetail('link', e.target.value)}
              value={activeBanner?.link || ''}
              isRequired
            />
          )}
          <div className="flex items-center space-x-[30px] md:space-x-[20px]">
            {!isSingle && !activeBanner.isInput && (
              <div className="flex flex-col space-y-[5px] w-full h-full">
                <label
                  className={`font-helvetica-regular text-netral-90 text-labelSm md:text-labelBase`}
                >
                  Order
                  <span className="text-primary-50">*</span>
                </label>
                <Select
                  selected={activeBanner?.order?.toString()}
                  options={Array.from(
                    { length: banners.filter((b) => !b.isInput).length },
                    (_, i) => ({
                      label: (i + 1).toString(),
                      value: (i + 1).toString(),
                    }),
                  )}
                  placeholder="1"
                  onChange={onChangeOrder}
                />
              </div>
            )}

            {!activeBanner.isInput && (
              <FaTrash
                className={`text-primary-50 ${
                  isSingle
                    ? 'text-[20px] md:text-[24px]'
                    : 'text-[30px] md:text-[50px]'
                } cursor-pointer`}
                onClick={onDeleteBanner}
              />
            )}

            {!isSingle && (
              <div className="flex space-x-[10px] items-center">
                <div
                  className="bg-primary-50 p-[5px] rounded-full lg:block cursor-pointer"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <GrLinkPrevious className="text-[24px] md:text-[30px] text-netral-10" />
                </div>
                <div
                  className="bg-primary-50 p-[5px] rounded-full lg:block cursor-pointer"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <GrLinkNext className="text-[24px] md:text-[30px] text-netral-10" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== POPUP CONFIRMATION ===== */}
      <Popup
        open={popupDeleteConfirmation}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-primary-50 text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Peringatan`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {t(`BANNER.Apa anda yakin ingin menghapus spanduk`)}
        </p>
        <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
          <Button
            color="primary"
            variant="outlined"
            onClick={onClosePopup}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`COMPONENT.Batal`)}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDeleteBanner}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`ADD_PRODUCT.Hapus`)}
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default BannerInput;
