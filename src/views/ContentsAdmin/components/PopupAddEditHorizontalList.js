'use client';

import TextInput from '@/components/Form/TextInput';
import useInitPopupAddEditHorizontalList from '../hooks/useInitPopupAddEditHorizontalList';
import { FaImage } from 'react-icons/fa';
import Popup from '@/components/Popup';
import Button from '@/components/Button';
import { IoMdCloseCircle } from 'react-icons/io';
import Image from 'next/image';

const PopupAddEditHorizontalList = ({
  open,
  data,
  onClose,
  onSave,
  dataForm,
  setDataForm,
  errorField,
  setErrorField,
}) => {
  const {
    t,
    onChangeInput,
    onChangeInputImage,
    handleRemoveImage,
    imageRef,
    onChangeInputDetails,
  } = useInitPopupAddEditHorizontalList({
    data,
    open,
    dataForm,
    setDataForm,
    setErrorField,
  });

  return (
    <Popup open={open} onClose={onClose} width="100%">
      <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold text-center my-[10px] lg:my-[20px]">
        {t(`CONTENTS.Tambah Daftar Horisontal`)}
      </h3>
      <TextInput
        label={t(`CONTENTS.Judul`)}
        name="title"
        placeholder={t(`CONTENTS.Masukkan Judul`)}
        onChange={(e) => onChangeInput('title', e.target.value)}
        value={dataForm.title || ''}
        isError={errorField.title?.isError}
        helperText={errorField.title?.message}
        isRequired
        className="mb-[10px] lg:mb-[20px]"
      />
      <TextInput
        label="Link"
        name="link"
        placeholder={t(`CONTENTS.Masukkan Link`)}
        onChange={(e) => onChangeInput('link', e.target.value)}
        value={dataForm.link || ''}
        isError={errorField.link?.isError}
        helperText={errorField.link?.message}
        isRequired
        className="mb-[10px] lg:mb-[20px]"
      />

      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {dataForm.details?.map((detail, index) => (
            <div key={index}>
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <Image
                  src={
                    typeof detail.image === 'string'
                      ? detail.image
                      : URL.createObjectURL(detail.image)
                  }
                  alt={`Uploaded ${index}`}
                  className="w-full object-cover rounded-md shadow"
                  width={100}
                  height={100}
                />
                <div
                  onClick={() => handleRemoveImage(index, detail.id)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <IoMdCloseCircle className="text-[18px] lg:text-[24px]" />
                </div>
              </div>
              <TextInput
                label={t(`CATEGORIES.Nama`)}
                name="name"
                placeholder={t(`CONTENTS.Masukkan Nama`)}
                onChange={(e) =>
                  onChangeInputDetails(index, 'name', e.target.value)
                }
                value={detail.name || ''}
                isError={errorField.details?.[index]?.name?.isError}
                helperText={errorField.details?.[index]?.name?.message}
                isRequired
                className="mb-[10px] lg:mb-[20px]"
              />
              <TextInput
                label="Link"
                name={`detailsLink${index}`}
                placeholder={t(`CONTENTS.Masukkan Link`)}
                onChange={(e) =>
                  onChangeInputDetails(index, 'link', e.target.value)
                }
                value={detail.link || ''}
                isError={errorField.details?.[index]?.link?.isError}
                helperText={errorField.details?.[index]?.link?.message}
                isRequired
                className="mb-[10px] lg:mb-[20px]"
              />
            </div>
          ))}
          <label
            htmlFor="detailsImages"
            className="cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed w-full aspect-w-1 aspect-h-1 flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30"
          >
            <div className="flex flex-col justify-center items-center">
              <FaImage className="sm:text-[30px] md:text-[40px] lg:text-[50px]" />
              {errorField.inputImage.isError ? (
                <p className="text-bodySm lg:text-h5 text-center text-primary-50">
                  {errorField.inputImage.message}
                </p>
              ) : (
                <>
                  <p className="text-bodySm lg:text-h5 text-center">
                    {t(`CONTENTS.Unggah / Letakkan Di Sini`)}
                  </p>
                </>
              )}
            </div>
            <input
              name="detailsImages"
              id="detailsImages"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              value={''}
              onChange={onChangeInputImage}
              ref={imageRef}
            />
          </label>
        </div>
        {errorField.images.isError && (
          <span
            className={`font-helvetica_regular text-labelSm md:text-labelBase text-primary-30`}
          >
            {errorField.images.message}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
        <Button
          color="primary"
          variant="outlined"
          onClick={onClose}
          className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSave(dataForm)}
          className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
        >
          Save
        </Button>
      </div>
    </Popup>
  );
};

export default PopupAddEditHorizontalList;
