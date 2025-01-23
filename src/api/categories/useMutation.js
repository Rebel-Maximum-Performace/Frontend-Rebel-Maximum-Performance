import { useMutation } from '@tanstack/react-query';
import {
  serviceAddCategory,
  serviceEditCategory,
  serviceGetAllCategories,
  serviceRemoveCategory,
} from '../endpoints';

export const useGetAllCategories = () =>
  useMutation({
    mutationFn: serviceGetAllCategories,
  });

export const useAddCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: serviceAddCategory,
    onSuccess,
    onError,
  });
};

export const useEditCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: serviceEditCategory,
    onSuccess,
    onError,
  });
};

export const useRemoveCategory = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: serviceRemoveCategory,
    onSuccess,
    onError,
  });
};
