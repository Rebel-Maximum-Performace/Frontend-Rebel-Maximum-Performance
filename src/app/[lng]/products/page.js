import React from 'react';
import ProductPageView from '@/pages/Products';
import UserWrapper from '@/pages/Page/components/UserWrapper';

const ProductPage = (props) => (
  <UserWrapper>
    <ProductPageView {...props} />
  </UserWrapper>
);

export default ProductPage;
