import React, { useState } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { LuChevronUp, LuChevronDown } from 'react-icons/lu';
import TextInput from '@/components/Form/TextInput';
import { useWebContext } from '@/context/WebContext';

const DropDownPrice = ({ t, onChangeQueryState }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { minQuery, maxQuery } = useWebContext();

  return (
    <div className="relative inline-block text-left w-full mb-[5px] lg:mb-[10px]">
      <button
        onClick={() => setIsSelectOpen(!isSelectOpen)}
        className={`font-helvetica-regular flex items-center justify-between bg-netral-10 border border-netral-40 text-netral-90 px-[7px] md:px-[10px] py-[5px] md:py-[7px] rounded-[10px] md:rounded-[15px] text-bodySm md:text-bodyBase w-full`}
      >
        <div className={`flex items-center justify-between w-full`}>
          <p>{t('PRODUCTS.Harga')}</p>
          {isSelectOpen ? (
            <LuChevronUp className="text-[18px] md:text-[24px]" />
          ) : (
            <LuChevronDown className="text-[18px] md:text-[24px]" />
          )}
        </div>
      </button>
      {isSelectOpen && (
        <div className="absolute left-0 mt-0 shadow-md border rounded-[10px] md:rounded-[15px] w-full z-50 overflow-hidden bg-netral-10 p-[15px]">
          <div className="w-full flex justify-between items-center">
            <div className="w-[50%] mr-[15px]">
              <p className="text-labelSm lg:text-labelBase font-helvetica_regular">
                {t(`PRODUCTS.Min`)}
              </p>
              <TextInput
                name="minPrice"
                placeholder="0"
                onChange={(e) => onChangeQueryState('min', e.target.value)}
                value={minQuery}
                iconLeft={
                  <MdOutlineAttachMoney className="text-[18px] md:text-[24px] text-primary-50" />
                }
                className="w-full"
              />
            </div>
            <div className="w-[50%]">
              <p className="text-labelSm lg:text-labelBase font-helvetica_regular">
                {t(`PRODUCTS.Maks`)}
              </p>
              <TextInput
                name="maxPrice"
                placeholder="0"
                onChange={(e) => onChangeQueryState('max', e.target.value)}
                value={maxQuery}
                iconLeft={
                  <MdOutlineAttachMoney className="text-[18px] md:text-[24px] text-primary-50" />
                }
                className="w-[50%] mr-[15px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownPrice;
