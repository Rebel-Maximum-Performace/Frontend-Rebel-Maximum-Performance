import React from 'react';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import FormAddProduct from './components/FormAddProduct';
import { useTranslation } from '@/app/i18n';

const AddProductAdminPage = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'translation');

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')}>
      <FormAddProduct />
    </LayoutAdmin>
  );
};

export default AddProductAdminPage;
