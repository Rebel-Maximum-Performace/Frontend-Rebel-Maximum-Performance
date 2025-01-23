import CheckAuthorizationAdmin from '@/pages/CheckAuthorizationAdmin';
import ContentsAdminPageView from '@/pages/ContentsAdmin';

const ContentsAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <ContentsAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default ContentsAdminPage;
