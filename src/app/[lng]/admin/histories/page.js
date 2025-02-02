'use client';
import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';
import HistoriesAdminPageView from '@/views/HistoriesAdmin';

const HistoriesAdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <HistoriesAdminPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default HistoriesAdminPage;
