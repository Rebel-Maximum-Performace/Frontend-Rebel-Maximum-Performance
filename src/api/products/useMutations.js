import { useMutation } from 'react-query';
import {
  serviceAddProduct,
  serviceGetAllAttributes,
  serviceGetAllProducts,
  serviceGetDetailProduct,
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
