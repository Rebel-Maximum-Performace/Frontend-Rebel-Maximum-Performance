'use client';
import TextInput from '@/components/Form/TextInput';
import Table from '@/components/Table';
import { FaPlus } from 'react-icons/fa';
import Popup from '@/components/Popup';
import Button from '@/components/Button';
import useInitCategoriesContent from '../hooks/useInitCategoriesContent';

const CategoriesContent = () => {
  const {
    t,
    search,
    setSearch,
    dataForm,
    headersTableCategories,
    actionsTableCategories,
    categoriesAdmin,
    onClickAction,
    popupCategory,
    addCategory,
    onClosePopup,
    onWarningAction,
    handleSubmitAction,
    errorFields,
    handleInputCategoryName,
    isLoading,
  } = useInitCategoriesContent();

  return (
    <div>
      <TextInput
        name="search"
        placeholder={t(`CATEGORIES.Cari Kategori`)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex space-x-[10px] lg:space-x-[15px] items-center my-[10px] lg:my-[15px]">
        <TextInput
          name="category"
          placeholder={t(`CATEGORIES.Masukkan Kategori`)}
          value={dataForm.category}
          onChange={(e) => handleInputCategoryName('add', e.target.value)}
          isError={errorFields.category.isError}
          helperText={errorFields.category.message}
        />
        <div className="flex items-start self-start mt-[5px] md:mt-[10px]">
          <FaPlus
            className="text-primary-50 text-[24px]"
            onClick={addCategory}
          />
        </div>
      </div>
      <div className="h-screen overflow-auto scroll-custom">
        <Table
          headers={headersTableCategories}
          contents={categoriesAdmin}
          actions={actionsTableCategories}
          onClickAction={onClickAction}
          isLoading={isLoading}
        />
      </div>

      <Popup
        open={popupCategory.isOpen && popupCategory.type === 'edit'}
        onClose={onClosePopup}
        width="420px"
      >
        <TextInput
          label={t(`CATEGORIES.Nama Kategori`)}
          placeholder={t(`CATEGORIES.Masukkan Nama Kategori`)}
          value={dataForm.categoryEdit}
          onChange={(e) => handleInputCategoryName('edit', e.target.value)}
          isError={errorFields.categoryEdit.isError}
          helperText={errorFields.categoryEdit.message}
          isRequired
        />
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
            onClick={() => onWarningAction('edit')}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`COMPONENT.Simpan`)}
          </Button>
        </div>
      </Popup>

      <Popup
        open={popupCategory.isOpen && popupCategory.type.includes('warning')}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-primary-50 text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Peringatan`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupCategory.message}
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
            onClick={handleSubmitAction}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            {t(`COMPONENT.Simpan`)}
          </Button>
        </div>
      </Popup>

      <Popup
        open={popupCategory.isOpen && popupCategory.type.includes('success')}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-[#00AA25] text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Berhasil`)}
        </h5>
        <p className="text-labelMd lg:text-h5 text-center">
          {popupCategory.message}
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
    </div>
  );
};

export default CategoriesContent;
