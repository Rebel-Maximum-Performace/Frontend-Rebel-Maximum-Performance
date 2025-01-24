import { useTranslation } from '@/app/i18n';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import DashboardContent from './components/DashboardContent';
import { useWebContext } from '@/context/WebContext';

const Dashboard = ({ params }) => {
  const { t } = useWebContext();

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Dashboard')}>
      <DashboardContent />
    </LayoutAdmin>
  );
};

export default Dashboard;
