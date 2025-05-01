'use client';
import React, { useState, useEffect } from 'react';
import { publicAPI } from '@/api/endpoints';
import Loader from '@/components/Loader';
import { useWebContext } from '@/context/WebContext';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { encryptData } from '@/helpers/encryption';
import { IoMdCloseCircle } from 'react-icons/io';
import TextInput from '@/components/Form/TextInput';
import { IoSend } from 'react-icons/io5';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const UserWrapper = ({ children }) => {
  const { mutate } = useMutation({
    mutationFn: () => axios.get(`${publicAPI}/authorizationservice/tokenuser`),
  });
  const [accessToken, setAccessToken] = useState();
  const [csrfToken, setCsrfToken] = useState();
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.emit('user-join');
  }, []);

  if (accessToken && csrfToken) {
    return (
      <>
        <Loader isLoading={loading} />
        {children}
        <div className="w-[30%] h-[70%] bg-netral-10 fixed bottom-8 right-8 rounded-xl border border-netral-80 overflow-hidden">
          <div className="w-full bg-netral-20 p-5 flex justify-between">
            <p>Admin</p>
            <IoMdCloseCircle
              className="text-[18px] lg:text-[24px] cursor-pointer"
              onClick={() => {}}
            />
          </div>
          <div className="w-full h-full overflow-y-scroll">
            <p className="bg-primary-10 py-3 px-5 flex justify-start">Chat 1</p>
            <p className="bg-red-100 py-3 px-5 flex justify-end">Chat 1</p>
          </div>
          <div className="px-5 py-5 absolute bottom-0 w-full flex space-x-4">
            <div className="w-[90%] shadow-2xl rounded-[15px]">
              <TextInput
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="w-[10%] flex justify-center items-center">
              <IoSend className="text-[18px] lg:text-[24px] cursor-pointer text-primary-50" />
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default UserWrapper;
