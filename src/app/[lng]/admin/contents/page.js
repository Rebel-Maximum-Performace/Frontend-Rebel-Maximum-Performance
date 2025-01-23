import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';
import ContentsAdminPageView from '@/views/ContentsAdmin';

const ContentsAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <ContentsAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default ContentsAdminPage;
