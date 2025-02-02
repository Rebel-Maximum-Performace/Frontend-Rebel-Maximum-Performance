'use client';
import { useWebContext } from '@/context/WebContext';
import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import FormInputBanner from './components/FormInputBanner';
import TableHorizontalList from './components/TableHorizontalList';

const ContentsAdminPageView = () => {
  const { t } = useWebContext();

  return (
    <LayoutAdmin selectedMenu={t(`MENU_ADMIN.Konten`)}>
      <FormInputBanner />
      <TableHorizontalList />
    </LayoutAdmin>
  );
};

export default ContentsAdminPageView;
