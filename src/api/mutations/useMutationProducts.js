'use client';
import { useMutation, useQueryClient } from 'react-query';

const { serviceGetProducts } = require('../endpoints');

const fetchproducts = async (payload) => {
  const { status, data } = await serviceGetProducts(payload);

  if (status === 200) {
    if (payload.search || payload.category) {
      const listCat = [
        {
          id: 1,
          name: 'Harley Davidson',
        },
        {
          id: 2,
          name: 'Sportser Brake',
        },
        {
          id: 3,
          name: 'Vespa Matic',
        },
        {
          id: 4,
          name: 'Yamaha Gear',
        },
      ];
      return data
        .filter((item) =>
          item.categories?.includes(
            listCat?.find((cat) => cat.id == payload.category)?.name,
          ),
        )
        ?.filter(
          (item) =>
            item.name?.toLowerCase().includes(payload.search?.toLowerCase()) ||
            item.category
              ?.toLowerCase()
              .includes(payload.search?.toLowerCase()) ||
            item.id?.toLowerCase().includes(payload.search?.toLowerCase()),
        );
    }
    return [...data];
  } else {
    return [];
  }
};

export const useMutationProducts = () => {
  const queryClient = useQueryClient();

  return useMutation(fetchproducts, {
    onSuccess: (data) => queryClient.setQueryData(['products'], data),
    onError: (error) => console.error('Error fetching products:', error),
  });
};
