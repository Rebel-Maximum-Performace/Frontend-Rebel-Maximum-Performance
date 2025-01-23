import { useTranslation } from '@/app/i18n';
import CategoriesContent from './components/CategoriesContent';
import LayoutAdmin from './components/LayoutAdmin';

const CategoriesAdminPageView = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'translation');

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Kategori')}>
      <CategoriesContent />
    </LayoutAdmin>
  );
};

export default CategoriesAdminPageView;
