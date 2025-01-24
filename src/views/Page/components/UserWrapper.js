'use client';
import React, { Suspense, useState } from 'react';
import { publicAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';
import axios from 'axios';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';

const UserWrapper = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => axios.get(`${publicAPI}/authorizationservice/tokenuser`),
  });
  const [accessToken, setAccessToken] = useState();
  const [csrfToken, setCsrfToken] = useState();
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
            const sss = data.headers.get('SSS');
            setLocalStorage('csrfToken', csrfToken);
            setLocalStorage('accessToken', accessToken);
            localStorage.setItem('SSS', sss);
            window.location.reload();
          },
        });
      } else {
        setAccessToken(accessTokenStorage);
        setCsrfToken(csrfTokenStorage);
      }
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
        <Suspense>{children}</Suspense>
        <ToastContainer />
      </>
    );
  }
};

export default UserWrapper;
