import { useMutation } from 'react-query';
import { serviceGetDashboardData } from '../endpoints';

export const useGetDashboardData = () =>
  useMutation({ mutationFn: serviceGetDashboardData });
