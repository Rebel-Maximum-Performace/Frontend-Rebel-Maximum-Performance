'use client';
import Button from '@/components/Button';
import { Field, Label, Switch } from '@headlessui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import useInitFormAddProduct from '../hooks/useInitFormAddProduct';
import TextInput from '@/components/Form/TextInput';
import { formatProductCode, parseNumber } from '@/helpers/formatting';
import CategoriesInput from './CategoriesInput';
import ImagesInput from './ImagesInput';
import Popup from '@/components/Popup';
import { useRef } from 'react';
import DetailsInput from './DetailsInput';
import FAQInput from './FAQInput';

const FormAddProduct = () => {
  const {
    t,
    dataForm,
    onChangeDataForm,
    images,
    handleImageChange,
    handleRemoveImage,
    handleBack,
    errorFields,
    categories,
    handleRemoveCategory,
    handleAddDetail,
    onSaveProduct,
    popupProduct,
    onClosePopup,
    handleSaveProduct,
  } = useInitFormAddProduct();
  const imageRef = useRef(null);

  return (
    <>
      <div className="flex justify-between w-full items-center mb-[20px] lg:mb-[30px]">
        <Button
          color="third"
          variant="contained"
          iconLeft={
            <IoMdArrowRoundBack className="text-[18px] lg:text-[24px]" />
          }
          className="w-max"
          onClick={handleBack}
        >
          Back
        </Button>
        <Field className="flex items-center space-x-[10px]">
          <Label>{t(`PRODUCTS.Terlaris`)}</Label>
          <Switch
            checked={dataForm.isBestSeller}
            onChange={() =>
              onChangeDataForm('isBestSeller', !dataForm.isBestSeller)
            }
            className="group inline-flex h-6 w-11 items-center rounded-full bg-secondary-70 transition data-[checked]:bg-primary-50"
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
        </Field>
      </div>

      <TextInput
        label={t(`ADD_PRODUCT.Nama Produk`)}
        name="productName"
        placeholder={t(`ADD_PRODUCT.Masukkan Nama Produk`)}
        onChange={(e) => onChangeDataForm('productName', e.target.value)}
        value={dataForm.productName}
        isError={errorFields.productName.isError}
        helperText={errorFields.productName.message}
        isRequired
        className="mb-[10px] lg:mb-[20px]"
      />

      <TextInput
        label={t(`ADD_PRODUCT.Kode Produk`)}
        name="sku"
        placeholder={t(`ADD_PRODUCT.Masukkan Kode Produk`)}
        onChange={(e) =>
          onChangeDataForm('sku', formatProductCode(e.target.value))
        }
        value={dataForm.sku}
        isError={errorFields.sku.isError}
        helperText={errorFields.sku.message}
        isRequired
        className="mb-[10px] lg:mb-[20px]"
      />

      <TextInput
        label={t(`ADD_PRODUCT.Link Amazon`)}
        name="amazonLink"
        placeholder={t(`ADD_PRODUCT.Masukkan Link Amazon`)}
        onChange={(e) => onChangeDataForm('amazonLink', e.target.value)}
        value={dataForm.amazonLink}
        isError={errorFields.amazonLink.isError}
        helperText={errorFields.amazonLink.message}
        className="mb-[10px] lg:mb-[20px]"
        isRequired
      />

      <TextInput
        label={t(`ADD_PRODUCT.Link Alibaba`)}
        name="alibabaLink"
        placeholder={t(`ADD_PRODUCT.Masukkan Link Alibaba`)}
        onChange={(e) => onChangeDataForm('alibabaLink', e.target.value)}
        value={dataForm.alibabaLink}
        isError={errorFields.alibabaLink.isError}
        helperText={errorFields.alibabaLink.message}
        className="mb-[10px] lg:mb-[20px]"
        isRequired
      />

      <TextInput
        label={t(`PRODUCTS.Harga`)}
        name="price"
        placeholder={t(`ADD_PRODUCT.Masukkan Harga`)}
        onChange={(e) => onChangeDataForm('price', parseNumber(e.target.value))}
        value={dataForm.price}
        isError={errorFields.price.isError}
        helperText={errorFields.price.message}
        className="mb-[10px] lg:mb-[20px]"
        isRequired
      />

      <CategoriesInput
        t={t}
        categories={categories}
        dataForm={dataForm}
        errorFields={errorFields}
        onChangeDataForm={onChangeDataForm}
        handleRemoveCategory={handleRemoveCategory}
      />

      <ImagesInput
        t={t}
        imageRef={imageRef}
        images={images}
        errorFields={errorFields}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
      />

      <DetailsInput />

      <Button
        color="primary"
        variant="contained"
        onClick={handleAddDetail}
        className="mb-[15px] lg:mb-[20px] justify-center"
      >
        {t(`ADD_PRODUCT.Tambah Detail`)}
      </Button>

      <FAQInput />

      <Button
        color="primary"
        variant="contained"
        onClick={onSaveProduct}
        className="mb-[15px] lg:mb-[20px] justify-center"
      >
        {t(`ADD_PRODUCT.Simpan Produk`)}
      </Button>

      <Popup
        open={popupProduct.isOpen && popupProduct.type.includes('warning')}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-primary-50 text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Peringatan`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupProduct.message}
        </p>
        <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
          <Button
            color="primary"
            variant="outlined"
            onClick={onClosePopup}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveProduct}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            Save
          </Button>
        </div>
      </Popup>

      <Popup
        open={popupProduct.isOpen && popupProduct.type.includes('success')}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-[#00AA25] text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Berhasil`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupProduct.message}
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
    </>
  );
};

export default FormAddProduct;
