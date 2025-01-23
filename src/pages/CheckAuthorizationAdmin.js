'use client';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import { getLocalStorage } from '@/helpers/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const CheckAuthorizationAdmin = ({ children }) => {
  const router = useRouter();
  const csrfToken = getLocalStorage('csrfToken');
  const accessToken = getLocalStorage('accessToken');
  const { setLoading, errorToast, loading, setErrorToast } = useWebContext();

  useEffect(() => {
    if (!csrfToken || !accessToken) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router, localStorage]);

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
      {accessToken && csrfToken && children}
      <ToastContainer />
    </>
  );
};

export default CheckAuthorizationAdmin;
