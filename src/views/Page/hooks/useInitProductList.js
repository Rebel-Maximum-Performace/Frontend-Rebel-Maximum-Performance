import { useGetAllProducts } from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { useEffect } from 'react';

const useInitProductList = () => {
  const { t, onErrorMutation } = useWebContext();
  const {
    data: response,
    isLoading,
    mutate: getAllProducts,
  } = useGetAllProducts();

  useEffect(() => {
    getAllProducts(
      {
        search: '',
        category: '',
        min: 0,
        max: 9999,
        sortBy: 'Best Seller',
        order: 'ASC',
        page: 1,
        filters: [],
      },
      {
        onError: onErrorMutation,
      },
    );
  }, []);

  return {
    t,
    products: response?.data?.data,
    isLoading,
  };
};

export default useInitProductList;
