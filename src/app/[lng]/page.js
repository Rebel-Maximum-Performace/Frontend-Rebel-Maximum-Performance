import React from 'react';
import HomePageView from '@/views/Page';
import UserWrapper from '@/views/Page/components/UserWrapper';

const HomePage = ({ params, searchParams }) => (
  <UserWrapper>
    <HomePageView params={params} searchParams={searchParams} />
  </UserWrapper>
);

export default HomePage;
