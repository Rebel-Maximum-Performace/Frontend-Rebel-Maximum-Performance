import { useMutation } from '@tanstack/react-query';
import {
  serviceAddBanner,
  serviceAddHorizontalList,
  serviceEditBanner,
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

export const useAddBanner = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceAddBanner,
    onError,
    onSuccess,
  });
};

export const useEditBanner = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: serviceEditBanner,
    onError,
    onSuccess,
  });
};
