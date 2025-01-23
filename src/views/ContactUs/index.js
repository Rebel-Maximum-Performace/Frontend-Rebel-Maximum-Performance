import TopBar from '@/components/TopBar';
import React from 'react';
import FormContactUs from './components/FormContactUs';
import Footer from '@/components/Footer';

const ContactUsPageView = () => {
  return (
    <>
      <TopBar role="User" />
      <FormContactUs />
      <Footer role="User" />
    </>
  );
};

export default ContactUsPageView;
