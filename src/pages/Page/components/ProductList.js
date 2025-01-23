'use client';
import Link from 'next/link';
import React from 'react';
import { formatMoney } from '@/helpers/formatting';
import { arrayCategoryToString } from '@/helpers';
import useInitProductList from '../hooks/useInitProductList';

const ProductList = () => {
  const { t, products, isLoading } = useInitProductList();

  return (
    <div className="w-full px-[10px] lg:px-[50px] py-[15px] lg:py-[30px]">
      <div className="flex justify-between items-center mb-[10px] lg:mb-[20px]">
        <h3 className="text-bodyMd lg:text-display font-helvetica_bold">
          {t('HOMEPAGE.Produk Terlaris')}
        </h3>
        <Link href="/products?sort=Best-Seller">
          <p className="text-bodyMd lg:text-h4 font-helvetica_regular text-primary-50">
            {t(`HOMEPAGE.Produk Lainnya`)}
          </p>
        </Link>
      </div>
      <div className="flex flex-wrap justify-between">
        {isLoading ? (
          [1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-[calc(50%-10px)] md:w-[calc(100%/3-10px)] lg:w-[calc(25%-10px)] mb-[10px] animate-pulse overflow-hidden border border-netral-20 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col"
            >
              <div className="pt-[100%] w-full bg-netral-20" />
              <div className="w-full p-[5px] mb-[60px] md:mb-[120px]">
                <div className="animate-pulse">
                  <div className="w-full h-[28px] lg:h-[48px] bg-netral-20" />
                </div>
              </div>
            </div>
          ))
        ) : products?.length > 0 ? (
          products?.slice(0, 5).map((product, index) => (
            <Link
              href={`/products/${product.name?.replaceAll(' ', '-')}=${
                product.id
              }`}
              key={index}
              className="w-[calc(50%-5px)] md:w-[calc(100%/3-10px)] lg:w-[calc(25%-10px)] mb-[10px] overflow-hidden border border-netral-20 hover:border-primary-50 hover:shadow-xl cursor-pointer hover:shadow-primary-50/25 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col"
            >
              <div
                className="pt-[100%] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              />
              <div className="w-full p-[5px] lg:p-[10px]">
                <div className="w-full space-y-[1px]">
                  <h3 className="font-helvetica_regular h-[39px] lg:h-[48px] text-bodySm lg:text-bodyBase text-netral-90 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                    {product.name}
                  </h3>
                  <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-netral-90">
                    {product.sku}
                  </h4>
                  <h4 className="font-helvetica_regular h-[30px] lg:h-[42px] text-bodyXs lg:text-bodyMd text-secondary-80 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                    {arrayCategoryToString(product.categories)}
                  </h4>
                </div>
                <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-primary-50 mt-[10px]">
                  {formatMoney(product.price, '$')}
                </h4>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full text-center text-bodySm lg:text-h4 font-helvetica_regular text-netral-90">
            {t(`HOMEPAGE.Produk Tidak Ditemukan`)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
