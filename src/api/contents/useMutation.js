import { useMutation } from 'react-query';
import {
  serviceAddHorizontalList,
  serviceEditHorizontalList,
  serviceGetAllBanners,
  serviceGetAllHorizontalList,
  serviceGetHorizontalListDetail,
  serviceRemoveHorizontalList,
} from '../endpoints';

export const useGetAllBanners = () =>
  useMutation({ mutationFn: serviceGetAllBanners });

export const useGetAllHorizontalList = () =>
  useMutation({
    mutationFn: serviceGetAllHorizontalList,
  });

export const useGetHorizontalListDetail = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceGetHorizontalListDetail,
    refetchOnMount: false,
    onError,
    onSuccess,
  });
};

export const useAddHorizontalList = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceAddHorizontalList,
    onError,
    onSuccess,
  });
};

export const useEditHorizontalList = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceEditHorizontalList,
    onError,
    onSuccess,
  });
};

export const useRemoveHorizontalList = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceRemoveHorizontalList,
    onError,
    onSuccess,
  });
};
