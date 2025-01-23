'use client';
import { useGetAllCategories } from '@/api/categories/useMutation';
import {
  useGetAllAttributes,
  useGetAllProducts,
} from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { getOrderFilter, getSortFilter } from '@/helpers';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useInitProductContent = () => {
  const router = useRouter();
  const {
    t,
    setLoading,
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
  } = useWebContext();
  const debounceSearch = useDebounce(searchQuery, 500);
  const sortByList = [
    { label: t('PRODUCTS.Populer'), value: 'popular' },
    { label: t('PRODUCTS.Terlaris'), value: 'best-seller' },
    { label: t('PRODUCTS.Harga Tertinggi'), value: 'highest-price' },
    { label: t('PRODUCTS.Harga Terendah'), value: 'lowest-price' },
  ];

  // * LOCAL STATE
  const [openPopupFilter, setOpenPopupFilter] = useState(false);
  const [isStopScroll, setIsStopScroll] = useState(false);

  // * QUERY
  const {
    isLoading,
    data: response,
    mutate: getAllProducts,
  } = useGetAllProducts();
  const { data: responseCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const { data: responseAttributes, mutate: getAllAttributes } =
    useGetAllAttributes();

  // * FUNCTIONS
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
  const handleAddProduct = () => {
    router.push('/admin/products/add');
    setLoading(true);
  };

  // * USE EFFECT
  useEffect(() => {
    getAllProducts(
      {
        search: debounceSearch || '',
        category: categoryQuery || '',
        min: minQuery || 0,
        max: maxQuery || 9999,
        sortBy: getSortFilter(sortByQuery),
        order: getOrderFilter(sortByQuery),
        page: pageQuery || 1,
        filters: JSON.parse(filterQuery) || [],
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
    pageQuery,
    filterQuery,
  ]);

  useEffect(() => {
    getAllCategories(
      {
        search: '',
      },
      { onError: onErrorMutation },
    );

    getAllAttributes(null, { onError: onErrorMutation });
  }, []);

  useEffect(() => {
    setSearchQuery(searchQuery || '');
    setCategoryQuery(categoryQuery);
    setMinQuery(minQuery || 0);
    setMaxQuery(maxQuery || 350);
    setSortByQuery(sortByQuery || 'popular');
    setPageQuery(pageQuery || 1);
    setFilterQuery(filterQuery || JSON.stringify([]));
  }, []);

  return {
    t,
    sortByList,
    openPopupFilter,
    searchQuery,
    onSearch,
    onClickFilter,
    onClosePopupFilter,
    onChangeQueryState,
    isLoading,
    products: response?.data?.data,
    categories: responseCategories?.data?.data,
    attributes: responseAttributes?.data?.data,
    handleAddProduct,
    categoryQuery,
    minQuery,
    maxQuery,
    sortByQuery,
    filterQuery,
    setLoading,
  };
};
