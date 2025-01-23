import { useTranslation } from '@/app/i18n/client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Table = ({
  headers = [],
  contents = [],
  onChangeHeader,
  onChangeContent,
}) => {
  const { lng } = useParams();

  return (
    <div className="relative w-full overflow-x-auto scroll-custom">
      {/* Table Header */}
      <div className="mb-[10px] lg:mb-[15px] w-max flex items-center bg-primary-50 text-netral-10 shadow-md shadow-netral-100/20 rounded-[10px] lg:rounded-[15px] sticky top-0 z-10 px-[10px] py-[5px] lg:p-[15px] font-helvetica_bold text-bodySm lg:text-bodyBase">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`${
              header.position === 'right'
                ? 'text-right'
                : header.position === 'center'
                ? 'text-center'
                : 'text-left'
            }`}
            style={{ width: 'max-content' }}
          >
            <DynamicInput
              type="text"
              name={`header-${index}`}
              id={`header-${index}`}
              placeholder={lng === 'id' ? 'Kolom' : 'Column'}
              value={header.label || ''}
              onChange={(value, width) => {
                onChangeHeader(index, value, header.label, width);
              }}
              className={`font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-dashed border-secondary-50 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 bg-transparent w-max table`}
            />
            {/* <Popover className="relative">
              <PopoverButton></PopoverButton>
              <PopoverPanel anchor="bottom" className="flex flex-col">
                <div>Delete Column</div>
              </PopoverPanel>
            </Popover> */}
          </div>
        ))}
        <div className="text-right w-max flex flex-none  right-0 px-[10px] lg:px-[15px] space-x-[10px] lg:space-x-[15px]">
          <div
            className="lg:px-[5px] flex items-center justify-center rounded-full border border-netral-10 cursor-pointer"
            // onClick={() => handleAddColumnDetails(index)}
          >
            <FaPlus className="text-h5 text-netral-10" />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div>
        {contents.map((content, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-[10px] lg:mb-[15px] w-max flex p-[10px] lg:p-[15px] font-helvetica_regular text-bodySm lg:text-bodyBase bg-netral-10 shadow-md shadow-netral-100/20 border border-primary-50 rounded-[10px] lg:rounded-[15px]"
          >
            {headers.map((header, colIndex) => (
              <div
                key={colIndex}
                className={`${
                  header.position === 'right'
                    ? 'text-right'
                    : header.position === 'center'
                    ? 'text-center'
                    : 'text-left'
                }`}
                style={{ width: header.width > 200 ? header.width : 200 }}
              >
                <input
                  type="text"
                  name={`content-${colIndex}`}
                  id={`content-${colIndex}`}
                  placeholder={lng === 'id' ? 'Konten' : 'Content'}
                  value={content[header.field] || ''}
                  onChange={(e) => {
                    onChangeContent(header.field, colIndex, e.target.value);
                  }}
                  className={`font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-dashed border-secondary-50 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
                />
              </div>
            ))}
            <div className="w-max flex flex-none bg-netral-10 px-[10px] lg:px-[15px] space-x-[10px] lg:space-x-[15px]">
              <div
                className="lg:px-[5px] flex items-center justify-center rounded-full border border-netral-10 cursor-pointer"
                // onClick={() => handleAddColumnDetails(index)}
              >
                <FaPlus className="text-h5 text-netral-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DynamicInput = ({
  name,
  id,
  value,
  placeholder,
  onChange,
  className,
}) => {
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('auto');

  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(Math.max(spanWidth + 5, 200)); // 5px padding, 100px min width
    }
  }, [value]);

  return (
    <div style={{ width: inputWidth, display: 'inline-block' }}>
      {/* Hidden span to measure text width */}
      <span ref={spanRef} className="absolute invisible whitespace-pre px-1">
        {value || placeholder}
      </span>
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, inputWidth)}
        className={`${className} w-full`}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default Table;
