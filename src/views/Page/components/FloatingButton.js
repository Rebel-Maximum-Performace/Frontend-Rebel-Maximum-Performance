import { useWebContext } from '@/context/WebContext';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { MdOutlineMailOutline, MdOutlineWhatsapp } from 'react-icons/md';

const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useWebContext();

  return (
    <div className="fixed bottom-[20px] right-[20px] flex space-x-3 z-[900]">
      {open && (
        <div className="flex space-x-3">
          {' '}
          <a
            href={
              process.env.NEXT_PUBLIC_LINK_EMAIL
                ? `mailto:${process.env.NEXT_PUBLIC_LINK_EMAIL}`
                : '#'
            }
            target="_blank"
          >
            <div className="bg-netral-10 p-[10px] rounded-full cursor-pointer border border-primary-50">
              <MdOutlineMailOutline className="text-[24px] md:text-[30px] text-primary-50" />
            </div>
          </a>
          <a href={process.env.NEXT_PUBLIC_LINK_WHATSAPP} target="_blank">
            <div className="bg-netral-10 p-[10px] rounded-full cursor-pointer border border-primary-50">
              <MdOutlineWhatsapp className="text-[24px] md:text-[30px] text-primary-50" />
            </div>
          </a>
        </div>
      )}
      <div className="px-3 py-2 pr-[14px] bg-primary-50 text-white font-helvetica_bold rounded-full flex justify-center items-center cursor-pointer drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] border-[0.01px] border-black">
        {!open && (
          <p onClick={() => setOpen(true)} className="text-[16px]">
            {t('HOMEPAGE.Hubungi Kami')}
          </p>
        )}
        {open && (
          <div onClick={() => setOpen(false)}>
            <FaChevronLeft className="text-[18px] md:text-[24px] text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingButton;
