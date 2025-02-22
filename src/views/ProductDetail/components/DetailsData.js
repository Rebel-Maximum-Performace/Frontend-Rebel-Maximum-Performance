import React from 'react';
import { useInitDetailsData } from '../hook';

const DetailsData = ({ rows = [], isLoading }) => {
  const { renderContentColumn } = useInitDetailsData();

  return isLoading ? (
    <div className="w-full">
      {[
        { columns: 1, items: [1] },
        { columns: 2, items: [1, 2] },
      ].map((row, indexRow) => (
        <div
          className="w-full lg:justify-between flex flex-col lg:flex-row"
          key={indexRow}
        >
          {row.items.map((_, indexCol) => (
            <div
              key={indexCol}
              className={`${
                row.columns === 1 ? 'lg:w-full' : 'lg:w-[calc(50%-20px)]'
              } w-full`}
            >
              <div className="w-full h-[15px] md:h-[24px] animate-pulse bg-netral-40 mb-[20px] lg:mb-[40px]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full">
      {rows.map((row, indexRow) => (
        <div
          key={indexRow}
          className="w-full lg:justify-between flex flex-col lg:flex-row"
        >
          {row.items.map((item, indexCol) => (
            <div
              key={indexCol}
              className={`${
                row.columns === 1 ? 'lg:w-full' : 'lg:w-[calc(50%-20px)]'
              } w-full mb-[20px] lg:mb-[40px]`}
            >
              <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
                {item.title}
              </h3>
              <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]" />
              {renderContentColumn(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailsData;
