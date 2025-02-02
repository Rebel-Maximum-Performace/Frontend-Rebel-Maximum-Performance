'use client';
import React from 'react';
import TopBarUser from './User';
import TopBarAdmin from './Admin';
import PropTypes from 'prop-types';
import useInitTopBar from './hooks/useInitTopBar';

const TopBar = ({ role, selectedMenu }) => {
  const {
    onSearch,
    onClickLogo,
    onChangeCategory,
    categoryTopBar,
    categoryList,
    isLoadingProduct,
    searchTopBar,
    products,
    setLoading,
  } = useInitTopBar({ isAdmin: role === 'Admin' });

  return role === 'User' ? (
    <>
      <TopBarUser
        onSearch={onSearch}
        search={searchTopBar}
        onClickLogo={onClickLogo}
        onChangeCategory={onChangeCategory}
        category={categoryTopBar || null}
        categoryList={categoryList || []}
        isLoadingProduct={isLoadingProduct}
        isFetchingProduct={searchTopBar}
        products={products}
        setLoading={setLoading}
      />
    </>
  ) : role === 'Admin' ? (
    <TopBarAdmin
      onSearch={onSearch}
      onClickLogo={onClickLogo}
      selectedMenu={selectedMenu}
      isLoadingProduct={isLoadingProduct}
      isFetchingProduct={searchTopBar}
      products={products}
      search={searchTopBar}
    />
  ) : null;
};

TopBar.propTypes = {
  role: PropTypes.string,
  selectedMenu: PropTypes.string,
};

TopBar.defaultProps = {
  role: '',
  selectedMenu: '',
};

export default TopBar;
