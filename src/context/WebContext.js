'use client';
import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { createContext, useContext, useState } from 'react';

const WebContext = createContext();

const WebContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [searchTopBar, setSearchTopBar] = useState('');
  const [categoryQuery, setCategoryQuery] = useQueryState('category');
  const [categoryTopBar, setCategoryTopBar] = useState('');
  const [sortByQuery, setSortByQuery] = useQueryState('sortBy');
  const [minQuery, setMinQuery] = useQueryState('min');
  const [maxQuery, setMaxQuery] = useQueryState('max');
  const [pageQuery, setPageQuery] = useQueryState('page');
  const [filterQuery, setFilterQuery] = useQueryState('filter');
  const params = useParams();
  const { t } = useTranslation(params.lng, 'translation');
  const [errorToast, setErrorToast] = useState({
    open: false,
    message: '',
  });
  const onErrorMutation = (data) => {
    setLoading(false);
    setErrorToast({
      open: true,
      message: data?.response?.data?.message,
    });
  };

  return (
    <WebContext.Provider
      value={{
        t,
        loading,
        setLoading,
        searchQuery,
        categoryQuery,
        sortByQuery,
        minQuery,
        maxQuery,
        pageQuery,
        filterQuery,
        setSearchQuery,
        setCategoryQuery,
        setSortByQuery,
        setMinQuery,
        setMaxQuery,
        setPageQuery,
        setFilterQuery,
        errorToast,
        setErrorToast,
        onErrorMutation,
        searchTopBar,
        setSearchTopBar,
        categoryTopBar,
        setCategoryTopBar,
      }}
    >
      {children}
    </WebContext.Provider>
  );
};

export const useWebContext = () => useContext(WebContext);
export default WebContextProvider;
