'use client';
import Select from '@/components/Form/Select';
import { FiFilter } from 'react-icons/fi';
import ProductList from './ProductList';
import { FaPlus, FaSearch } from 'react-icons/fa';
import TextInput from '@/components/Form/TextInput';
import Button from '@/components/Button';
import { useInitProductContent } from '../hooks/useInitProductContent';
import ProductFilter from './ProductFilter';

const ProductContent = () => {
  const {
    t,
    openPopupFilter,
    onClosePopupFilter,
    onChangeQueryState,
    sortByList,
    onClickFilter,
    onSearch,
    searchQuery,
    products,
    categories,
    attributes,
    isLoading,
    handleAddProduct,
    categoryQuery,
    minQuery,
    maxQuery,
    sortByQuery,
    filterQuery,
    setLoading,
  } = useInitProductContent();

  return (
    <div>
      <div className="w-full justify-between mb-[10px] items-center hidden lg:flex">
        <div className="w-[calc(20%-15px)]">
          <div
            className="w-full justify-center p-[10px] rounded-full lg:px-[15px] text-netral-10 font-helvetica_regular items-center flex lg:rounded-[15px] bg-primary-50 shadow-lg shadow-primary-50 cursor-pointer"
            onClick={onClickFilter}
          >
            <FiFilter className="text-[18px] md:text-[24px]" />
            <p className="hidden lg:block ml-[5px]">Filter</p>
          </div>
        </div>
        <div className="w-[calc(50%-15px)]">
          <Select
            selected={categoryQuery}
            options={[
              { label: t('PRODUCTS.Semua Kategori'), value: null },
              ...(categories || [])?.map((category) => ({
                label: category.name,
                value: category.name,
              })),
            ]}
            placeholder={t('PRODUCTS.Semua Kategori')}
            isSearchable
            onChange={(value) => onChangeQueryState('category', value)}
          />
        </div>
        <div className="w-[calc(30%-15px)]">
          <Select
            selected={sortByQuery}
            options={sortByList}
            placeholder={t('HOMEPAGE.Pilih Kategori')}
            onChange={(value) => onChangeQueryState('sortBy', value)}
          />
        </div>
      </div>

      <div className="w-full flex justify-between mb-[10px] items-center lg:mt-[20px]">
        <div className="w-[calc(15%-5px)] lg:hidden">
          <div
            className="w-full justify-center p-[10px] rounded-full lg:px-[15px] text-netral-10 font-helvetica_regular items-center flex lg:rounded-[15px] bg-primary-50 shadow-lg shadow-primary-50 cursor-pointer"
            onClick={onClickFilter}
          >
            <FiFilter className="text-[18px] md:text-[24px]" />
            <p className="hidden lg:block ml-[5px]">Filter</p>
          </div>
        </div>
        <div className="w-[calc(70%-5px)] lg:w-[calc(80%-15px)]">
          <TextInput
            name="search"
            placeholder={`${t('COMPONENT.Cari')}...`}
            onChange={onSearch}
            value={searchQuery}
            iconRight={
              <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
            }
            className="w-full"
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          iconLeft={<FaPlus />}
          className="w-[calc(10%-5px)] lg:w-[calc(20%-15px)] justify-center"
          onClick={handleAddProduct}
        >
          <span className="hidden lg:block">{t(`PRODUCTS.Tambah Produk`)}</span>
        </Button>
      </div>

      {/* Popup Filter */}
      <ProductFilter
        open={openPopupFilter}
        onClose={onClosePopupFilter}
        onChangeQueryState={onChangeQueryState}
        t={t}
        attributes={attributes}
        categoryList={[
          { label: t('PRODUCTS.Semua Kategori'), value: null },
          ...(categories || [])?.map((category) => ({
            label: category.name,
            value: category.name,
          })),
        ]}
        sortByList={sortByList}
        sortByQuery={sortByQuery}
        minQuery={minQuery}
        maxQuery={maxQuery}
        categoryQuery={categoryQuery}
        filterQuery={filterQuery ? JSON.parse(filterQuery) : []}
        onApply={() => {}}
      />

      <ProductList
        data={products || []}
        isLoading={isLoading}
        t={t}
        setLoading={setLoading}
      />
    </div>
  );
};

export default ProductContent;
