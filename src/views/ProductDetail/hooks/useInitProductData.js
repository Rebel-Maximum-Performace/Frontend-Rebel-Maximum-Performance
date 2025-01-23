import { useGetDetailProduct } from '@/api/products/useMutations';
import { useWebContext } from '@/context/WebContext';
import { useEffect, useState } from 'react';

const useInitProductData = ({ id }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { t, onErrorMutation } = useWebContext();

  const {
    isLoading: isLoadingDetail,
    data: responseDetail,
    mutate: getDetail,
  } = useGetDetailProduct();

  const handleClickImage = (index) => {
    setActiveImage(index);
  };

  useEffect(() => {
    getDetail(
      { id },
      {
        onError: onErrorMutation,
      },
    );
  }, [id]);

  return {
    activeImage,
    isLoadingDetail,
    productDetail: responseDetail?.data?.data,
    handleClickImage,
    t,
  };
};

export default useInitProductData;
