import React from 'react';
import Footer from '@/components/Footer';
import BackButton from './components/BackButton';
import { redirect } from 'next/navigation';
import ProductData from './components/ProductData';
import TopBar from '@/components/TopBar';

const ProductDetail = async ({ params }) => {
  const { slug } = await params;
  const productName = slug?.split('%3D')[0];
  const idProduct = slug?.split('%3D')[1];

  if (!idProduct) {
    redirect('/');
  }

  return (
    <>
      <TopBar role="User" />
      <div className="px-[10px] lg:px-[50px] py-[15px] lg:py-[30px]">
        <BackButton />
        <ProductData idProduct={idProduct} productName={productName} />
      </div>
      <Footer role="User" />
    </>
  );
};

export default ProductDetail;
