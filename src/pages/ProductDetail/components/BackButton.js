'use client';
import Button from '@/components/Button';
import { useWebContext } from '@/context/WebContext';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

const BackButton = () => {
  const { t, setLoading } = useWebContext();
  const router = useRouter();

  const handleBack = () => {
    router.back();
    setLoading(true);
  };

  return (
    <Button
      color="third"
      variant="contained"
      onClick={handleBack}
      className="w-max"
      iconLeft={<IoMdArrowRoundBack className="text-[18px] lg:text-[24px]" />}
    >
      {t('COMPONENT.Kembali')}
    </Button>
  );
};

export default BackButton;
