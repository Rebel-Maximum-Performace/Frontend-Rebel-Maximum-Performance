'use client';
import { publicAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';
import axios from 'axios';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';

const UserWrapper = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => axios.get(`${publicAPI}/authorizationservice/tokenuser`),
  });
  const accessToken = getLocalStorage('accessToken');
  const csrfToken = getLocalStorage('csrfToken');
  const { setLoading, errorToast, loading, setErrorToast } = useWebContext();

  useEffect(() => {
    if (!accessToken || !csrfToken) {
      mutate('', {
        onSuccess: (data) => {
          const csrfToken = data.headers.get('X-CSRF-Token');
          const accessToken = data.headers.get('Authorization');
          setLocalStorage('csrfToken', csrfToken);
          setLocalStorage('accessToken', accessToken);
          window.location.reload();
        },
      });
    }
    setLoading(false);
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

  if (accessToken && csrfToken) {
    return (
      <>
        <Loader isLoading={loading} />
        {children}
        <ToastContainer />
      </>
    );
  }
};

export default UserWrapper;
