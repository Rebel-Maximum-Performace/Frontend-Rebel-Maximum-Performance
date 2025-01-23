'use client';
import { useGetHorizontalListDetail } from '@/api/contents/useMutation';
import { mappingErrorFieldHorizontalList } from '@/helpers';
import { useEffect, useRef } from 'react';

const { useTranslation } = require('@/app/i18n/client');
const { useParams } = require('next/navigation');

const useInitPopupAddEditHorizontalList = ({
  data,
  open,
  dataForm,
  setDataForm,
  setErrorField,
}) => {
  const params = useParams();
  const { t } = useTranslation(params.lng, 'translation');
  const imageRef = useRef(null);

  // * QUERY
  const { mutate: detail } = useGetHorizontalListDetail({
    onError: () => {},
    onSuccess: (response) => {
      setDataForm({
        id: data.id,
        link: data.link,
        title: data.title,
        details: response.data.data,
      });
    },
  });

  // * FUNCTIONS
  const onChangeInput = (field, value) => {
    if (!value || value?.length === 0) {
      setErrorField((errorFields) => ({
        ...errorFields,
        [field]: {
          isError: true,
          message: mappingErrorFieldHorizontalList(field),
        },
      }));
    } else {
      setErrorField((errorFields) => ({
        ...errorFields,
        [field]: {
          isError: false,
          message: '',
        },
      }));
    }
    setDataForm({ ...dataForm, [field]: value });
  };

  const onChangeInputImage = (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      let datas = [];
      [...files].map((file) => {
        const validFormats = [
          'image/jpeg',
          'image/png',
          'image/jpg',
          'image/webp',
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (!validFormats.includes(file.type)) {
          setErrorField((errorFields) => ({
            ...errorFields,
            inputImage: {
              isError: true,
              message: mappingErrorFieldHorizontalList(t, 'invalid-format'),
            },
          }));
          return;
        }
        if (file.size > maxSize) {
          setErrorField((errorFields) => ({
            ...errorFields,
            inputImage: {
              isError: true,
              message: mappingErrorFieldHorizontalList(t, 'invalid-size'),
            },
          }));
          return;
        }

        const data = {
          name: '',
          image: file,
          link: '',
        };
        datas.push(data);
      });
      imageRef.current.value = '';
      setDataForm({
        ...dataForm,
        details: [...dataForm.details, ...datas],
      });
    }
  };
  const handleRemoveImage = (index, id) => {
    setDataForm({
      ...dataForm,
      details: dataForm.details.filter((_, i) => i !== index),
      removeDetailIds: dataForm.removeDetailIds
        ? [...dataForm.removeDetailIds, id]
        : [id],
    });
  };
  const onChangeInputDetails = (index, field, value) => {
    if (!value || value?.length === 0) {
      setErrorField((errorFields) => ({
        ...errorFields,
        details: errorFields.details.map((item, i) =>
          i === index
            ? {
                ...item,
                [field]: { isError: true, message: mappingErrorField(field) },
              }
            : item,
        ),
      }));
    }

    setDataForm({
      ...dataForm,
      details: dataForm.details.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    });
  };

  // * USE EFFECT
  useEffect(() => {
    if (open && data) {
      detail({
        id: data.id,
      });
    }
  }, [data]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.value = '';
    }
  }, [imageRef]);

  return {
    t,
    dataForm,
    onChangeInput,
    onChangeInputImage,
    handleRemoveImage,
    imageRef,
    onChangeInputDetails,
  };
};

export default useInitPopupAddEditHorizontalList;
