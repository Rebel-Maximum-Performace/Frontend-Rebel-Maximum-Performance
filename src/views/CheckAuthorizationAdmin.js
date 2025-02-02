'use client';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import { decryptData } from '@/helpers/encryption';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const CheckAuthorizationAdmin = ({ children }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  const { setLoading, errorToast, loading, setErrorToast } = useWebContext();

  useEffect(() => {
    if (window.localStorage !== undefined) {
      const accessTokenStorage = localStorage.getItem('accessToken');
      const csrfTokenStorage = localStorage.getItem('csrfToken');
      const sssStorage = localStorage.getItem('SSS');
      if (
        !accessTokenStorage ||
        !csrfTokenStorage ||
        (sssStorage && decryptData(sssStorage)?.toString() === 'true')
      ) {
        router.push('/admin/login');
      } else {
        setAccessToken(accessTokenStorage);
        setCsrfToken(csrfTokenStorage);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (errorToast.open) {
      toast.error(errorToast.message || 'Something went wrong', {
        position: 'bottom-center',
        style: {
          width: '600px',
          color: 'red',
        },
        onClose: () => {
          setErrorToast({ open: false, message: '' });
        },
      });
    }
  }, [errorToast]);

  return (
    <>
      <Loader isLoading={loading} />
      {accessToken && csrfToken && <Suspense>{children}</Suspense>}
      <ToastContainer />
    </>
  );
};

export default CheckAuthorizationAdmin;
