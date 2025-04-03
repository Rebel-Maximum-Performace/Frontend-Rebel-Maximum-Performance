'use client';
import { useGetAllCategories } from '@/api/categories/useMutation';
import {
  useGetAllAttributes,
  useGetAllProductsAdmin,
  useRemoveProduct,
} from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { getOrderFilter, getSortFilter } from '@/helpers';
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
    filterQuery,
    setFilterQuery,
    onErrorMutation,
    contentRef,
    setProductId,
    productId,
  } = useWebContext();
  const [search, setSearch] = useState(searchQuery || '');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const sortByList = [
    { label: t('PRODUCTS.Populer'), value: 'popular' },
    { label: t('PRODUCTS.Terlaris'), value: 'best-seller' },
    { label: t('PRODUCTS.Harga Tertinggi'), value: 'highest-price' },
    { label: t('PRODUCTS.Harga Terendah'), value: 'lowest-price' },
  ];

  // * LOCAL STATE
  const [openPopupFilter, setOpenPopupFilter] = useState(false);
  const [isStopScroll, setIsStopScroll] = useState(false);
  const [popupConfirm, setPopupConfirm] = useState({
    isOpen: false,
    type: '',
    message: '',
  });

  // * QUERY
  const { isLoading, mutate: getAllProducts } = useGetAllProductsAdmin();
  const { data: responseCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const { data: responseAttributes, mutate: getAllAttributes } =
    useGetAllAttributes();
  const { mutate: remove } = useRemoveProduct();

  // * FUNCTIONS
  const onSearch = (value) => {
    setSearchQuery(value);
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

  const handleFetchOnScroll = () => {
    getAllProducts(
      {
        search: searchQuery || '',
        category: categoryQuery || '',
        min: minQuery || 0,
        max: maxQuery || 9999,
        sortBy: getSortFilter(sortByQuery),
        order: getOrderFilter(sortByQuery),
        page: page + 1,
        filters:
          JSON.parse(filterQuery)?.map((item) => ({
            attribute: item.key,
            values: item.values,
          })) || [],
      },
      {
        onError: onErrorMutation,
        onSuccess: (data) => {
          if (data?.data?.data?.length > 0) {
            setProducts((prev) => [...prev, ...data?.data?.data]);
            setPage(page + 1);
          } else {
            setIsStopScroll(true);
          }
        },
      },
    );
  };

  const onDetail = (dataProduct) => {
    router.push(
      `/admin/products/${dataProduct.name
        ?.replaceAll('/', '-')
        ?.replaceAll(' ', '-')}=${dataProduct.id}`,
    );
    setLoading(true);
  };

  const onEdit = (dataProduct) => {
    router.push(`/admin/products/edit`);
    setProductId(dataProduct.id);
    setLoading(true);
  };

  const onRemove = (dataProduct) => {
    setProductId(dataProduct.id);
    setPopupConfirm({
      isOpen: true,
      type: 'warning',
      message: t(`COMPONENT.Apa anda yakin ingin menghapus`),
    });
  };

  const handleDeleteProduct = () => {
    remove(
      { id: productId },
      {
        onError: onErrorMutation,
        onSuccess: () => {
          setPopupConfirm({
            isOpen: true,
            type: 'success',
            message: t(`COMPONENT.Berhasil Dihapus`),
          });
        },
      },
    );
  };

  const onClosePopup = () => {
    setPopupConfirm({
      isOpen: false,
      type: '',
      message: '',
    });
    if (popupConfirm.type === 'success') {
      getAllProducts(
        {
          search: searchQuery || '',
          category: categoryQuery || '',
          min: minQuery || 0,
          max: maxQuery || 9999,
          sortBy: getSortFilter(sortByQuery),
          order: getOrderFilter(sortByQuery),
          page: 1,
          filters:
            JSON.parse(filterQuery)?.map((item) => ({
              attribute: item.key,
              values: item.values,
            })) || [],
        },
        {
          onError: onErrorMutation,
          onSuccess: (data) => {
            setProducts(data?.data?.data);
          },
        },
      );
    }
  };

  useEffect(() => {
    setSearchQuery(searchQuery || '');
    setCategoryQuery(categoryQuery);
    setMinQuery(minQuery || 0);
    setMaxQuery(maxQuery || 350);
    setSortByQuery(sortByQuery || 'popular');
    setFilterQuery(filterQuery || JSON.stringify([]));
  }, []);

  useEffect(() => {
    const refSelected = contentRef.current;
    const handleScroll = () => {
      if (
        refSelected?.scrollTop + refSelected?.clientHeight >=
        refSelected?.scrollHeight - 1
      ) {
        if (!isLoading && !isStopScroll) {
          handleFetchOnScroll();
        }
      }
    };
    refSelected?.addEventListener('scroll', handleScroll);
    return () => refSelected?.removeEventListener('scroll', handleScroll);
  }, [isLoading, isStopScroll, page]);

  // * USE EFFECT
  useEffect(() => {
    getAllProducts(
      {
        search: searchQuery || '',
        category: categoryQuery || '',
        min: minQuery || 0,
        max: maxQuery || 9999,
        sortBy: getSortFilter(sortByQuery),
        order: getOrderFilter(sortByQuery),
        page: 1,
        filters:
          JSON.parse(filterQuery)?.map((item) => ({
            attribute: item.key,
            values: item.values,
          })) || [],
      },
      {
        onError: onErrorMutation,
        onSuccess: (data) => {
          setProducts(data?.data?.data);
        },
      },
    );
  }, [
    searchQuery,
    categoryQuery,
    minQuery,
    maxQuery,
    sortByQuery,
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
    products,
    categories: responseCategories?.data?.data,
    attributes: responseAttributes?.data?.data,
    handleAddProduct,
    categoryQuery,
    minQuery,
    maxQuery,
    sortByQuery,
    filterQuery,
    setLoading,
    search,
    setSearch,
    onDetail,
    onEdit,
    onRemove,
    onClosePopup,
    handleDeleteProduct,
    popupConfirm,
  };
};
