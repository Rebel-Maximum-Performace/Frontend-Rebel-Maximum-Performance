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
      width: '30%',
    },
    {
      label: t(`DASHBOARD.Nama`),
      field: 'name',
      position: 'left',
      width: '50%',
    },
    {
      label: t(`DASHBOARD.Jumlah Pencarian`),
      field: 'search_count',
      position: 'center',
      width: '20%',
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
