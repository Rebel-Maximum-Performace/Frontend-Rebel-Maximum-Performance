import React from 'react';
import { FaCopyright, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import LogoAlibaba from '@/assets/img/logo alibaba.webp';
import LogoAmazon from '@/assets/img/logo amazon.webp';
import { MdOutlineMailOutline } from 'react-icons/md';
import Link from 'next/link';

const FooterUser = () => {
  return (
    <div className="text-netral-10 bg-primary-50 p-[30px] lg:p-[60px] space-y-[15px] lg:space-y-[40px]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-[15px] lg:space-y-0">
        <div className="flex flex-col space-y-[16px] lg:space-y-[30px]">
          <div className="flex flex-col space-y-[5px]">
            <h4 className="text-bodySm md:text-h4 font-bold font-helvetica_bold">
              Company Info
            </h4>
            <Link href="/about-us">
              <p className="text-bodySm md:text-bodyBase hover:text-netral-30 cursor-pointer font-helvetica_regular">
                About Us
              </p>
            </Link>
          </div>
          <div className="flex flex-col space-y-[5px]">
            <h4 className="text-bodySm md:text-h4 font-bold font-helvetica_bold">
              Office Address
            </h4>
            <ul>
              <li className="text-bodySm md:text-bodyBase font-helvetica_regular">
                {process.env.NEXT_PUBLIC_ADDRESS_1}
              </li>
              <li className="text-bodySm md:text-bodyBase font-helvetica_regular">
                {process.env.NEXT_PUBLIC_ADDRESS_2}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col space-y-[5px]">
          <h4 className="text-bodySm md:text-h4 font-bold font-helvetica_bold">
            Customer Care
          </h4>
          <Link href="/contact-us">
            <p className="text-bodySm md:text-bodyBase hover:text-netral-30 cursor-pointer font-helvetica_regular">
              Contact Us
            </p>
          </Link>
        </div>
        <div className="flex flex-col space-y-[5px]">
          {/* <h4 className="text-bodySm md:text-h4 font-bold font-helvetica_bold">
            Resource Center
          </h4>
          <Link href="/faq">
            <p className="text-bodySm md:text-bodyBase hover:text-netral-30 cursor-pointer font-helvetica_regular">
              FAQ
            </p>
          </Link> */}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-[25px] space-y-[15px] lg:space-y-0">
        <div className="flex space-x-[10px] items-center">
          <FaCopyright className="text-netral-10 text-[18px] md:text-[24px]" />
          <h4 className="text-bodySm md:text-h4 font-bold font-helvetica_bold">
            Copyright
          </h4>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-[15px] lg:items-center space-y-[15px] lg:space-y-0">
          <h4 className="text-bodySm md:text-h4 font-helvetica_regular">
            Follow Us:
          </h4>
          <div className="flex space-x-[15px] items-center flex-wrap">
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
              <div className="bg-netral-10 p-[5px] rounded-full lg:block cursor-pointer">
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
                className="w-[28px] h-[28px] md:w-[44px] md:h-[44px] cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterUser;
