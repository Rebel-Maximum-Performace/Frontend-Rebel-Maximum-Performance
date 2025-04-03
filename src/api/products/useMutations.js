import { useMutation } from '@tanstack/react-query';
import {
  serviceAddProduct,
  serviceEditProduct,
  serviceGetAllAttributes,
  serviceGetAllProducts,
  serviceGetAllProductsAdmin,
  serviceGetDetailProduct,
  serviceRemoveProduct,
} from '../endpoints';

export const useGetAllProducts = () =>
  useMutation({ mutationFn: serviceGetAllProducts });

export const useGetAllProductsAdmin = () =>
  useMutation({ mutationFn: serviceGetAllProductsAdmin });

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
