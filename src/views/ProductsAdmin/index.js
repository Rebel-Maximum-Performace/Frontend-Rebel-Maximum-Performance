import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import ProductContent from './components/ProductContent';
import { useWebContext } from '@/context/WebContext';

const ProductAdminPage = ({ params }) => {
  const { t } = useWebContext();

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')}>
      <ProductContent />
    </LayoutAdmin>
  );
};

export default ProductAdminPage;
