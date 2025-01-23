'use client';
import Button from '@/components/Button';
import { useWebContext } from '@/context/WebContext';
import Link from 'next/link';
import React from 'react';

const PromoBanner = ({ text, image, link }) => {
  const { t, setLoading } = useWebContext();

  return (
    <div
      className="w-full h-[100px] md:h-[200px] lg:h-[302px] bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full bg-gradient-to-r from-primary-50/70 to-primary-70/0 flex flex-col items-center justify-center">
        <h1 className="text-bodySm lg:text-h1 lg:w-[70%] text-center text-netral-10 font-bold lg:mb-[10px]">
          {text}
        </h1>
        <Link href={link || '/'} onClick={() => setLoading(true)}>
          <Button color="third" variant="contained" className="cursor-pointer">
            {t(`HOMEPAGE.Beli Sekarang`)}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;
