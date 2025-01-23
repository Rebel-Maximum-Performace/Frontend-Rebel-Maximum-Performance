import React from 'react';
import ProductDetailPageView from '@/views/ProductDetail';
import UserWrapper from '@/views/Page/components/UserWrapper';

const ProductDetailPage = (props) => (
  <UserWrapper>
    <ProductDetailPageView {...props} />
  </UserWrapper>
);

export default ProductDetailPage;
