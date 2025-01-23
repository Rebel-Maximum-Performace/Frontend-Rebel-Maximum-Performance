'use client';
import React, { useState } from 'react';
import { LuChevronUp, LuChevronDown } from 'react-icons/lu';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { changeLanguage } from 'i18next';

const FlagID = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9248 23.25C18.1498 23.25 23.1748 18.225 23.1748 12H0.674805C0.674805 18.225 5.6998 23.25 11.9248 23.25Z"
      fill="#F9F9F9"
    />
    <path
      d="M11.9248 0.75C5.6998 0.75 0.674805 5.775 0.674805 12H23.1748C23.1748 5.775 18.1498 0.75 11.9248 0.75Z"
      fill="#ED4C5C"
    />
  </svg>
);

const FlagEN = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_3274_3117"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24"
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_3274_3117)">
      <path
        d="M12 0H24V3L22.5 4.5L24 6V9L22.5 10.5L24 12V15L22.5 16.5L24 18V21L12 22.5L0 21V18L1.5 16.5L0 15V12L12 0Z"
        fill="#EEEEEE"
      />
      <path
        d="M10.5 3H24V6H10.5V3ZM10.5 9H24V12H12L10.5 9ZM0 15H24V18H0V15ZM0 21H24V24H0V21Z"
        fill="#D80027"
      />
      <path d="M0 0H12V12H0V0Z" fill="#0052B4" />
      <path
        d="M8.76562 11.3906L11.4375 9.46875H8.15625L10.8281 11.3906L9.79688 8.25L8.76562 11.3906ZM4.96875 11.3906L7.64062 9.46875H4.35938L7.03125 11.3906L6 8.25L4.96875 11.3906ZM1.17188 11.3906L3.84375 9.46875H0.5625L3.23438 11.3906L2.20312 8.25L1.17188 11.3906ZM8.76562 7.59375L11.4375 5.67188H8.15625L10.8281 7.59375L9.79688 4.45312L8.76562 7.59375ZM4.96875 7.59375L7.64062 5.67188H4.35938L7.03125 7.59375L6 4.45312L4.96875 7.59375ZM1.17188 7.59375L3.84375 5.67188H0.5625L3.23438 7.59375L2.20312 4.45312L1.17188 7.59375ZM8.76562 3.75L11.4375 1.82812H8.15625L10.8281 3.75L9.79688 0.609375L8.76562 3.75ZM4.96875 3.75L7.64062 1.82812H4.35938L7.03125 3.75L6 0.609375L4.96875 3.75ZM1.17188 3.75L3.84375 1.82812H0.5625L3.23438 3.75L2.20312 0.609375L1.17188 3.75Z"
        fill="#EEEEEE"
      />
    </g>
  </svg>
);

const DropDownLanguage = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const params = useParams();
  const [language, setLanguage] = useState(params.lng);
  const router = useRouter();
  const urlPath = usePathname();
  const pathnames = urlPath.split('/');

  const handleChangeLanguage = () => {
    changeLanguage(language === 'id' ? 'en' : 'id');
    pathnames[1] = language === 'id' ? 'en' : 'id';
    router.replace(pathnames.join('/'), { scroll: false });
  };

  return (
    <div className="relative inline-block text-left w-full mb-[5px] lg:mb-[10px]">
      <button
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className={`font-helvetica-regular flex items-center justify-between bg-netral-10 border border-netral-40 text-netral-90 px-[7px] md:px-[10px] py-[5px] md:py-[7px] rounded-[10px] md:rounded-[15px] text-bodySm md:text-bodyBase w-full`}
      >
        <div className={`flex items-center justify-between w-full`}>
          <div className="flex space-x-2">
            {language === 'id' ? <FlagID /> : <FlagEN />}
            <p>{language === 'id' ? 'Indonesia' : 'English'}</p>
          </div>
          {isSelectOpen ? (
            <LuChevronUp className="text-[18px] md:text-[24px]" />
          ) : (
            <LuChevronDown className="text-[18px] md:text-[24px]" />
          )}
        </div>
      </button>
      {isSelectOpen && (
        <div
          className="absolute cursor-pointer hover:bg-netral-20 left-0 mt-0 shadow-md border rounded-[10px] md:rounded-[15px] w-full z-50 overflow-hidden bg-netral-10 p-[15px]"
          onClick={() => {
            setLanguage(language === 'id' ? 'en' : 'id');
            setIsSelectOpen(false);
            handleChangeLanguage();
          }}
        >
          <div className="w-full flex space-x-2">
            {language === 'en' ? <FlagID /> : <FlagEN />}
            <p>{language === 'en' ? 'Indonesia' : 'English'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownLanguage;
