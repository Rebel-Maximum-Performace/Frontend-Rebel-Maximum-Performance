import { useTranslation } from '@/app/i18n';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import DashboardContent from './components/DashboardContent';

const Dashboard = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'translation');

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Dashboard')}>
      <DashboardContent />
    </LayoutAdmin>
  );
};

export default Dashboard;
