import { useMutation } from '@tanstack/react-query';
import { serviceGetDashboardData } from '../endpoints';

export const useGetDashboardData = () =>
  useMutation({ mutationFn: serviceGetDashboardData });
