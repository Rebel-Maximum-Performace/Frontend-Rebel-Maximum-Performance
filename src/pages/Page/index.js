'use client';
import React from 'react';
import Footer from '@/components/Footer';
import MainBanner from './components/MainBanner';
import Link from 'next/link';
import HorizontalBanner from './components/HorizontalBanner';
import PromoBanner from './components/PromoBanner';
import ProductList from './components/ProductList';
import useInitHomePage from './hooks/useInitHomePage';
import TopBar from '@/components/TopBar';

const HomePage = () => {
  const { t, mainBanners, promotionBanner, horizontalLists, setLoading } =
    useInitHomePage();

  return (
    <>
      <TopBar role="User" />
      <MainBanner mainBanners={mainBanners || []} />
      {horizontalLists?.map((horizontalList, index) => (
        <div
          key={index}
          className="py-[10px] px-[10px] lg:px-[50px] lg:py-[20px] mb-[10px] lg:mb-[20px]"
        >
          <div className="flex justify-between items-center mb-[15px] lg:mb-[20px]">
            <h3 className="text-bodySm md:text-h5 lg:text-h2 font-helvetica_regular text-netral-90">
              {horizontalList.title}
            </h3>
            <Link
              href={horizontalList.link || '#'}
              onClick={() => setLoading(true)}
            >
              <h3 className="text-bodySm md:text-h5 lg:text-h2 font-helvetica_regular text-primary-50">
                {t(`HOMEPAGE.Lihat Semua`)}
              </h3>
            </Link>
          </div>
          <HorizontalBanner lists={horizontalList.details} />
        </div>
      ))}
      <PromoBanner
        text={promotionBanner?.text}
        image={promotionBanner?.image}
        link={promotionBanner?.link || '/'}
      />
      <ProductList />
      <Footer role="User" />
    </>
  );
};

export default HomePage;
