import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';
import ProductDetailAdmin from '@/views/ProductDetailAdmin';
import React from 'react';

const ProductDetailsAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <ProductDetailAdmin {...props} />
  </CheckAuthorizationAdmin>
);

export default ProductDetailsAdminPage;
