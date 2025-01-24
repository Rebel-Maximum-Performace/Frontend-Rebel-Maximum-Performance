'use client';
import LoginAdminPageView from '@/views/LoginAdmin';
import React, { Suspense } from 'react';

const LoginPage = (props) => (
  <Suspense>
    <LoginAdminPageView {...props} />
  </Suspense>
);

export default LoginPage;
