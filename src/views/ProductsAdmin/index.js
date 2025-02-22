import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import ProductContent from './components/ProductContent';
import { useWebContext } from '@/context/WebContext';

const ProductAdminPage = ({ params }) => {
  const { t, contentRef } = useWebContext();

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')} contentRef={contentRef}>
      <ProductContent />
    </LayoutAdmin>
  );
};

export default ProductAdminPage;
