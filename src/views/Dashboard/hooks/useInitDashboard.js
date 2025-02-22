'use client';
import { useGetDashboardData } from '@/api/dashboard/useMutations';
import { useWebContext } from '@/context/WebContext';
import { useEffect } from 'react';

const useInitDashboard = () => {
  const { t, onErrorMutation, setLoading } = useWebContext();
  const headersMostPopularProducts = [
    {
      label: 'ID',
      field: 'id',
      position: 'left',
    },
    {
      label: t(`DASHBOARD.Nama`),
      field: 'name',
      position: 'left',
    },
    {
      label: t(`DASHBOARD.Jumlah Pencarian`),
      field: 'search_count',
      position: 'center',
    },
  ];

  // * QUERY
  const { data: response, mutate: getDashboardData } = useGetDashboardData();

  useEffect(() => {
    getDashboardData(null, {
      onError: onErrorMutation,
    });
  }, []);

  return {
    t,
    setLoading,
    dashboardData: response?.data?.data,
    headersMostPopularProducts,
  };
};

export default useInitDashboard;
