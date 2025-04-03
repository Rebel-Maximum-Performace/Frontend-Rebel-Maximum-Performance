'use client';
import { useGetAllCategories } from '@/api/categories/useMutation';
import { useAddProduct } from '@/api/products/useMutations';
import { useProductContext } from '@/context/ProductContext';
import { useWebContext } from '@/context/WebContext';
import { mappingErrorFieldProduct } from '@/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useInitFormAddProduct = () => {
  const { t, onErrorMutation, setLoading } = useWebContext();
  const {
    details,
    setDetails,
    errorFields,
    setErrorFields,
    faqs,
    handleValidation,
  } = useProductContext();
  const router = useRouter();

  // * LOCAL STATE
  const [images, setImages] = useState([]);
  const [dataForm, setDataForm] = useState({
    isBestSeller: false,
    productName: '',
    sku: '',
    amazonLink: '',
    alibabaLink: '',
    price: '',
    categories: [],
  });
  const [popupProduct, setPopupProduct] = useState({
    isOpen: false,
    type: '',
    message: '',
  });

  // * QUERY
  const { data: responseCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const { mutate: add } = useAddProduct({
    onError: onErrorMutation,
    onSuccess: () => {
      setPopupProduct({
        isOpen: true,
        type: 'success',
        message: t(`ADD_PRODUCT.Produk berhasil ditambahkan`),
      });
      setLoading(false);
    },
  });

  // * FUNCTIONS
  const onChangeDataForm = (key, value) => {
    if (key === 'categories') {
      const dataCategory = responseCategories?.data?.data.find(
        (item) => item.id === value,
      );
      setDataForm({
        ...dataForm,
        categories: [...dataForm.categories, dataCategory],
      });
      setErrorFields({
        ...errorFields,
        category: {
          isError: false,
          message: '',
        },
      });
    } else {
      if (
        ['productName', 'sku', 'amazonLink', 'alibabaLink', 'price'].includes(
          key,
        )
      ) {
        if (value?.length === 0) {
          setErrorFields({
            ...errorFields,
            [key]: {
              isError: true,
              message: mappingErrorFieldProduct(t, key),
            },
          });
        } else {
          setErrorFields({
            ...errorFields,
            [key]: {
              isError: false,
              message: '',
            },
          });
        }
      }
      setDataForm({ ...dataForm, [key]: value });
    }
  };
  const handleImageChange = (event) => {
    setErrorFields((errorFields) => ({
      ...errorFields,
      images: {
        isError: false,
        message: '',
      },
    }));
    const files = event.target.files;
    const datas = [];
    [...files].map((file) => {
      const validFormats = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (!validFormats.includes(file.type)) {
        setErrorFields((errorFields) => ({
          ...errorFields,
          images: {
            isError: true,
            message: mappingErrorFieldProduct(t, 'invalid-format'),
          },
        }));
        return;
      }
      if (file.size > maxSize) {
        setErrorFields((errorFields) => ({
          ...errorFields,
          iamges: {
            isError: true,
            message: mappingErrorFieldProduct(t, 'invalid-size'),
          },
        }));
        return;
      }
      datas.push(file);
    });
    event.target.value = '';
    setImages([...images, ...datas]);
  };
  const handleRemoveCategory = (index) => {
    const updatedCategories = [...dataForm.categories];
    updatedCategories.splice(index, 1);
    setDataForm({ ...dataForm, categories: updatedCategories });
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const handleBack = () => {
    router.back();
    setLoading(true);
  };
  const handleAddDetail = () => {
    setDetails([
      ...details,
      {
        items: [{ title: '', type: 'text', content: '' }],
        columns: 1,
      },
    ]);
  };
  const onSaveProduct = () => {
    // * Validation
    const sendErrorType = (type) => {
      return mappingErrorFieldProduct(t, type);
    };
    const isValid = handleValidation({
      dataForm,
      images,
      sendErrorType,
      onErrorMutation,
    });
    if (!isValid) {
      return;
    }

    setPopupProduct({
      isOpen: true,
      type: 'warning',
      message: t(`ADD_PRODUCT.Apa anda yakin ingin menyimpan produk`),
    });
  };
  const onClosePopup = () => {
    setPopupProduct({
      isOpen: false,
      type: '',
      message: '',
    });
    if (popupProduct.type === 'success') {
      router.push('/admin/products');
    }
  };
  const handleSaveProduct = () => {
    const attributes = [];

    details
      .filter(
        (item) =>
          item.items.filter(
            (item) => item.type === 'label-value' || item.type === 'table',
          ).length > 0,
      )
      .map((item) =>
        item.items.map((item) => {
          if (item.type === 'label-value') {
            item.data.map((item) => {
              attributes.push({
                name: item.label,
                values: [item.value],
              });
            });
          } else if (item.type === 'table') {
            item.headers.map((header) => {
              attributes.push({
                name: header.label,
                values: item.contents.map((content) => content[header.field]),
              });
            });
          }
        }),
      );

    const formData = new FormData();
    formData.append('isBestSeller', dataForm.isBestSeller);
    formData.append('productName', dataForm.productName);
    formData.append('sku', dataForm.sku);
    formData.append('amazonLink', dataForm.amazonLink);
    formData.append('alibabaLink', dataForm.alibabaLink);
    formData.append('price', dataForm.price);

    dataForm.categories.map((category, index) => {
      formData.append(`categories[${index}]`, category.id);
    });

    images.map((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    details.map((detail, index) => {
      formData.append(`details[${index}][columns]`, detail.columns);
      detail.items.map((item, itemIndex) => {
        if (item.type === 'text') {
          formData.append(
            `details[${index}][items][${itemIndex}][title]`,
            item.title,
          );
          formData.append(
            `details[${index}][items][${itemIndex}][type]`,
            item.type,
          );
          formData.append(
            `details[${index}][items][${itemIndex}][content]`,
            item.content,
          );
        } else if (item.type === 'list') {
          formData.append(
            `details[${index}][items][${itemIndex}][title]`,
            item.title,
          );
          formData.append(
            `details[${index}][items][${itemIndex}][type]`,
            item.type,
          );
          item.list.map((lis, lisIndex) => {
            formData.append(
              `details[${index}][items][${itemIndex}][list][${lisIndex}]`,
              lis,
            );
          });
        } else if (item.type === 'label-value') {
          formData.append(
            `details[${index}][items][${itemIndex}][title]`,
            item.title,
          );
          formData.append(
            `details[${index}][items][${itemIndex}][type]`,
            item.type,
          );
          item.data.map((data, dataIndex) => {
            formData.append(
              `details[${index}][items][${itemIndex}][data][${dataIndex}][label]`,
              data.label,
            );
            formData.append(
              `details[${index}][items][${itemIndex}][data][${dataIndex}][value]`,
              data.value,
            );
          });
        } else if (item.type === 'table') {
          formData.append(
            `details[${index}][items][${itemIndex}][title]`,
            item.title,
          );
          formData.append(
            `details[${index}][items][${itemIndex}][type]`,
            item.type,
          );

          item.headers.map((header, headerIndex) => {
            formData.append(
              `details[${index}][items][${itemIndex}][headers][${headerIndex}][label]`,
              header.label,
            );
            formData.append(
              `details[${index}][items][${itemIndex}][headers][${headerIndex}][field]`,
              header.field,
            );
            formData.append(
              `details[${index}][items][${itemIndex}][headers][${headerIndex}][position]`,
              'left',
            );
            formData.append(
              `details[${index}][items][${itemIndex}][headers][${headerIndex}][width]`,
              header.width,
            );
          });

          item.contents.map((content, contentIndex) => {
            formData.append(
              `details[${index}][items][${itemIndex}][contents][${contentIndex}][id]`,
              content.id,
            );
            item.headers.map((header) => {
              formData.append(
                `details[${index}][items][${itemIndex}][contents][${contentIndex}][${header.field}]`,
                content[header.field],
              );
            });
          });
        }
      });
    });

    attributes.map((attribute, index) => {
      formData.append(`attributes[${index}][name]`, attribute.name);
      attribute.values.map((value, valueIndex) => {
        formData.append(`attributes[${index}][values][${valueIndex}]`, value);
      });
    });

    faqs.map((faq, index) => {
      formData.append(`faqs[${index}][questionId]`, faq.questionId);
      formData.append(`faqs[${index}][answerId]`, faq.answerId);
      formData.append(`faqs[${index}][questionEn]`, faq.questionEn);
      formData.append(`faqs[${index}][answerEn]`, faq.answerEn);
      formData.append(`faqs[${index}][orderFaq]`, index + 1);
    });

    add(formData);
    setPopupProduct({
      isOpen: false,
      type: '',
      message: '',
    });
    setLoading(true);
  };

  // * USE EFFECT
  useEffect(() => {
    getAllCategories({ search: '', page: 1 }, { onError: onErrorMutation });
  }, []);

  return {
    t,
    dataForm,
    onChangeDataForm,
    images,
    handleImageChange,
    handleRemoveImage,
    handleBack,
    errorFields,
    categories: responseCategories?.data?.data,
    handleRemoveCategory,
    handleAddDetail,
    onSaveProduct,
    popupProduct,
    onClosePopup,
    handleSaveProduct,
  };
};

export default useInitFormAddProduct;
