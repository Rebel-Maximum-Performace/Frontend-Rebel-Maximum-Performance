import Button from '@/components/Button';
import Select from '@/components/Form/Select';
import TextInput from '@/components/Form/TextInput';
import Popup from '@/components/Popup';
import AttributeCheckboxGroup from '@/views/Products/components/AttributeCheckboxGroup';
import { useEffect, useState } from 'react';
import { MdOutlineAttachMoney } from 'react-icons/md';

const ProductFilter = ({
  open,
  onClose,
  onChangeQueryState,
  t,
  attributes,
  categoryList,
  sortByList,
  sortByQuery,
  minQuery,
  maxQuery,
  categoryQuery,
  filterQuery,
}) => {
  const [dataFilter, setDataFilter] = useState({
    sortBy: sortByQuery,
    category: categoryQuery,
    min: minQuery,
    max: maxQuery,
    filter: filterQuery,
  });

  useEffect(() => {
    setDataFilter({
      sortBy: sortByQuery,
      category: categoryQuery,
      min: minQuery,
      max: maxQuery,
      filter: filterQuery,
    });
  }, [sortByQuery, categoryQuery, minQuery, maxQuery, filterQuery]);

  const onApply = () => {
    onChangeQueryState('sortBy', dataFilter.sortBy);
    onChangeQueryState('category', dataFilter.category);
    onChangeQueryState('min', dataFilter.min);
    onChangeQueryState('max', dataFilter.max);
    onChangeQueryState('filter', dataFilter.filter);
    onClose();
  };

  return (
    <>
      <Popup open={open} onClose={onClose} className="w-[100%]">
        <div className="w-full mb-[15px] lg:mb-[20px] lg:hidden">
          <h3 className="text-bodySm lg:text-bodyBase font-helvetica_regular text-netral-90">
            {t('PRODUCTS.Urutkan Berdasarkan')} :
          </h3>
          <Select
            selected={dataFilter.sortBy}
            options={sortByList}
            placeholder={t('HOMEPAGE.Pilih Kategori')}
            onChange={(value) =>
              setDataFilter({ ...dataFilter, sortBy: value })
            }
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
                onChange={(e) =>
                  setDataFilter({ ...dataFilter, min: e.target.value })
                }
                value={dataFilter.min}
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
                onChange={(e) =>
                  setDataFilter({ ...dataFilter, max: e.target.value })
                }
                value={dataFilter.max}
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
          <div className="w-full mb-[5px] lg:mb-[10px] lg:hidden">
            <Select
              selected={dataFilter.category}
              options={categoryList}
              placeholder={t('PRODUCTS.Semua Kategori')}
              isSearchable
              onChange={(value) =>
                setDataFilter({ ...dataFilter, category: value })
              }
            />
          </div>
          <AttributeCheckboxGroup
            attributes={attributes}
            filterQuery={dataFilter.filter}
            onChangeQueryState={(key, value) =>
              key === 'filter'
                ? setDataFilter({ ...dataFilter, filter: value })
                : () => {}
            }
          />
          <div className="w-full flex justify-between mt-[30px]">
            <Button
              color="primary"
              variant="outlined"
              onClick={onClose}
              className="w-[calc(50%-5px)] justify-center"
            >
              {t('COMPONENT.Batal')}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={onApply}
              className="w-[calc(50%-5px)] justify-center"
            >
              {t('COMPONENT.Terapkan')}
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ProductFilter;
