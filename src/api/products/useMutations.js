import { useMutation } from '@tanstack/react-query';
import {
  serviceAddProduct,
  serviceEditProduct,
  serviceGetAllAttributes,
  serviceGetAllProducts,
  serviceGetDetailProduct,
  serviceRemoveProduct,
} from '../endpoints';

export const useGetAllProducts = () =>
  useMutation({ mutationFn: serviceGetAllProducts });

export const useGetAllAttributes = () =>
  useMutation({
    mutationFn: serviceGetAllAttributes,
  });

export const useGetDetailProduct = () =>
  useMutation({
    mutationFn: serviceGetDetailProduct,
  });

export const useAddProduct = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceAddProduct,
    onError,
    onSuccess,
  });
};

export const useEditProduct = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceEditProduct,
    onError,
    onSuccess,
  });
};

export const useRemoveProduct = () => {
  return useMutation({
    mutationFn: serviceRemoveProduct,
  });
};
