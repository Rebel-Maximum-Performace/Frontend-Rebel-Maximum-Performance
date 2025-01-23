import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';

const useFormInputBanner = () => {
  const params = useParams();
  const { t } = useTranslation(params.lng, 'translation');

  return { t };
};

export default useFormInputBanner;
