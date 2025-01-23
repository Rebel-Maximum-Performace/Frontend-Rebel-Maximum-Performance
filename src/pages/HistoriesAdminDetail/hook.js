'use client';
// import { useDetailHistoriesAdmin } from '@/api/queries/useDetailHistoriesAdmin';
import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';
import Categopry from './components/DetailRenders/Category';

export const useInitDetails = () => {
  const params = useParams();
  const { t } = useTranslation(params.lng, 'translation');
  // const { data, isLoading } = useDetailHistoriesAdmin(params.id);

  const renderDetails = (dataHistory, feature) => {
    switch (feature) {
      case 'Category':
        return <Categopry data={dataHistory} />;
      default:
        return (
          <div className="animate-spin w-[40px] h-[40px] border-4 border-b-secondary-20 border-l-secondary-20 border-primary-50 rounded-full" />
        );
    }
  };

  return {
    t,
    detailHistories: [],
    isLoading: false,
    renderDetails,
  };
};
