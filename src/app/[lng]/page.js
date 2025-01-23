import React from 'react';
import HomePageView from '@/pages/Page';
import UserWrapper from '@/pages/Page/components/UserWrapper';

const HomePage = ({ params, searchParams }) => (
  <UserWrapper>
    <HomePageView params={params} searchParams={searchParams} />
  </UserWrapper>
);

export default HomePage;
