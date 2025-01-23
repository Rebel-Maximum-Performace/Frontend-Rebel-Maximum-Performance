import { useTranslation } from '@/app/i18n';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import ProductContent from './components/ProductContent';

const ProductAdminPage = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'translation');

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')}>
      <ProductContent />
    </LayoutAdmin>
  );
};

export default ProductAdminPage;
