import React from 'react';
import ContactUsPageView from '@/pages/ContactUs';
import UserWrapper from '@/pages/Page/components/UserWrapper';

const ContactUsPage = (props) => (
  <UserWrapper>
    <ContactUsPageView {...props} />
  </UserWrapper>
);

export default ContactUsPage;
