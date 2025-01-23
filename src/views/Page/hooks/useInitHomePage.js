import {
  useGetAllBanners,
  useGetAllHorizontalList,
} from '@/api/contents/useMutation';
import { useWebContext } from '@/context/WebContext';
import { useEffect } from 'react';

const useInitHomePage = () => {
  const { t, setLoading, onErrorMutation } = useWebContext();

  const { data: response, mutate: getAllBanners } = useGetAllBanners();
  const { data: responseHorizontalList, mutate: getAllHorizontalList } =
    useGetAllHorizontalList();

  useEffect(() => {
    getAllHorizontalList(null, {
      onError: onErrorMutation,
    });
    getAllBanners(null, {
      onError: onErrorMutation,
    });
  }, []);

  return {
    t,
    mainBanners: response?.data?.data?.mainBanner,
    promotionBanner: response?.data?.data?.promotionBanner,
    horizontalLists: responseHorizontalList?.data?.data,
    setLoading,
  };
};

export default useInitHomePage;
