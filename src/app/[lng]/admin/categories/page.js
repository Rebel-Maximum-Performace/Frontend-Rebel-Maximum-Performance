import CategoriesAdminPageView from '@/pages/CategoriesAdmin';
import CheckAuthorizationAdmin from '@/pages/CheckAuthorizationAdmin';

const CategoriesAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <CategoriesAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default CategoriesAdminPage;
