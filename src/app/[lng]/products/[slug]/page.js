import React from 'react';
import ProductDetailPageView from '@/pages/ProductDetail';
import UserWrapper from '@/pages/Page/components/UserWrapper';

const ProductDetailPage = (props) => (
  <UserWrapper>
    <ProductDetailPageView {...props} />
  </UserWrapper>
);

export default ProductDetailPage;
