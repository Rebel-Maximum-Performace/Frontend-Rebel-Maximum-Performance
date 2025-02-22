import React from 'react';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import { useTranslation } from '@/app/i18n';
import BackButton from '../ProductDetail/components/BackButton';
import ProductData from '../ProductDetail/components/ProductData';

const ProductDetailAdmin = async ({ params }) => {
  const { lng, slug } = await params;
  const { t } = await useTranslation(lng, 'translation');
  const productName = slug?.split('%3D')[0];
  const idProduct = slug?.split('%3D')[1];

  if (!idProduct) {
    redirect('/admin/products');
  }

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')}>
      <BackButton />
      <ProductData idProduct={idProduct} productName={productName} />
    </LayoutAdmin>
  );
};

export default ProductDetailAdmin;
