import TextInput from '@/components/Form/TextInput';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useInitTableDetailsData } from '../hook';
import { FiFilter } from 'react-icons/fi';
import Select from '@/components/Form/Select';
import Table from '@/components/Table';

const TableDetailsData = ({ data }) => {
  const {
    search,
    onSearch,
    t,
    filter,
    onChangeFilter,
    sortByList,
    dataFiltered,
    orderList,
  } = useInitTableDetailsData({ data });

  return (
    <div className="w-full">
      <TextInput
        name="search"
        placeholder={`${t('COMPONENT.Cari')}...`}
        onChange={onSearch}
        value={search}
        iconRight={
          <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
        }
        className="w-[90%] mr-[15px] lg:mr-0 mt-[10px] lg:mt-[15px]"
      />
      <div className="flex items-center mt-[10px] lg:mt-[15px] justify-between">
        <div
          className="w-max p-[10px] rounded-full lg:px-[15px] text-netral-10 font-helvetica_regular items-center lg:flex lg:rounded-[15px] bg-primary-50 shadow-lg shadow-primary-50 cursor-pointer"
          // onClick={onClickFilter}
        >
          <FiFilter className="text-[18px] md:text-[24px]" />
          <p className="hidden lg:block ml-[5px]">Filter</p>
        </div>
        <div className="w-full flex items-center space-x-2 justify-end">
          <h3 className="text-bodySm lg:text-bodyBase font-helvetica_regular text-netral-90 ml-[10px]">
            {t('PRODUCTS.Urutkan Berdasarkan')} :
          </h3>
          <div className="w-[49%]">
            <Select
              selected={filter.sortBy}
              options={sortByList}
              placeholder={t('HOMEPAGE.Pilih Kategori')}
              onChange={(value) => onChangeFilter('sortBy', value)}
            />
          </div>
          <div className="w-[21%]">
            <Select
              selected={filter.order}
              options={orderList}
              onChange={(value) => onChangeFilter('order', value)}
            />
          </div>
        </div>
      </div>
      <div className="my-[15px] lg:my-[20px]">
        <Table headers={data.headers} contents={data.contents} />
      </div>
    </div>
  );
};

export default TableDetailsData;
