'use client';
import Button from '@/components/Button';
import TextInput from '@/components/Form/TextInput';
import { useState } from 'react';

const FormContactUs = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    text: '',
  });

  const handleSendMail = () => {};

  return (
    <div className="my-[20px] w-[95%] mx-auto lg:my-[40px] rounded-[10px] lg:rounded-[15px] shadow-lg shadow-netral-40 bg-netral-10 p-[15px] lg:p-[30px] border border-netral-20">
      <h1 className="font-helvetica_bold text-bodyMd lg:text-h3 text-primary-50 text-center">
        Contact Us
      </h1>
      <h3 className="font-helvetica_regular text-bodySm lg:text-h5 text-center my-[10px] lg:my-[15px]">
        Need help? We're Ready to Help!
      </h3>
      <p className="font-helvetica_light text-bodyXs lg:text-bodyBase text-center">
        Our team is ready to answer all your questions regarding the products
        you need. You can contact us via:
      </p>
      <div className="w-full flex justify-between space-x-[15px] my-[10px] lg:my-[15px]">
        <TextInput
          label="FullName"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <TextInput
          label="Email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <TextInput
        label="How Can We Help You?"
        placeholder="Describe Your Problem"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <h1 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-primary-50 my-[10px] lg:my-[15px]">
        Max. 255 Character
      </h1>
      <Button
        color="primary"
        variant="contained"
        onClick={handleSendMail}
        className="justify-center"
      >
        Send Message
      </Button>
    </div>
  );
};

export default FormContactUs;
