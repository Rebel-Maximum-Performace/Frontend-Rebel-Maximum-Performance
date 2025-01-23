import CheckAuthorizationAdmin from '@/pages/CheckAuthorizationAdmin';
import ProductAdminPageView from '@/pages/ProductsAdmin';

const ProductAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <ProductAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default ProductAdminPage;
