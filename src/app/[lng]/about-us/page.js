import React from 'react';
import AboutUsPageView from '@/pages/AboutUs';
import UserWrapper from '@/pages/Page/components/UserWrapper';

const AboutUsPage = (props) => (
  <UserWrapper>
    <AboutUsPageView {...props} />
  </UserWrapper>
);

export default AboutUsPage;
