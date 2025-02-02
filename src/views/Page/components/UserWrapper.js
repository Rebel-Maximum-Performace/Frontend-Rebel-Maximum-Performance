'use client';
import React, { useState, useEffect } from 'react';
import { publicAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { encryptData } from '@/helpers/encryption';

const UserWrapper = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => axios.get(`${publicAPI}/authorizationservice/tokenuser`),
  });
  const [accessToken, setAccessToken] = useState();
  const [csrfToken, setCsrfToken] = useState();
  const { setLoading, errorToast, loading, setErrorToast } = useWebContext();

  useEffect(() => {
    const accessTokenStorage = localStorage.getItem('accessToken');
    const csrfTokenStorage = localStorage.getItem('csrfToken');
    if (!accessTokenStorage || !csrfTokenStorage) {
      mutate('', {
        onSuccess: (data) => {
          const csrfTokenResp = data.headers.get('X-CSRF-Token');
          const accessTokenResp = data.headers.get('Authorization');
          const sss = data.headers.get('SSS');
          localStorage.setItem('csrfToken', encryptData(csrfTokenResp));
          localStorage.setItem('accessToken', encryptData(accessTokenResp));
          localStorage.setItem('SSS', encryptData(sss));
          window.location.reload();
        },
      });
    } else {
      setAccessToken(accessTokenStorage);
      setCsrfToken(csrfTokenStorage);
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
