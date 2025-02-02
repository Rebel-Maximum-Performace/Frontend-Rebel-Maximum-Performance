import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Logo from '@/assets/img/logo rebel.webp';
import PropTypes from 'prop-types';
import TextInput from '../../Form/TextInput';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { IoMdCloseCircle } from 'react-icons/io';
import { motion } from 'framer-motion';
import Button from '../../Button';
import Link from 'next/link';
import { useWebContext } from '@/context/WebContext';
import DropDownLanguage from '../components/DropdownLanguage';
import { useRouter } from 'next/navigation';

const TopBarAdmin = ({
  onSearch,
  onClickLogo,
  selectedMenu,
  isFetchingProduct,
  isLoadingProduct,
  products,
  search,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  const { t, setLoading } = useWebContext();
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const variants = {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
        delay: 0,
      },
    },
  };

  const handleClickMenu = () => {
    setOpenDrawer(!openDrawer);
  };

  const onLogout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('csrfToken');
    router.push('/admin/login');
    setLoading(true);
  }, []);

  return (
    <>
      <div className="px-[10px] lg:px-[50px] w-full flex flex-col lg:flex-row items-center py-[15px] space-y-[15px] lg:space-y-0 lg:space-x-[20px] lg:py-[10px] bg-secondary-50">
        <div className="flex items-center w-full lg:w-max">
          <IoMenu
            className="w-max text-[40px] block lg:hidden text-primary-50 cursor-pointer"
            onClick={handleClickMenu}
          />
          <div className="flex justify-center w-full">
            <Image
              src={Logo}
              alt="Logo Rebel Maximum Performance"
              onClick={onClickLogo}
              className="w-auto h-[40px] lg:h-[63px] cursor-pointer"
              height={63}
            />
          </div>
        </div>
        <div className="relative inline-block text-left w-full">
          <TextInput
            name="search"
            onChange={onSearch}
            value={search}
            iconRight={
              <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
            }
            placeholder={t(`HOMEPAGE.Cari Produk`)}
          />
          {isFetchingProduct && (
            <div className="absolute left-0 mt-0 shadow-md border rounded-[10px] md:rounded-[15px] w-full z-50 overflow-hidden bg-netral-10">
              {isLoadingProduct ? (
                <>
                  <div className="p-[15px] flex space-x-5 animate-pulse">
                    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-secondary-50" />
                    <div className="w-[80%] space-y-[10px]">
                      <div className="w-[100%] h-[30px] bg-secondary-50" />
                      <div className="w-[50%] h-[20px] bg-secondary-50" />
                    </div>
                  </div>
                  <div className="p-[15px] flex space-x-5 animate-pulse">
                    <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-secondary-50" />
                    <div className="w-[80%] space-y-[10px]">
                      <div className="w-[100%] h-[30px] bg-secondary-50" />
                      <div className="w-[50%] h-[20px] bg-secondary-50" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {products?.length > 0 &&
                    products?.map((product, index) => (
                      <Link
                        href={`/products/${product.name
                          ?.replaceAll('/', '-')
                          ?.replaceAll(' ', '-')}=${product.id}`}
                        key={index}
                        onClick={() => setLoading(true)}
                        className="w-full cursor-pointer hover:bg-netral-20 rounded-[10px] lg:rounded-[15px] p-[15px] flex space-x-5"
                      >
                        <div
                          className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${product.images[0]})`,
                          }}
                        />
                        <div className="w-full space-y-[10px]">
                          <div className="w-full space-y-[1px]">
                            <h3 className="font-helvetica_regular text-bodySm lg:text-bodyBase text-netral-90">
                              {product.name}
                            </h3>
                            <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-netral-90">
                              {product.sku}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {(!products || products?.length === 0) && (
                    <h1 className="w-full text-center text-bodySm lg:text-bodyBase py-[10px] font-helvetica_regular text-netral-90">
                      {t(`HOMEPAGE.Produk Tidak Ditemukan`)}
                    </h1>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="relative inline-block text-left w-max">
          <div
            className="bg-netral-10 p-[10px] rounded-full hidden lg:block cursor-pointer"
            onClick={() => setIsOpenProfile(!isOpenProfile)}
          >
            <FaUserAlt className="text-[24px] text-primary-50" />
          </div>
          {isOpenProfile && (
            <div className="absolute left-0 mt-[5px] shadow-md border rounded-[10px] w-[250px] -translate-x-[calc(100%-44px)] z-50 overflow-hidden bg-netral-10">
              <div className="p-[10px]">
                <DropDownLanguage />
              </div>
              <div
                className="p-[10px] lg:p-[15px] cursor-pointer hover:bg-primary-50 text-primary-50 hover:text-netral-10"
                onClick={onLogout}
              >
                <p className="w-full h-full">{t(`LOGIN.Keluar`)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {openDrawer && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          className="fixed top-0 bottom-0 left-0 right-0 bg-netral-10/80 py-[20px] px-[10px] space-y-[15px] z-50"
        >
          <div className="w-full flex justify-end">
            <IoMdCloseCircle
              className="text-primary-50 text-[30px] cursor-pointer"
              onClick={() => setOpenDrawer(false)}
            />
          </div>
          {[
            { label: 'Dashboard', link: '/admin' },
            { label: 'Products', link: '/admin/products' },
            { label: 'Categories', link: '/admin/categories' },
            { label: 'Contents', link: '/admin/contents' },
            { label: 'Histories', link: '/admin/histories' },
          ].map((menu, index) => (
            <Link
              href={menu.link}
              key={index}
              className={`block p-[10px] text-bodySm hover:bg-primary-50 hover:text-netral-10 rounded-[10px] cursor-pointer shadow-lg hover:shadow-primary-50 ${
                selectedMenu === menu.label
                  ? 'bg-primary-50 text-netral-10'
                  : 'bg-secondary-50 text-netral-90'
              }`}
            >
              <h3>{menu.label}</h3>
            </Link>
          ))}
          <Button
            color="third"
            onClick={onLogout}
            variant="contained"
            className="w-[50%] mx-auto text-center flex items-center justify-center"
          >
            {t(`LOGIN.Keluar`)}
          </Button>
        </motion.div>
      )}
    </>
  );
};

TopBarAdmin.propTypes = {
  onSearch: PropTypes.func,
  onClickLogo: PropTypes.func,
  onClickProfile: PropTypes.func,
};

TopBarAdmin.defaultProps = {
  onSearch: () => {},
  onClickLogo: () => {},
  onClickProfile: () => {},
};

export default TopBarAdmin;
