'use client';
import { publicAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

const UserWrapper = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => axios.get(`${publicAPI}/authorizationservice/tokenuser`),
  });
  const [accessToken, setAccessToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const { setLoading, errorToast, loading, setErrorToast } = useWebContext();

  useEffect(() => {
    if (window.localStorage !== undefined) {
      const accessTokenStorage = getLocalStorage('accessToken');
      const csrfTokenStorage = getLocalStorage('csrfToken');
      if (!accessTokenStorage || !csrfTokenStorage) {
        mutate('', {
          onSuccess: (data) => {
            const csrfToken = data.headers.get('X-CSRF-Token');
            const accessToken = data.headers.get('Authorization');
            setAccessToken(accessToken);
            setCsrfToken(csrfToken);
            setLocalStorage('csrfToken', csrfToken);
            setLocalStorage('accessToken', accessToken);
            window.location.reload();
          },
        });
      } else {
        setAccessToken(accessTokenStorage);
        setCsrfToken(csrfTokenStorage);
      }
    }
    setLoading(false);
  }, [window]);

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
