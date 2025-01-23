import React from 'react';
import ProductPageView from '@/views/Products';
import UserWrapper from '@/views/Page/components/UserWrapper';

const ProductPage = (props) => (
  <UserWrapper>
    <ProductPageView {...props} />
  </UserWrapper>
);

export default ProductPage;
