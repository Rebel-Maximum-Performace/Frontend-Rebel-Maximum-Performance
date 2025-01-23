import CheckAuthorizationAdmin from '@/pages/CheckAuthorizationAdmin';
import DashboardPageView from '@/pages/Dashboard';
import React from 'react';
const AdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <DashboardPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default AdminPage;
