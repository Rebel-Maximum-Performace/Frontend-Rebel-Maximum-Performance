'use client';
import { FaBox, FaImage, FaEye } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';
import useInitStepUp from '../hooks/useInitStepUp';
import { useWebContext } from '@/context/WebContext';

const StepSetUp = () => {
  const { doneStep, onClickStep, setLoading } = useInitStepUp();
  const { t } = useWebContext();

  return !doneStep.categories ||
    !doneStep.products ||
    !doneStep.contents ||
    !doneStep.horizontalList ? (
    <>
      <h3 className="font-helvetica_regular text-h5 lg:text-h2 text-primary-50 mb-[10px] lg:mb-[20px]">
        {t(`DASHBOARD.Siapkan Dasbor Anda Sekarang`)} !!!
      </h3>
      <div className="flex flex-col space-y-[20px] lg:space-y-[30px]">
        <div
          className={`flex items-start space-x-[10px] ${
            doneStep.categories ? 'text-primary-50' : 'text-netral-50'
          }`}
        >
          <div className="flex-shrink-0 text-[28px] lg:text-[30px]">
            <BiCategory />
          </div>
          <p className="text-bodyMd lg:text-bodyBase font-helvetica_regular">
            {t(`DASHBOARD.Pertama, `)}
            <Link
              href="/admin/categories"
              className="text-primary-50 font-helvetica_bold cursor-pointer"
              onClick={() => {
                onClickStep('categories');
                setLoading(true);
              }}
            >
              {t(`DASHBOARD.tambahkan kategori`)}
            </Link>{' '}
            {t(`DASHBOARD.untuk produk Anda!`)}
          </p>
        </div>
        <div
          className={`flex items-start space-x-[10px] ${
            doneStep.products ? 'text-primary-50' : 'text-netral-50'
          }`}
        >
          <div className="flex-shrink-0 text-[28px] lg:text-[30px]">
            <FaBox />
          </div>
          <p className="text-bodyMd lg:text-bodyBase font-helvetica_regular">
            {t(`DASHBOARD.Selanjutnya, `)}
            <Link
              href="/admin/products"
              className="text-primary-50 font-helvetica_bold cursor-pointer"
              onClick={() => {
                onClickStep('products');
                setLoading(true);
              }}
            >
              {t(`DASHBOARD.tambahkan beberapa produk!`)}
            </Link>
          </p>
        </div>
        <div
          className={`flex items-start space-x-[10px] ${
            doneStep.contents ? 'text-primary-50' : 'text-netral-50'
          }`}
        >
          <div className="flex-shrink-0 text-[28px] lg:text-[30px]">
            <FaImage />
          </div>
          <p className="text-bodyMd lg:text-bodyBase font-helvetica_regular">
            {t(`DASHBOARD.Pilih banner beranda Anda, `)}
            <Link
              href="/admin/contents"
              className="text-primary-50 font-helvetica_bold cursor-pointer"
              onClick={() => {
                onClickStep('contents');
                setLoading(true);
              }}
            >
              {t(`DASHBOARD.Disini!`)}
            </Link>
          </p>
        </div>
        <div
          className={`flex items-start space-x-[10px] ${
            doneStep.horizontalList ? 'text-primary-50' : 'text-netral-50'
          }`}
        >
          <div className="flex-shrink-0 text-[28px] lg:text-[30px]">
            <FaEye />
          </div>
          <p className="text-bodyMd lg:text-bodyBase font-helvetica_regular">
            {t(`DASHBOARD.Tentukan produk yang ingin ditampilkan pada `)}
            <Link
              href="/admin/contents"
              className="text-primary-50 font-helvetica_bold cursor-pointer"
              onClick={() => {
                onClickStep('horizontalList');
                setLoading(true);
              }}
            >
              {t(`DASHBOARD.Daftar Horisontal!`)}
            </Link>
          </p>
        </div>
      </div>
    </>
  ) : null;
};

export default StepSetUp;
