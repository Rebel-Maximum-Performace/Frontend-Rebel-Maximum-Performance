import React from 'react';
import ContactUsPageView from '@/views/ContactUs';
import UserWrapper from '@/views/Page/components/UserWrapper';

const ContactUsPage = (props) => (
  <UserWrapper>
    <ContactUsPageView {...props} />
  </UserWrapper>
);

export default ContactUsPage;
