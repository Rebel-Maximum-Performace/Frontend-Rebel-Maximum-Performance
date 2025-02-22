'use client';
import React from 'react';
import Image from 'next/image';
import { formatMoney } from '@/helpers/formatting';
import Button from '@/components/Button';
import LogoAmazon from '@/assets/img/logo amazon.webp';
import LogoAlibaba from '@/assets/img/logo alibaba.webp';
import DetailsData from './DetailsData';
import FAQ from '@/components/FAQ';
import { arrayCategoryToString } from '@/helpers';
import useInitProductData from '../hooks/useInitProductData';

const ProductData = ({ idProduct, productName }) => {
  const { activeImage, productDetail, isLoadingDetail, handleClickImage, t } =
    useInitProductData({ id: idProduct });

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:justify-between my-[10px] lg:my-[20px]">
        {isLoadingDetail || !productDetail ? (
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[10px] lg:rounded-[15px] mx-auto lg:mx-0 animate-pulse bg-netral-40" />
        ) : (
          <Image
            src={productDetail.images[activeImage].urlImage}
            alt={productDetail.productName}
            width={400}
            height={400}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[10px] lg:rounded-[15px] mx-auto lg:mx-0 object-cover"
          />
        )}
        <div className="w-full lg:w-[calc(100%-400px-3%)] lg:h-[400px] lg:ml-[3%]">
          {isLoadingDetail || !productDetail ? (
            <div className="w-full flex flex-col h-full justify-between">
              <div>
                <div className="w-[80%] bg-netral-40 h-[14px] md:h-[21px] animate-pulse mb-[10px] lg:mb-[20px] mt-[10px] lg:mt-0" />
                <div className="w-[50%] bg-netral-50 h-[14px] md:h-[21px] animate-pulse mb-[10px] lg:mb-[20px]" />
                <div className="w-[60%] bg-netral-50 h-[14px] md:h-[21px] animate-pulse mb-[10px] lg:mb-[20px]" />
                <div className="w-[20%] bg-netral-50 h-[14px] md:h-[21px] animate-pulse mb-[10px] lg:mb-[20px]" />
                <div className="w-[50%] bg-netral-50 h-[28px] md:h-[41px] animate-pulse mb-[10px] lg:mb-[10px] rounded-[10px] lg:rounded-[15px]" />
                <div className="w-[50%] bg-netral-50 h-[28px] md:h-[41px] animate-pulse mb-[10px] lg:mb-[20px] rounded-[10px] lg:rounded-[15px]" />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col h-full justify-between">
              <div className="mb-[15px] lg:mb-0 order-2 lg:order-1">
                <h3 className="text-bodySm md:text-h4 font-helvetica_regular md:mb-[5px] mt-[10px] lg:mt-0">
                  {productDetail.productName}
                </h3>
                <h3 className="text-bodySm md:text-h4 font-helvetica_bold md:mb-[5px]">
                  {productDetail.sku}
                </h3>
                <h3 className="text-bodySm md:text-h4 font-helvetica_regular text-secondary-80 md:mb-[5px]">
                  {arrayCategoryToString(
                    productDetail.categories.map((category) => category.name),
                  )}
                </h3>
                <h4 className="text-bodySm md:text-h4 font-helvetica_bold text-primary-50 mb-[10px] md:mb-[20px]">
                  {formatMoney(productDetail.price, '$')}
                </h4>
                <a
                  href={productDetail.amazonLink}
                  target="_blank"
                  className="mb-[10px] block"
                >
                  <Button
                    color="primary"
                    variant="contained"
                    className="w-[50%] cursor-pointer justify-center"
                    iconRight={
                      <Image
                        src={LogoAmazon}
                        alt="Logo Amazon"
                        width={44}
                        height={44}
                        className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] ml-[5px]"
                      />
                    }
                  >
                    {t('PRODUCTS.Beli di Amazon')}
                  </Button>
                </a>
                <a href={productDetail.alibabaLink} target="_blank">
                  <Button
                    color="primary"
                    variant="contained"
                    className="w-[50%] cursor-pointer justify-center"
                    iconRight={
                      <Image
                        src={LogoAlibaba}
                        alt="Logo Alibaba"
                        width={44}
                        height={44}
                        className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] ml-[5px]"
                      />
                    }
                  >
                    {t('PRODUCTS.Beli di Alibaba')}
                  </Button>
                </a>
              </div>
              <div className="flex w-full overflow-auto space-x-[5px] lg:space-x-[10px] scroll-custom order-1 lg:order-2 mt-[15px] lg:mt-0">
                {productDetail.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.urlImage}
                    alt={`image-${productName}-${index}`}
                    width={100}
                    height={100}
                    className={`w-[50px] md:w-[100px] h-[50px] md:h-[100px] rounded-[10px] lg:rounded-[15px] cursor-pointer object-cover ${
                      index === activeImage ? 'border-2 border-primary-50' : ''
                    }`}
                    onClick={() => handleClickImage(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <DetailsData isLoading={isLoadingDetail} rows={productDetail?.details} />

      {productDetail?.faqs?.length > 0 && (
        <>
          <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
            FAQ
          </h3>
          <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px] mb-[10px] lg:mb-[15px]" />
          <FAQ faqs={productDetail?.faqs} />
        </>
      )}
    </div>
  );
};

export default ProductData;
