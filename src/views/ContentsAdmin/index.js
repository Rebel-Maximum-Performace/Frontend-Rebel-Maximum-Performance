import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import FormInputBanner from './components/FormInputBanner';
import TableHorizontalList from './components/TableHorizontalList';

const ContentsAdminPageView = () => {
  return (
    <LayoutAdmin selectedMenu="Contents">
      <FormInputBanner />
      <TableHorizontalList />
    </LayoutAdmin>
  );
};

export default ContentsAdminPageView;
