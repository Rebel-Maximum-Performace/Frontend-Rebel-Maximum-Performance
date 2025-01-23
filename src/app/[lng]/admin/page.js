import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';
import DashboardPageView from '@/views/Dashboard';
import React from 'react';
const AdminPage = (props) => (
  <CheckAuthorizationAdmin>
    <DashboardPageView {...props} />
  </CheckAuthorizationAdmin>
);

export default AdminPage;
