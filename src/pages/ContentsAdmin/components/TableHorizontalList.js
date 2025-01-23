'use client';
import Button from '@/components/Button';
import useInitTableHorizontalList from '../hooks/useInitTableHorizontalList';
import { FaPlus } from 'react-icons/fa';
import Table from '@/components/Table';
import Popup from '@/components/Popup';
import PopupAddEditHorizontalList from './PopupAddEditHorizontalList';

const TableHorizontalList = () => {
  const {
    t,
    horizontalList,
    headersTableHorizontalList,
    actionsTableHorizontalList,
    popupContents,
    action,
    selectedData,
    popupAddEdit,
    dataForm,
    errorField,
    onClickAddHorizontalList,
    onClickActionTableHorizontalList,
    onClosePopup,
    handleSaveHorizontalList,
    handleRemoveHorizontalList,
    onClosePopupAddEdit,
    onSavePopupAddEdit,
    setDataForm,
    setErrorField,
  } = useInitTableHorizontalList();

  return (
    <>
      <h3 className="text-bodyMd lg:text-h3 font-helvetica_bold mb-[10px] mt-[15px] lg:mt-[30px]">
        {t(`CONTENTS.Daftar Horisontal`)}
      </h3>

      <Button
        color="primary"
        variant="contained"
        iconLeft={<FaPlus className="text-[18px] lg:text-[24px]" />}
        className="justify-center"
        onClick={onClickAddHorizontalList}
      >
        {t(`CONTENTS.Tambah Daftar Horisontal`)}
      </Button>

      <div className="my-[15px] lg:mt-[20px] lg:mb-[30px]">
        <Table
          headers={headersTableHorizontalList}
          actions={actionsTableHorizontalList}
          onClickAction={onClickActionTableHorizontalList}
          contents={horizontalList}
        />
      </div>

      <Popup
        open={popupContents.isOpen && popupContents.type.includes('warning')}
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
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              if (action === 'remove') {
                handleRemoveHorizontalList();
              } else {
                handleSaveHorizontalList();
              }
            }}
            className="w-[calc(50%-10px)] lg:w-[calc(50%-20px)] justify-center"
          >
            Save
          </Button>
        </div>
      </Popup>

      <Popup
        open={popupContents.isOpen && popupContents.type.includes('success')}
        onClose={onClosePopup}
        width="420px"
      >
        <h5 className="text-labelMd lg:text-h5 text-[#00AA25] text-center mb-[15px] lg:mb-[30px]">
          {t(`COMPONENT.Berhasil`)}
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

      <PopupAddEditHorizontalList
        open={popupAddEdit}
        onClose={onClosePopupAddEdit}
        onSave={onSavePopupAddEdit}
        data={selectedData}
        dataForm={dataForm}
        setDataForm={setDataForm}
        errorField={errorField}
        setErrorField={setErrorField}
      />
    </>
  );
};

export default TableHorizontalList;
