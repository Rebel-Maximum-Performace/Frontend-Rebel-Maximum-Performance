import TextInput from '@/components/Form/TextInput';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import useInitTableDetailsInput from '../hooks/useInitTableDetailsInput';
import { FiFilter } from 'react-icons/fi';
import Select from '@/components/Form/Select';
import Table from './TableDetailsInput';
import Popup from '@/components/Popup';
import AttributeCheckboxGroup from '@/pages/Products/components/AttributeCheckboxGroup';
import Button from '@/components/Button';

const TableDetails = ({ data, onChangeHeader, onChangeContent }) => {
  const {
    search,
    onSearch,
    t,
    filter,
    onChangeFilter,
    sortByList,
    dataFiltered,
    orderList,
    lng,
    listFilter,
    onChangeListFilter,
    popupFilter,
    setPopupFilter,
  } = useInitTableDetailsInput({ data });

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
          onClick={
            listFilter.length > 0 ? () => setPopupFilter(true) : () => {}
          }
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
        <Table
          headers={data.headers}
          contents={data.contents}
          onChangeHeader={onChangeHeader}
          onChangeContent={onChangeContent}
        />
      </div>

      <Popup
        open={popupFilter}
        onClose={() => setPopupFilter(false)}
        width="481px"
        className="h-[70%]"
      >
        <h4 className="font-helvetica_regular text-bodyBase lg:text-h4 text-primary-50 text-center mb-[15px] lg:mb-[20px]">
          Filter
        </h4>
        <AttributeCheckboxGroup
          attributes={listFilter}
          filter={{ attributes: filter.filters }}
          onChangeFilter={onChangeListFilter}
        />
        <div className="w-full flex justify-between mt-[15px]">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setPopupFilter(false)}
            className="w-[calc(50%-5px)] justify-center"
          >
            {t('COMPONENT.Batal')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {}}
            className="w-[calc(50%-5px)] justify-center"
          >
            {t('COMPONENT.Terapkan')}
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default TableDetails;
