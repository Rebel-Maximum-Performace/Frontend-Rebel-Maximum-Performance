'use client';
import { serviceLogin } from '@/api/endpoints';
import Button from '@/components/Button';
import TextInput from '@/components/Form/TextInput';
import Loader from '@/components/Loader';
import DropDownLanguage from '@/components/TopBar/components/DropdownLanguage';
import { useWebContext } from '@/context/WebContext';
import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const LoginAdminPage = () => {
  const csrfToken = getLocalStorage('csrfToken');
  const accessToken = getLocalStorage('accessToken');
  const router = useRouter();
  const { t, loading, setLoading } = useWebContext();
  const [dataForm, setDataForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const {
    isError,
    mutate: login,
    reset,
  } = useMutation({
    mutationFn: serviceLogin,
    onError: (data) => {
      setError(
        data.response.data.message === 'Invalid username or password'
          ? t('LOGIN.Nama Pengguna atau Kata Sandi Salah')
          : data.response.data.message || data.message,
      );
      setLoading(false);
    },
    onSuccess: (data) => {
      const csrfToken = data.headers.get('X-CSRF-Token');
      const accessToken = data.headers.get('Authorization');
      setLocalStorage('csrfToken', csrfToken);
      setLocalStorage('accessToken', accessToken);
      window.location.reload();
    },
  });

  const handleLogin = async () => {
    login(dataForm);
    setLoading(true);
  };

  useEffect(() => {
    if (csrfToken && accessToken) {
      router.push('/admin');
    }
    setLoading(false);
  }, [getLocalStorage('csrfToken'), getLocalStorage('accessToken')]);

  if (!csrfToken || !accessToken) {
    return (
      <div className="w-full h-screen flex justify-center items-center px-[10px] md:px-[15%] lg:px-[25%]">
        <Loader isLoading={loading} />
        <div className="absolute top-[20px] right-[20px]">
          <DropDownLanguage />
        </div>
        <div className="rounded-[10px] lg:rounded-[15px] border border-netral-40 w-full p-[10px] lg:p-[30px]">
          <h1 className="text-bodyMdlg:text-display text-primary-50 text-center font-helvetica_bold mb-[20px] lg:mb-[30px]">
            {t(`LOGIN.Masuk Admin`)}
          </h1>
          <TextInput
            label={t(`LOGIN.Nama Pengguna`)}
            placeholder={t(`LOGIN.Masukkan Nama Pengguna`)}
            value={dataForm.username}
            onChange={(e) => {
              setDataForm({ ...dataForm, username: e.target.value });
              reset();
              setError('');
            }}
            isRequired
            isError={isError}
            helperText={error}
          />
          <TextInput
            label={t(`LOGIN.Kata Sandi`)}
            placeholder={t(`LOGIN.Masukkan Kata Sandi`)}
            value={dataForm.password}
            onChange={(e) => {
              setDataForm({ ...dataForm, password: e.target.value });
              reset();
              setError('');
            }}
            className="mt-[15px] lg:mt-[25px]"
            isRequired
            isError={isError}
            helperText={error}
          />
          <Button
            color="primary"
            variant="contained"
            className="mt-[15px] lg:mt-[25px] justify-center w-full"
            onClick={handleLogin}
          >
            {t(`LOGIN.Masuk`)}
          </Button>
        </div>
      </div>
    );
  }
};

export default LoginAdminPage;
