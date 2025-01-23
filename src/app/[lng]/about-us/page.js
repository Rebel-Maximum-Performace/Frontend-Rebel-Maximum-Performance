import React from 'react';
import AboutUsPageView from '@/views/AboutUs';
import UserWrapper from '@/views/Page/components/UserWrapper';

const AboutUsPage = (props) => (
  <UserWrapper>
    <AboutUsPageView {...props} />
  </UserWrapper>
);

export default AboutUsPage;
