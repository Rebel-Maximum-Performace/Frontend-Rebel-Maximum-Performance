import { useGetAllCategories } from '@/api/categories/useMutation';
import { useGetAllProducts } from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useInitTopBar = () => {
  // * VARIABLE & CONTEXT
  const {
    setLoading,
    searchTopBar,
    setSearchTopBar,
    categoryTopBar,
    setCategoryQuery,
    onErrorMutation,
  } = useWebContext();
  const debounceSearch = useDebounce(searchTopBar, 500);
  const router = useRouter();

  // * QUERY
  const { data: responseCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const {
    data: responseProducts,
    isLoading: isLoadingProduct,
    mutate: getAllProducts,
  } = useGetAllProducts();

  // * FUNCTIONS
  const onSearch = (e) => {
    setSearchTopBar(e.target.value);
  };
  const onClickLogo = () => {
    router.push('/');
    setLoading(true);
  };
  const onChangeCategory = async (value) => {
    await setCategoryQuery(value);
    router.push(`/products`);
    setLoading(true);
  };

  // * USE EFFECT
  useEffect(() => {
    if (!responseCategories) {
      getAllCategories(
        {
          search: '',
        },
        {
          onError: onErrorMutation,
        },
      );
      setCategoryQuery(null);
    }

    if (debounceSearch || categoryTopBar) {
      getAllProducts(
        {
          search: debounceSearch ?? '',
          category: '',
          min: 0,
          max: 99999999,
          sortBy: 'Popular',
          order: 'ASC',
          page: 1,
          filters: [],
        },
        {
          onError: onErrorMutation,
        },
      );
    }
  }, [debounceSearch]);

  return {
    onSearch,
    onClickLogo,
    onChangeCategory,
    categoryTopBar,
    categoryList: responseCategories?.data?.data?.map((category) => ({
      label: category.name,
      value: category.name,
    })),
    isLoadingProduct,
    searchTopBar,
    products: responseProducts?.data?.data,
    setLoading,
  };
};

export default useInitTopBar;
