import CategoriesAdminPageView from '@/views/CategoriesAdmin';
import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';

const CategoriesAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <CategoriesAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default CategoriesAdminPage;
