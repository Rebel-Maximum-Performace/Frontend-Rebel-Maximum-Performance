'use client';
import React from 'react';
import BannerInput from './BannerInput';
import Button from '@/components/Button';
import Popup from '@/components/Popup';
import useFormInputBanner from '../hooks/useFormInputBanner';

const FormInputBanner = () => {
  const {
    t,
    rulesBanners,
    dataForm,
    setDataForm,
    popupContents,
    onClickAddBanner,
    onClosePopup,
    handleSaveBanner,
    defaultActiveBanner,
    setRemoveImages,
  } = useFormInputBanner();

  return (
    <React.Fragment>
      <BannerInput
        title={t(`CONTENTS.Spanduk Utama`)}
        type="mainBanner"
        banners={[...dataForm.mainBanner, { isInput: true }]}
        rules={rulesBanners.mainBanner}
        setDataForm={setDataForm}
        dataForm={dataForm}
        defaultActiveBanner={defaultActiveBanner.mainBanner}
        setRemoveImages={setRemoveImages}
      />
      <BannerInput
        title={t(`CONTENTS.Spanduk Produk Baru / Spanduk Promo`)}
        type="promotionBanner"
        banners={[...dataForm.promotionBanner, { isInput: true }]}
        rules={rulesBanners.promotionBanner}
        setDataForm={setDataForm}
        dataForm={dataForm}
        defaultActiveBanner={defaultActiveBanner.promotionBanner}
        setRemoveImages={setRemoveImages}
        isSingle
      />
      <BannerInput
        title={t(`CONTENTS.Spanduk Halaman Produk`)}
        type="productPageBanner"
        banners={[...dataForm.productPageBanner, { isInput: true }]}
        rules={rulesBanners.productPageBanner}
        setDataForm={setDataForm}
        dataForm={dataForm}
        defaultActiveBanner={defaultActiveBanner.productPageBanner}
        setRemoveImages={setRemoveImages}
      />
      <Button
        color="third"
        variant="contained"
        className="justify-center"
        onClick={onClickAddBanner}
      >
        {t(`COMPONENT.Simpan Perubahan`)}
      </Button>

      {/* ===== POPUP CONFIRMATION ===== */}
      <Popup
        open={
          popupContents.isOpen && popupContents.type.includes('confirmation')
        }
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-primary-50 text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Peringatan`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupContents.message}
        </p>
        <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
          <Button
            color="primary"
            variant="outlined"
            onClick={onClosePopup}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`COMPONENT.Batal`)}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveBanner}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`COMPONENT.Simpan`)}
          </Button>
        </div>
      </Popup>

      {/* ==== POPUP SUCCESS & VALIDASI ===== */}
      <Popup
        open={
          popupContents.isOpen &&
          ['warning', 'success'].includes(popupContents.type)
        }
        onClose={onClosePopup}
        width="420px"
      >
        <h5
          className={`${
            popupContents.type === 'warning'
              ? 'text-primary-50'
              : 'text-[#00AA25]'
          } text-labelMd lg:text-h5 text-center mb-[15px] lg:mb-[30px]`}
        >
          {popupContents.type === 'warning'
            ? t(`COMPONENT.Peringatan`)
            : t(`COMPONENT.Berhasil`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupContents.message}
        </p>
        <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
          <Button
            color="primary"
            variant="contained"
            onClick={onClosePopup}
            className="w-full justify-center"
          >
            OK
          </Button>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default FormInputBanner;
