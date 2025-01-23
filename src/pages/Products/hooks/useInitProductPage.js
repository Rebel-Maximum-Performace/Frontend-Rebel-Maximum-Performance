import { useGetAllCategories } from '@/api/categories/useMutation';
import { useGetAllBanners } from '@/api/contents/useMutation';
import { useGetAllAttributes } from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { useEffect } from 'react';

const useInitProductPage = () => {
  const { onErrorMutation } = useWebContext();
  const { data: responseGetAllBanners, mutate: getAllBanners } =
    useGetAllBanners();
  const { data: responseGetAllCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const { data: responseGetAllAttributes, mutate: getAllAttributes } =
    useGetAllAttributes();

  useEffect(() => {
    getAllCategories({ search: '' }, { onError: onErrorMutation });
    getAllBanners(null, { onError: onErrorMutation });
    getAllAttributes(null, { onError: onErrorMutation });
  }, []);

  return {
    productBanners: responseGetAllBanners?.data?.data?.productPageBanner,
    categories: responseGetAllCategories?.data?.data,
    attributes: responseGetAllAttributes?.data?.data,
  };
};

export default useInitProductPage;
