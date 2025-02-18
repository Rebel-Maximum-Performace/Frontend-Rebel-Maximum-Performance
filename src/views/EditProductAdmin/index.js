import React from 'react';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import FormEditProduct from './components/FormEditProduct';
import { useTranslation } from '@/app/i18n';

const EditProductAdminPage = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'translation');

  return (
    <LayoutAdmin selectedMenu={t('MENU_ADMIN.Produk')}>
      <FormEditProduct />
    </LayoutAdmin>
  );
};

export default EditProductAdminPage;
