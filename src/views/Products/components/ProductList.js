'use client';
import Select from '@/components/Form/Select';
import TextInput from '@/components/Form/TextInput';
import { formatMoney } from '@/helpers/formatting';
import { Dialog, DialogPanel } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import AttributeCheckboxGroup from './AttributeCheckboxGroup';
import Button from '@/components/Button';
import DropDownPrice from './DropDownPrice';
import { arrayCategoryToString } from '@/helpers';
import useInitIndex from '../hooks/useInitIndex';

const ProductList = ({ categoryList, attributes }) => {
  const {
    t,
    sortByList,
    searchQuery,
    categoryQuery,
    sortByQuery,
    filterQuery,
    minQuery,
    maxQuery,
    products,
    isLoading,
    setLoading,
    openPopupFilter,
    onSearch,
    onClickFilter,
    onClosePopupFilter,
    onChangeQueryState,
  } = useInitIndex();

  return (
    <div className="w-full mt-[15px]">
      <div className="mb-[15px] flex">
        <TextInput
          name="search"
          placeholder={`${t('HOMEPAGE.Cari Produk')}...`}
          onChange={onSearch}
          value={searchQuery}
          iconRight={
            <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
          }
          className="w-[90%] mr-[15px] lg:mr-0"
        />
        <div
          className="p-[10px] rounded-full bg-primary-50 shadow-lg shadow-primary-50 cursor-pointer lg:hidden"
          onClick={onClickFilter}
        >
          <FiFilter className="text-[18px] md:text-[24px] text-netral-10" />
        </div>
      </div>

      <div className="w-full hidden lg:flex justify-between mb-[10px]">
        <div className="w-[calc(30%-15px)]">
          <Select
            selected={sortByQuery}
            options={sortByList}
            placeholder={t('HOMEPAGE.Pilih Kategori')}
            onChange={(value) => onChangeQueryState('sortBy', value)}
          />
        </div>
        <div className="w-[calc(30%-15px)]">
          <DropDownPrice t={t} onChangeQueryState={onChangeQueryState} />
        </div>
        <div className="w-[calc(40%-15px)]">
          <Select
            selected={categoryQuery}
            options={[
              { label: t('PRODUCTS.Semua Kategori'), value: null },
              ...(categoryList || []),
            ]}
            placeholder={t('PRODUCTS.Semua Kategori')}
            isSearchable
            onChange={(value) => onChangeQueryState('category', value)}
          />
        </div>
      </div>

      <div className="w-full flex justify-between">
        {attributes?.length > 0 && (
          <div className="w-[calc(30%-25px)] hidden lg:block">
            <AttributeCheckboxGroup
              attributes={attributes}
              filterQuery={filterQuery ? JSON.parse(filterQuery) : []}
              onChangeQueryState={onChangeQueryState}
              isLarge
            />
          </div>
        )}
        <div
          className={`w-full ${
            attributes?.length > 0 ? 'lg:w-[calc(70%-25px)]' : 'lg:w-full'
          } min-h-screen overflow-scroll`}
        >
          <div className="w-full flex flex-wrap">
            {isLoading ? (
              [1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="w-[calc(50%-10px)] md:w-[calc(100%/4-10px)] mb-[10px] lg:mb-[20px] animate-pulse overflow-hidden border border-netral-20 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col mr-[10px]"
                >
                  <div className="pt-[100%] w-full bg-netral-20" />
                  <div className="w-full p-[5px] mb-[60px] md:mb-[70px]">
                    <div className="animate-pulse">
                      <div className="w-full h-[28px] lg:h-[28px] bg-netral-20" />
                      <div className="w-full h-[29px] mt-[10px] lg:h-[38px] bg-netral-20" />
                    </div>
                  </div>
                </div>
              ))
            ) : products?.length > 0 ? (
              products.map((product, index) => (
                <Link
                  href={`/products/${product.name
                    ?.replaceAll('/', '-')
                    ?.replaceAll(' ', '-')}=${product.id}`}
                  key={index}
                  onClick={() => setLoading(true)}
                  className={`w-[calc(50%-10px)] ${
                    attributes?.length > 0
                      ? 'md:w-[calc(100%/3-10px)]'
                      : 'md:w-[calc(100%/4-10px)]'
                  } mb-[10px] lg:mb-[20px] overflow-hidden border border-netral-20 hover:border-primary-50 hover:shadow-xl cursor-pointer hover:shadow-primary-50/25 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col mr-[10px]`}
                >
                  <div
                    className="pt-[100%] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="w-full p-[5px] lg:p-[10px]">
                    <div className="w-full space-y-[1px]">
                      <h3 className="font-helvetica_regular h-[39px] lg:h-[48px] text-bodySm lg:text-bodyBase text-netral-90 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                        {product.name}
                      </h3>
                      <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-netral-90">
                        {product.sku}
                      </h4>
                      <h4 className="font-helvetica_regular h-[30px] lg:h-[42px] text-bodyXs lg:text-bodyMd text-secondary-80 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                        {arrayCategoryToString(product.categories)}
                      </h4>
                    </div>
                    <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-primary-50 mt-[10px]">
                      {formatMoney(product.price, '$')}
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full text-center text-bodySm lg:text-h4 font-helvetica_regular text-netral-90">
                {t(`HOMEPAGE.Produk Tidak Ditemukan`)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={openPopupFilter}
        onClose={onClosePopupFilter}
        as="div"
        className="relative z-50 focus:outline-none"
      >
        <div className="fixed inset-0 flex w-full items-center justify-center px-[10px] lg:px-[50px]">
          <DialogPanel className="bg-white rounded-[10px] lg:rounded-[15px] shadow-lg w-full p-[15px] overflow-scroll max-h-screen">
            <div className="w-full mb-[15px] lg:mb-[20px]">
              <h3 className="text-bodySm lg:text-bodyBase font-helvetica_regular text-netral-90">
                {t('PRODUCTS.Urutkan Berdasarkan')} :
              </h3>
              <Select
                selected={sortByQuery}
                options={sortByList}
                placeholder={t('HOMEPAGE.Pilih Kategori')}
                onChange={(value) => onChangeQueryState('sortBy', value)}
              />
            </div>
            <div className="w-full mb-[15px] lg:mb-[20px]">
              <h3 className="text-bodySm lg:text-bodyBase font-helvetica_regular text-netral-90">
                {t('PRODUCTS.Harga')} :
              </h3>
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
            <div className="w-full mb-[15px] lg:mb-[20px]">
              <h3 className="text-bodySm lg:text-bodyBase font-helvetica_regular text-netral-90">
                Filter :
              </h3>
              <div className="w-full mb-[5px] lg:mb-[10px]">
                <Select
                  selected={categoryQuery}
                  options={[
                    { label: t('PRODUCTS.Semua Kategori'), value: null },
                    ...(categoryList || []),
                  ]}
                  placeholder={t('PRODUCTS.Semua Kategori')}
                  isSearchable
                  onChange={(value) => onChangeQueryState('category', value)}
                />
              </div>
              <AttributeCheckboxGroup
                attributes={attributes}
                filterQuery={filterQuery ? JSON.parse(filterQuery) : []}
                onChangeQueryState={onChangeQueryState}
              />
              <div className="w-full flex justify-between mt-[15px]">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={onClosePopupFilter}
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
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductList;
