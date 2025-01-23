'use client';
import React, { useState } from 'react';
import useFormInputBanner from '../hooks/useFormInputBanner';
import BannerInput from './BannerInput';

const FormInputBanner = () => {
  const { t } = useFormInputBanner();
  const rulesBanners = {
    mainBanner: [
      `*${t(`CONTENTS.Resolusi`)} 1080 x 456 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
    promotionBanner: [
      `*${t(`CONTENTS.Resolusi`)} 1080 x 302 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
    productPageBanner: [
      `*${t(`CONTENTS.Resolusi`)} 980 x 100 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
  };

  const [dataForm, setDataForm] = useState({
    mainBanner: [],
    promotionBanner: [],
    productPageBanner: [],
  });

  const onChangeImage = (event, indexData, type) => {
    const files = event.target.files;
    const datas = [];
    [...files].map((file) => {
      const validFormats = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (!validFormats.includes(file.type)) {
        setDataForm((prev) => ({
          ...prev,
          [type]: prev[type].map((data, index) =>
            index === indexData
              ? {
                  ...data,
                  errorImage: {
                    isError: true,
                    message: t(`CONTENTS.Format file tidak valid`),
                  },
                }
              : data,
          ),
        }));
        return;
      }
      if (file.size > maxSize) {
        setDataForm((prev) => ({
          ...prev,
          [type]: prev[type].map((data, index) =>
            index === indexData
              ? {
                  ...data,
                  errorImage: {
                    isError: true,
                    message: t(`CONTENTS.File melebihi batas ukuran`),
                  },
                }
              : data,
          ),
        }));
        return;
      }
      datas.push(file);
    });
    event.target.value = '';
    if (type === 'promotionBanner') {
      setDataForm((prev) => ({
        ...prev,
        promotionBanner: [
          {
            text: '',
            link: '',
            order: 0,
            image: datas[0],
            errorImage: {
              isError: false,
              message: '',
            },
          },
        ],
      }));
    } else {
      setDataForm((prev) => {
        const withoutInput = prev[type].filter((data) => !data.isInput);

        return {
          ...prev,
          [type]: [
            ...withoutInput,
            datas.map((data, idx) => ({
              text: '',
              link: '',
              order: withoutInput.length + (idx + 1),
              image: data,
              errorImage: {
                isError: false,
                message: '',
              },
            })),
            { isInput: true },
          ],
        };
      });
    }
  };

  const onChangeDetail = (type, detail) => {
    if (indexData > -1) {
      setDataForm((prev) => ({
        ...prev,
        [type]: prev[type].map((data, index) =>
          index === detail.index ? { ...data, detail } : data,
        ),
      }));
    }
  };

  return (
    <>
      <BannerInput
        t={t}
        title={t(`CONTENTS.Spanduk Utama`)}
        banners={[{ isInput: true }]}
        onChangeDetail={(detail) => onChangeDetail('mainBanner', detail)}
        onChangeImage={(e, idx) => onChangeImage(e, idx, 'mainBanner')}
        rules={rulesBanners.mainBanner}
      />
      <BannerInput
        t={t}
        title={t(`CONTENTS.Spanduk Produk Baru / Spanduk Promo`)}
        banners={[{ isInput: true }]}
        onChangeDetail={() => {}}
        onChangeImage={() => {}}
        rules={rulesBanners.mainBanner}
        isSingle
      />
      <BannerInput
        t={t}
        title={t(`CONTENTS.Spanduk Halaman Produk`)}
        banners={[{ isInput: true }]}
        onChangeDetail={() => {}}
        onChangeImage={() => {}}
        rules={rulesBanners.mainBanner}
      />
      {/* <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold mb-[10px]">
        {t(`CONTENTS.Spanduk Produk Baru / Spanduk Promo`)}
      </h3>

      <label
        htmlFor="images"
        className="cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[683px] lg:h-[192px] flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30"
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
          value={imageFiles}
          onChange={(e) => onChangeInputImage(e, 'NEW_PRODUCT_BANNER')}
        />
      </label>
      <p className="text-bodySm font-helvetica_regular lg:text-bodyBase mt-[10px] text-primary-50">
        *{t(`CONTENTS.Resolusi`)} 1080 x 302 px
      </p>
      <p className="text-bodySm font-helvetica_regular lg:text-bodyBase mb-[15px] lg:mb-[30px] text-primary-50">
        *{t(`CONTENTS.Maks. ukuran file 5mb`)}
      </p>

      <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold mb-[10px]">
        {t(`CONTENTS.Spanduk Halaman Produk`)}
      </h3>

      <label
        htmlFor="images"
        className="cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed w-[90px] h-[90px] md:w-[100px] md:h-[100px] lg:w-[683px] lg:h-[64px] flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30"
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
          onChange={(e) => onChangeInputImage(e, 'PRODUCT_PAGE_BANNER')}
        />
      </label>
      <p className="text-bodySm font-helvetica_regular lg:text-bodyBase mt-[10px] text-primary-50">
        *{t(`CONTENTS.Resolusi`)} 980 x 100 px
      </p>
      <p className="text-bodySm font-helvetica_regular lg:text-bodyBase mb-[15px] lg:mb-[30px] text-primary-50">
        *{t(`CONTENTS.Maks. ukuran file 5mb`)}
      </p> */}
    </>
  );
};

export default FormInputBanner;
