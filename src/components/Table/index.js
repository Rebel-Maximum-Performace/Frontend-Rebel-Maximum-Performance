import React from 'react';
import { RiFileWarningFill } from 'react-icons/ri';

const Table = ({
  headers = [],
  contents = [],
  actions = [],
  onClickAction,
  isLoading = false,
}) => {
  return (
    <div className="relative w-full overflow-x-auto scroll-custom">
      {/* Table Header */}
      <div className="mb-[10px] lg:mb-[15px] min-w-max flex items-center bg-primary-50 text-netral-10 shadow-md shadow-netral-100/20 rounded-[10px] lg:rounded-[15px] sticky top-0 z-10 px-[10px] py-[5px] lg:p-[15px] font-helvetica_bold text-bodySm lg:text-bodyBase">
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
            style={{ width: header.width || '3.9cm' }}
          >
            <span>{header.label}</span>
          </div>
        ))}
        <div className="text-right w-max opacity-0 flex flex-none sticky right-0 bg-netral-10 px-[10px] lg:px-[15px] space-x-[10px] lg:space-x-[15px]">
          {actions.map((action, actionIndex) => (
            <div key={actionIndex} className="">
              {action.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div>
        {contents?.map((content, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-[10px] lg:mb-[15px] min-w-max flex p-[10px] lg:p-[15px] font-helvetica_regular text-bodySm lg:text-bodyBase bg-netral-10 shadow-md shadow-netral-100/20 border border-primary-50 rounded-[10px] lg:rounded-[15px]"
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
                } ${
                  header.isHiddenCollapse
                    ? 'text-ellipsis overflow-x-hidden text-nowrap'
                    : ''
                }`}
                style={{ width: header.width || '3.9cm' }}
              >
                {content[header.field]}
              </div>
            ))}
            <div className="w-max flex flex-none sticky right-0 bg-netral-10 px-[10px] lg:px-[15px] space-x-[10px] lg:space-x-[15px]">
              {actions.map((action, actionIndex) => (
                <div
                  key={actionIndex}
                  onClick={() => onClickAction(action.name, content)}
                >
                  {action.label}
                </div>
              ))}
            </div>
          </div>
        ))}
        {isLoading ? (
          <div className="w-full flex flex-col justify-center items-center p-[15px] lg:p-[20px]">
            <div className="animate-spin w-[40px] h-[40px] border-4 border-b-secondary-20 border-l-secondary-20 border-primary-50 rounded-full" />
          </div>
        ) : (
          contents?.length === 0 && (
            <div className="w-full flex flex-col justify-center items-center p-[15px] lg:p-[20px]">
              <RiFileWarningFill className="text-[20px] md:text-[35px] lg:text-[100px] text-primary-50" />
              <h3 className="font-helvetica_regular text-bodySm md:text-bodyBase text-netral-90 mt-[15px] lg:mt-[20px]">
                No Data Found
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Table;
