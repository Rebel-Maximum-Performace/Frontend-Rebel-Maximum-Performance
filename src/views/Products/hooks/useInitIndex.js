'use client';
import { useGetAllProducts } from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { getOrderFilter, getSortFilter } from '@/helpers';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

const useInitIndex = () => {
  const [openPopupFilter, setOpenPopupFilter] = useState(false);
  const {
    t,
    searchQuery,
    setSearchQuery,
    categoryQuery,
    setCategoryQuery,
    minQuery,
    setMinQuery,
    maxQuery,
    setMaxQuery,
    sortByQuery,
    setSortByQuery,
    pageQuery,
    setPageQuery,
    filterQuery,
    setFilterQuery,
    onErrorMutation,
    setLoading,
  } = useWebContext();
  const debounceSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    setSearchQuery(searchQuery || '');
    setCategoryQuery(categoryQuery);
    setMinQuery(minQuery || 0);
    setMaxQuery(maxQuery || 350);
    setSortByQuery(sortByQuery || 'popular');
    setPageQuery(pageQuery || 1);
    setFilterQuery(filterQuery || JSON.stringify([]));
  }, []);

  const {
    data: response,
    isLoading,
    mutate: getAllProducts,
  } = useGetAllProducts();

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClickFilter = () => {
    setOpenPopupFilter(true);
  };

  const onClosePopupFilter = () => {
    setOpenPopupFilter(false);
  };

  const onChangeQueryState = (queryKey, value) => {
    switch (queryKey) {
      case 'search':
        setSearchQuery(value);
        break;
      case 'category':
        setCategoryQuery(value);
        break;
      case 'min':
        setMinQuery(value);
        break;
      case 'max':
        setMaxQuery(value);
        break;
      case 'sortBy':
        setSortByQuery(value);
        break;
      case 'page':
        setPageQuery(value);
        break;
      case 'filter':
        setFilterQuery(value ? JSON.stringify(value) : '');
        break;
      default:
        break;
    }
  };

  const sortByList = [
    { label: t('PRODUCTS.Populer'), value: 'popular' },
    { label: t('PRODUCTS.Terlaris'), value: 'best-seller' },
    { label: t('PRODUCTS.Harga Tertinggi'), value: 'highest-price' },
    { label: t('PRODUCTS.Harga Terendah'), value: 'lowest-price' },
  ];

  useEffect(() => {
    getAllProducts(
      {
        search: debounceSearch || '',
        category: categoryQuery || '',
        min: minQuery || 0,
        max: maxQuery || 350,
        sortBy: getSortFilter(sortByQuery),
        order: getOrderFilter(sortByQuery),
        page: pageQuery || 1,
        filters: filterQuery
          ? JSON.parse(filterQuery).map((item) => ({
              attribute: item.key,
              values: item.values,
            }))
          : [],
      },
      {
        onError: onErrorMutation,
      },
    );
  }, [
    debounceSearch,
    categoryQuery,
    minQuery,
    maxQuery,
    sortByQuery,
    filterQuery,
  ]);

  return {
    t,
    sortByList,
    searchQuery,
    categoryQuery,
    sortByQuery,
    filterQuery,
    minQuery,
    maxQuery,
    products: response?.data?.data,
    isLoading,
    setLoading,
    openPopupFilter,
    onSearch,
    onClickFilter,
    onClosePopupFilter,
    onChangeQueryState,
  };
};

export default useInitIndex;
