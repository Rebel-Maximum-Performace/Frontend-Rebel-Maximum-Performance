import React from 'react';
import Footer from '@/components/Footer';
import AboutUsBanner from './components/AboutUsBanner';
import Image from 'next/image';
import LogoAlibaba from '@/assets/img/logo alibaba.webp';
import LogoAmazon from '@/assets/img/logo amazon.webp';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineMailOutline, MdOutlineWhatsapp } from 'react-icons/md';
import { SiGooglemaps } from 'react-icons/si';
import TopBar from '@/components/TopBar';

const AboutUsPage = () => {
  return (
    <>
      <TopBar role="User" />
      <AboutUsBanner />
      <div className="w-full px-[10px] lg:px-[50px] py-[15px] lg:py-[30px]">
        <div className="w-full lg:justify-between flex flex-col lg:flex-row">
          <div className="lg:w-[calc(50%-20px)] w-full mb-[20px] lg:mb-[40px]">
            <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
              Vision
            </h3>
            <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]" />
            <p className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90 text-justify mt-[5px] lg:mt-[10px]">
              To be the global leader in providing high-quality motorcycle
              parts, fulfilling the needs of motorcyclists worldwide with
              exceptional service.
            </p>
          </div>
          <div className="lg:w-[calc(50%-20px)] w-full mb-[20px] lg:mb-[40px]">
            <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
              Mission
            </h3>
            <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]" />
            <p className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90 text-justify mt-[5px] lg:mt-[10px]">
              Consistently providing high-quality motorcycle parts, building a
              robust global distribution network, and delivering exceptional
              customer service to meet the needs of motorcyclists worldwide.
            </p>
          </div>
        </div>
        <div className=" w-full mb-[20px] lg:mb-[40px]">
          <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
            Contact
          </h3>
          <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]" />
          <div className="mt-[10px] lg:mt-[15px] flex space-x-[10px]">
            <a
              href={process.env.NEXT_PUBLIC_LINK_ALIBABA || '#'}
              target="_blank"
            >
              <Image
                src={LogoAlibaba}
                alt="Logo Alibaba"
                width={44}
                height={44}
                className="w-[28px] h-[28px] md:w-[44px] md:h-[44px] cursor-pointer"
              />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINK_INSTAGRAM || '#'}
              target="_blank"
            >
              <div className="bg-[#FD0879] p-[5px] rounded-full lg:block cursor-pointer">
                <FaInstagram className="text-[18px] md:text-[30px] text-netral-10" />
              </div>
            </a>
            <a
              href={
                process.env.NEXT_PUBLIC_LINK_EMAIL
                  ? `mailto:${process.env.NEXT_PUBLIC_LINK_EMAIL}`
                  : '#'
              }
              target="_blank"
            >
              <div className="bg-netral-10 p-[5px] rounded-full lg:block cursor-pointer border border-netral-40">
                <MdOutlineMailOutline className="text-[18px] md:text-[30px] text-primary-50" />
              </div>
            </a>
            <a
              href={process.env.NEXT_PUBLIC_LINK_AMAZON || '#'}
              target="_blank"
            >
              <Image
                src={LogoAmazon}
                alt="Logo Amazon"
                width={44}
                height={44}
                className="w-[28px] h-[28px] md:w-[44px] md:h-[44px] cursor-pointer border border-netral-40 rounded-full"
              />
            </a>
            <a href={process.env.NEXT_PUBLIC_LINK_WHATSAPP} target="_blank">
              <div className="bg-netral-10 p-[5px] rounded-full hidden lg:block cursor-pointer border border-netral-40">
                <MdOutlineWhatsapp className="text-[24px] md:text-[30px] text-primary-50" />
              </div>
            </a>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-[10px] my-[10px] lg:my-[15px]">
            <SiGooglemaps className="text-[18px] md:text-[30px] text-primary-50" />
            <p className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90">
              337 Lula Ferry, Port Taya 71519
            </p>
          </div>
          <div className="flex items-center space-x-[10px]">
            <SiGooglemaps className="text-[18px] md:text-[30px] text-primary-50" />
            <p className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90">
              10 Shingxian, China 00519
            </p>
          </div>
        </div>
      </div>

      <Footer role="User" />
    </>
  );
};

export default AboutUsPage;
