'use client';
import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';
import ProductAdminPageView from '@/views/ProductsAdmin';

const ProductAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <ProductAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default ProductAdminPage;
