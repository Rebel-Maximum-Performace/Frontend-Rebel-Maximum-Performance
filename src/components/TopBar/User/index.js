import React from 'react';
import Image from 'next/image';
import Logo from '@/assets/img/logo rebel.webp';
import PropTypes from 'prop-types';
import TextInput from '../../Form/TextInput';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineMailOutline, MdOutlineWhatsapp } from 'react-icons/md';
import Select from '../../Form/Select';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useWebContext } from '@/context/WebContext';

const TopBarUser = ({
  onSearch,
  onClickLogo,
  onChangeCategory,
  categoryList,
  search,
  category,
  isLoadingProduct,
  isFetchingProduct,
  products,
  setLoading,
}) => {
  const { t } = useWebContext();
  const pathname = usePathname();
  const isProductPage =
    pathname.split('/')[pathname.split('/').length - 1] === 'products';

  return (
    <>
      <div className="px-[10px] lg:px-[50px] w-full flex flex-col lg:flex-row items-center py-[15px] space-y-[15px] lg:space-y-0 lg:space-x-[20px] lg:py-[10px] bg-netral-50">
        <Image
          src={Logo}
          alt="Logo Rebel Maximum Performance"
          onClick={onClickLogo}
          className="w-auto h-[40px] lg:h-[63px] cursor-pointer"
          height={63}
        />
        <div className="relative inline-block text-left w-full">
          <TextInput
            name="search"
            placeholder={`${t('HOMEPAGE.Cari Produk')}...`}
            onChange={onSearch}
            value={search}
            iconRight={
              <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
            }
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
        <a
          href={
            process.env.NEXT_PUBLIC_LINK_EMAIL
              ? `mailto:${process.env.NEXT_PUBLIC_LINK_EMAIL}`
              : '#'
          }
          target="_blank"
        >
          <div className="bg-netral-10 p-[5px] rounded-full hidden lg:block cursor-pointer">
            <MdOutlineMailOutline className="text-[24px] md:text-[30px] text-primary-50" />
          </div>
        </a>
        <a href={process.env.NEXT_PUBLIC_LINK_WHATSAPP} target="_blank">
          <div className="bg-netral-10 p-[5px] rounded-full hidden lg:block cursor-pointer">
            <MdOutlineWhatsapp className="text-[24px] md:text-[30px] text-primary-50" />
          </div>
        </a>
      </div>
      {!isProductPage && (
        <div className="px-[10px] lg:px-[50px] w-full flex items-center space-y-[10px] lg:space-y-0 lg:space-x-[20px] py-[20px] bg-secondary-50 flex-wrap">
          <p className="text-bodySm lg:text-h5 font-bold font-helvetica_bold">
            {`${t('HOMEPAGE.Beli Berdasarkan Kategori')} :`}
          </p>
          <div className="w-full flex justify-center lg:flex-1">
            <Select
              selected={category}
              options={categoryList}
              placeholder={t('HOMEPAGE.Pilih Kategori')}
              isSearchable
              onChange={onChangeCategory}
            />
          </div>
        </div>
      )}
    </>
  );
};

TopBarUser.propTypes = {
  onSearch: PropTypes.func,
  onClickLogo: PropTypes.func,
  onChangeCategory: PropTypes.func,
  categoryList: PropTypes.array,
  search: PropTypes.string,
  category: PropTypes.any,
  isLoadingProduct: PropTypes.bool,
  isFetchingProduct: PropTypes.bool,
  products: PropTypes.array,
};

TopBarUser.defaultProps = {
  onSearch: () => {},
  onClickLogo: () => {},
  onChangeCategory: () => {},
  categoryList: [],
  search: '',
  category: null,
  isLoadingProduct: false,
  isFetchingProduct: false,
  products: [],
};

export default TopBarUser;
