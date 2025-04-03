'use client';
import { useEffect, useState } from 'react';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import useDebounce from '@/hooks/useDebounce';
import {
  useAddCategory,
  useEditCategory,
  useGetAllCategories,
  useRemoveCategory,
} from '@/api/categories/useMutation';
import { useWebContext } from '@/context/WebContext';

const actionsTableCategories = [
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

const useInitCategoriesContent = () => {
  const { t, setLoading, onErrorMutation } = useWebContext();
  const headersTableCategories = [
    {
      label: 'ID',
      field: 'id',
      position: 'left',
      width: '30%',
    },
    {
      label: t(`CATEGORIES.Nama`),
      field: 'name',
      position: 'left',
      width: '70%',
    },
  ];
  const [errorFields, setErrorFields] = useState({
    category: {
      isError: false,
      message: '',
    },
    categoryEdit: {
      isError: false,
      message: '',
    },
  });

  // * LOCAL STATE
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search, 500);
  const [dataForm, setDataForm] = useState({
    category: '',
    categoryEdit: '',
  });
  const [popupCategory, setPopupCategory] = useState({
    isOpen: false,
    type: '',
    message: '',
  });
  const [dataSelected, setDataSelected] = useState(null);
  const [action, setAction] = useState('');

  // * HELPERS
  const onSuccessAction = () => {
    setLoading(false);
    setPopupCategory({
      isOpen: true,
      type: 'success',
      message:
        action === 'remove'
          ? t(`COMPONENT.Berhasil Dihapus`)
          : t(`COMPONENT.Berhasil Disimpan`),
    });
  };

  // * QUERY
  const {
    isLoading,
    data: response,
    mutate: getAllCategories,
  } = useGetAllCategories();

  const { mutate: add } = useAddCategory({
    onSuccess: onSuccessAction,
    onError: (data) => {
      if (data?.response?.data?.message === 'Category name already exists') {
        setErrorFields({
          ...errorFields,
          category: {
            isError: true,
            message: t(`CATEGORIES.Nama Kategori sudah ada`),
          },
        });
        setPopupCategory({
          isOpen: false,
          type: '',
          message: '',
        });
      } else {
        onErrorMutation(data);
      }
    },
  });
  const { mutate: edit } = useEditCategory({
    onSuccess: onSuccessAction,
    onError: (data) => {
      if (data?.response?.data?.message === 'Category name already exists') {
        setErrorFields({
          ...errorFields,
          categoryEdit: {
            isError: true,
            message: t(`CATEGORIES.Nama Kategori sudah ada`),
          },
        });
        setPopupCategory({
          isOpen: true,
          type: 'edit',
          message: '',
        });
      } else {
        onErrorMutation(data);
      }
    },
  });
  const { mutate: remove } = useRemoveCategory({
    onSuccess: onSuccessAction,
    onError: onErrorMutation,
  });

  // * FUNCTIONS
  const onClickAction = (action, data) => {
    setAction(action);
    if (action === 'edit') {
      setDataForm({ ...dataForm, categoryEdit: data.name });
      setDataSelected(data);
      setPopupCategory({
        isOpen: true,
        type: 'edit',
        message: '',
      });
    } else if (action === 'remove') {
      setDataSelected(data);
      onWarningAction('remove');
    }
  };

  const handleSubmitAction = () => {
    if (action === 'add') {
      add({ name: dataForm.category });
      setLoading(true);
    } else if (action === 'edit') {
      edit({ id: dataSelected.id, name: dataForm.categoryEdit });
      setLoading(true);
    } else if (action === 'remove') {
      remove({ id: dataSelected.id });
      setLoading(true);
    }
  };

  const addCategory = () => {
    if (dataForm.category.length > 0) {
      setAction('add');
      onWarningAction('add');
    } else {
      setErrorFields({
        ...errorFields,
        category: {
          isError: true,
          message: t(`CATEGORIES.Nama Kategori harus diisi`),
        },
      });
    }
  };

  const onWarningAction = (action) => {
    if (action === 'edit' && dataForm.categoryEdit.length === 0) {
      setErrorFields({
        ...errorFields,
        categoryEdit: {
          isError: true,
          message: t(`CATEGORIES.Nama Kategori harus diisi`),
        },
      });
    } else {
      setPopupCategory({
        isOpen: true,
        type: `warning-${action}`,
        message:
          action === 'add'
            ? t(`CATEGORIES.Apa anda yakin ingin menyimpan kategori`)
            : action === 'remove'
            ? t(`COMPONENT.Apa anda yakin ingin menghapus`)
            : t(`COMPONENT.Apa anda yakin ingin menyimpan perubahan`),
      });
    }
  };

  const onClosePopup = () => {
    if (popupCategory.type === 'warning-edit') {
      setPopupCategory({
        isOpen: true,
        type: 'edit',
        message: '',
      });
    } else {
      setPopupCategory({
        isOpen: false,
        type: '',
        message: '',
      });
      setDataSelected(null);
      if (popupCategory.type === 'success') {
        getAllCategories({ search: '' }, { onError: onErrorMutation });
        setDataForm({
          category: '',
          categoryEdit: '',
        });
      }
    }
  };

  const handleInputCategoryName = (type, value) => {
    if (type === 'add') {
      setErrorFields({
        ...errorFields,
        category: {
          isError: false,
          message: '',
        },
      });
      setDataForm({ ...dataForm, category: value });
    } else if (type === 'edit') {
      setErrorFields({
        ...errorFields,
        categoryEdit: {
          isError: false,
          message: '',
        },
      });
      setDataForm({ ...dataForm, categoryEdit: value });
    }
  };

  // * USE EFFECT
  useEffect(() => {
    getAllCategories(
      { search: searchDebounce, page: 1 },
      { onError: onErrorMutation },
    );
  }, [searchDebounce]);

  return {
    t,
    search,
    setSearch,
    dataForm,
    headersTableCategories,
    actionsTableCategories,
    categoriesAdmin: response?.data?.data,
    isLoading,
    onClickAction,
    popupCategory,
    dataSelected,
    addCategory,
    onClosePopup,
    onWarningAction,
    handleSubmitAction,
    errorFields,
    handleInputCategoryName,
  };
};

export default useInitCategoriesContent;
