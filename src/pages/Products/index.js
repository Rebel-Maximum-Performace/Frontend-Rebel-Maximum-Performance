'use client';
import React from 'react';
import Footer from '@/components/Footer';
import ProductBanner from './components/ProductBanner';
import ProductList from './components/ProductList';
import useInitProductPage from './hooks/useInitProductPage';
import TopBar from '@/components/TopBar';

const ProductPage = () => {
  const { productBanners, categories, attributes } = useInitProductPage();

  return (
    <>
      <TopBar role="User" />
      <div className="px-[10px] lg:px-[50px] py-[15px] lg:py-[30px]">
        <ProductBanner productBanners={productBanners} />
        <ProductList
          categoryList={categories?.map((category) => ({
            label: category.name,
            value: category.name,
          }))}
          attributes={attributes}
        />
      </div>
      <Footer role="User" />
    </>
  );
};

export default ProductPage;
