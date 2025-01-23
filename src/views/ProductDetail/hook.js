'use client';
import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TableDetailsData from './components/TableDetailsData';

export const useInitDetailsData = () => {
  const renderContentColumn = (columnData) => {
    const type = columnData.type;
    switch (type) {
      case 'text':
        return (
          <p className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90 text-justify mt-[5px] lg:mt-[10px]">
            {columnData.content}
          </p>
        );
      case 'list':
        return (
          <ul className="font-helvetica_regular text-netral-90  mt-[5px] lg:mt-[10px] list-disc list-inside">
            {columnData.list?.map((item, index) => (
              <li className="text-bodySm lg:text-bodyBase" key={index}>
                {item}
              </li>
            ))}
          </ul>
        );
      case 'label-value':
        return (
          <div className="w-full mt-[10px] lg:mt-[15px]">
            {columnData.data.map((item, index) => (
              <div className="flex w-full mb-[2px] lg:mb-[5px]" key={index}>
                <p className="w-[50%] border-[1.5px] border-r-0 border-netral-90 px-[5px] py-[5px] lg:px-[15px] lg:py-[10px] bg-secondary-20 text-bodySm lg:text-bodyBase font-helvetica_bold">
                  {item.label}
                </p>
                <p className="w-[50%] border-[1.5px] border-netral-90 px-[5px] py-[5px] lg:px-[15px] lg:py-[10px] bg-netral-10 text-bodySm lg:text-bodyBase font-helvetica_regular">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        );
      case 'table':
        return <TableDetailsData data={columnData} />;
      default:
        return <div></div>;
    }
  };

  return {
    renderContentColumn,
  };
};

export const useInitTableDetailsData = ({ data }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    sortBy: 0,
    order: 'asc',
  });
  const [dataFiltered, setDataFiltered] = useState([]);
  const { lng } = useParams();
  const { t } = useTranslation(lng, 'translation');
  const [sortByList, setSortByList] = useState([]);
  const orderList = [
    { label: 'A-Z', value: 'asc' },
    { label: 'Z-A', value: 'desc' },
  ];

  useEffect(() => {
    setSortByList(
      data.headers?.map((header, index) => ({
        label: header.label,
        value: index,
      })),
    );
  }, [data]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeFilter = (filterKey, value) => {
    setFilter({
      ...filter,
      [filterKey]: value,
    });
  };

  return {
    search,
    onSearch,
    dataFiltered,
    t,
    filter,
    onChangeFilter,
    sortByList,
    orderList,
  };
};
