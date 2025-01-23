import LayoutAdmin from '../CategoriesAdmin/components/LayoutAdmin';
import BackButton from '../ProductDetail/components/BackButton';
import Details from './components/Details';

const HistoriesAdminDetailView = () => {
  return (
    <LayoutAdmin selectedMenu="Histories">
      <div>
        <BackButton />
        <Details />
      </div>
    </LayoutAdmin>
  );
};

export default HistoriesAdminDetailView;
