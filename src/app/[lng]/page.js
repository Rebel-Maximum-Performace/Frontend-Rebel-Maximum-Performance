import React from 'react';
import HomePageView from '@/views/Page';
import UserWrapper from '@/views/Page/components/UserWrapper';

const HomePage = (props) => (
  <UserWrapper>
    <HomePageView {...props} />
  </UserWrapper>
);

export default HomePage;
