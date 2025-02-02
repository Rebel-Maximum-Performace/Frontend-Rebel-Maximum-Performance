import {
  useAddHorizontalList,
  useEditHorizontalList,
  useGetAllHorizontalList,
  useRemoveHorizontalList,
} from '@/api/contents/useMutation';
import { useWebContext } from '@/context/WebContext';
import { mappingErrorFieldHorizontalList } from '@/helpers';
import { useEffect, useState } from 'react';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';

const useInitTableHorizontalList = () => {
  const { t, onErrorMutation } = useWebContext();
  const queryClient = useQueryClient();
  const headersTableHorizontalList = [
    { label: 'ID', field: 'id', position: 'left', width: '30%' },
    {
      label: t(`CONTENTS.Judul`),
      field: 'title',
      position: 'left',
      width: '70%',
    },
  ];
  const actionsTableHorizontalList = [
    {
      label: (
        <FaRegEdit className="text-primary-50 text-[18px] lg:text-[24px] cursor-pointer" />
      ),
      name: 'edit',
    },
    {
      label: (
        <FaTrash className="text-primary-50 text-[18px] lg:text-[24px] cursor-pointer" />
      ),
      name: 'remove',
    },
  ];

  // * LOCAL STATE
  const [action, setAction] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [dataForm, setDataForm] = useState({
    title: '',
    link: '',
    details: [],
  });
  const [popupAddEdit, setPopupAddEdit] = useState(false);
  const [popupContents, setPopupContents] = useState({
    isOpen: false,
    type: '',
    message: '',
  });
  const [errorField, setErrorField] = useState({
    title: {
      isError: false,
      message: '',
    },
    link: {
      isError: false,
      message: '',
    },
    details: [],
    images: {
      isError: false,
      message: '',
    },
    inputImage: {
      isError: false,
      message: '',
    },
  });

  // * HELPERS
  const onSuccessAction = () => {
    setPopupContents({
      isOpen: true,
      type: 'success',
      message:
        action === 'remove'
          ? t(`COMPONENT.Berhasil Dihapus`)
          : t(`COMPONENT.Berhasil Disimpan`),
    });
  };

  // * QUERY
  const { data: responseHorizontalList, mutate: getAllHorizontalList } =
    useGetAllHorizontalList();
  const { mutate: save } = useAddHorizontalList({
    onError: () => {},
    onSuccess: () => {
      setPopupAddEdit(false);
      onSuccessAction();
    },
  });
  const { mutate: edit } = useEditHorizontalList({
    onError: () => {},
    onSuccess: () => {
      setPopupAddEdit(false);
      setSelectedData(null);
      onSuccessAction();
    },
  });
  const { mutate: remove } = useRemoveHorizontalList({
    onError: () => {},
    onSuccess: () => {
      onSuccessAction();
    },
  });

  // * FUNCTIONS
  const onClickAddHorizontalList = () => {
    setAction('add');
    setPopupAddEdit(true);
  };
  const onClickActionTableHorizontalList = (action, data) => {
    setAction(action);
    setSelectedData(data);
    if (action === 'edit') {
      setPopupAddEdit(true);
    } else if (action === 'remove') {
      setSelectedData(data);
      setPopupContents({
        isOpen: true,
        type: 'warning',
        message: t(`COMPONENT.Apa anda yakin ingin menghapus`),
      });
    }
  };
  const onClosePopup = () => {
    if (popupContents.type === 'success') {
      queryClient.invalidateQueries('horizontalList');
      setDataForm({
        title: '',
        link: '',
        details: [],
      });
    }
    setPopupContents({
      isOpen: false,
      type: '',
      message: '',
    });
  };
  const handleSaveHorizontalList = () => {
    const formData = new FormData();
    formData.append('title', dataForm?.title);
    formData.append('link', dataForm?.link);
    formData,
      dataForm.details.map((detail, index) => {
        if (detail.id) {
          formData.append(`details[${index}][id]`, detail.id);
        }
        formData.append(`details[${index}][name]`, detail.name);
        formData.append(`details[${index}][image]`, detail.image);
        formData.append(`details[${index}][link]`, detail.link);
      });

    if (action === 'add') {
      save(formData);
    } else if (action === 'edit') {
      formData.append('id', selectedData?.id);
      if (dataForm.removeDetailIds) {
        dataForm.removeDetailIds.map((id, index) => {
          formData.append(`removeDetailIds[${index}]`, id);
        });
      }
      edit(formData);
    }
  };
  const handleRemoveHorizontalList = () => {
    remove({
      id: selectedData?.id,
    });
  };
  const onClosePopupAddEdit = () => {
    setPopupAddEdit(false);
    setSelectedData(null);
    setDataForm({
      title: '',
      link: '',
      details: [],
    });
  };
  const onSavePopupAddEdit = (dataForm) => {
    if (dataForm?.title?.length === 0) {
      setErrorField({
        ...errorField,
        title: {
          isError: true,
          message: mappingErrorFieldHorizontalList(t, 'title'),
        },
      });
      return;
    }

    if (dataForm?.link?.length === 0) {
      setErrorField({
        ...errorField,
        link: {
          isError: true,
          message: mappingErrorFieldHorizontalList(t, 'link'),
        },
      });
      return;
    }

    if (dataForm?.details?.length === 0) {
      setErrorField({
        ...errorField,
        images: {
          isError: true,
          message: mappingErrorFieldHorizontalList(t, 'images'),
        },
      });
      return;
    }

    if (action === 'edit') {
      setDataForm(dataForm);
      setPopupContents({
        isOpen: true,
        type: 'warning',
        message: t(`COMPONENT.Apa anda yakin ingin menyimpan perubahan`),
      });
    } else if (action === 'add') {
      setDataForm(dataForm);
      setPopupContents({
        isOpen: true,
        type: 'warning',
        message: t(`CONTENTS.Apa anda yakin ingin menyimpan daftar horisontal`),
      });
    }
  };

  useEffect(
    () => () => {
      getAllHorizontalList(null, { onError: onErrorMutation });
    },
    [],
  );

  return {
    t,
    horizontalList: responseHorizontalList?.data?.data,
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
  };
};

export default useInitTableHorizontalList;
