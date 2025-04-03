'use client';
import { useGetAllCategories } from '@/api/categories/useMutation';
import {
  useEditProduct,
  useGetDetailProduct,
} from '@/api/products/useMutations';
import { useProductContext } from '@/context/ProductContext';
import { useWebContext } from '@/context/WebContext';
import { mappingErrorFieldProduct } from '@/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useInitFormAddProduct = () => {
  const { t, onErrorMutation, setLoading, productId } = useWebContext();
  const {
    details,
    setDetails,
    errorFields,
    setErrorFields,
    faqs,
    setFaqs,
    removedCategories,
    setRemovedCategories,
    addCategories,
    setAddCategories,
    setRemovedImages,
    addImages,
    removedImages,
    setAddImages,
    removedDetail,
    removedFaqs,
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
  const [isEditProduct, setIsEditProduct] = useState(false);

  // * QUERY
  const { data: responseCategories, mutate: getAllCategories } =
    useGetAllCategories();
  const { mutate: edit } = useEditProduct({
    onError: onErrorMutation,
    onSuccess: () => {
      setPopupProduct({
        isOpen: true,
        type: 'success',
        message: t(`COMPONENT.Berhasil Disimpan`),
      });
      setLoading(false);
    },
  });
  const { data: responseDetail, mutate: getDetailProduct } =
    useGetDetailProduct();

  // * FUNCTIONS
  const onChangeDataForm = (key, value) => {
    if (key === 'categories') {
      const dataCategory = responseCategories?.data?.data.find(
        (item) => item.id === value,
      );

      if (
        responseDetail.data.data.categories.some((item) => item.id === value) &&
        removedCategories.some((item) => item.id === value)
      ) {
        setRemovedCategories(
          removedCategories.filter((item) => item.id !== value),
        );
      }

      if (
        !responseDetail.data.data.categories.some((item) => item.id === value)
      ) {
        setAddCategories([...addCategories, dataCategory]);
      }

      setDataForm({
        ...dataForm,
        categories: [...dataForm.categories, dataCategory],
      });
    } else {
      setIsEditProduct(true);
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
    setAddImages([...addImages, ...datas]);
  };
  const handleRemoveCategory = (index) => {
    const updatedCategories = [...dataForm.categories];

    if (
      responseDetail.data.data.categories.some(
        (item) => item.id === updatedCategories[index].id,
      )
    ) {
      setRemovedCategories((prev) => [...prev, updatedCategories[index]]);
    }

    if (addCategories.some((item) => item.id === updatedCategories[index].id)) {
      setAddCategories((prev) => {
        return prev.filter((item) => item.id !== updatedCategories[index]?.id);
      });
    }

    updatedCategories.splice(index, 1);
    setDataForm({ ...dataForm, categories: updatedCategories });
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];

    if (updatedImages[index].id) {
      setRemovedImages((prev) => [...prev, updatedImages[index]]);
    } else {
      setAddImages((prev) =>
        prev.filter((item) => item !== updatedImages[index]),
      );
    }
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
        isNew: true,
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
      message: t(`COMPONENT.Apa anda yakin ingin menyimpan perubahan`),
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
    const formData = new FormData();
    formData.append('id', productId);

    // * Product
    if (isEditProduct) {
      formData.append('isEditProduct', true);
      formData.append('productName', dataForm.productName);
      formData.append('sku', dataForm.sku);
      formData.append('amazonLink', dataForm.amazonLink);
      formData.append('alibabaLink', dataForm.alibabaLink);
      formData.append('price', dataForm.price);
      formData.append('isBestSeller', dataForm.isBestSeller);
    }

    if (addCategories.length > 0) {
      addCategories.map((category, index) => {
        formData.append(`addCategories[${index}]`, category.id);
      });
    }

    if (removedCategories.length > 0) {
      removedCategories.map((category, index) => {
        formData.append(`removeCategories[${index}]`, category.id);
      });
    }

    if (addImages.length > 0) {
      addImages.map((image, index) => {
        formData.append(`addImages[${index}]`, image);
      });
    }

    if (removedImages.length > 0) {
      console.log(removedImages, 'image');
      removedImages.map((image, index) => {
        console.log(image, 'image');
        formData.append(`removeImages[${index}]`, image.id);
      });
    }

    if (details.filter((item) => item.isUpdated).length > 0) {
      details
        .filter((item) => item.isUpdated)
        .map((detail, index) => {
          formData.append(`updateDetails[${index}][id]`, detail.id);
          formData.append(`updateDetails[${index}][columns]`, detail.columns);
          detail.items.map((item, itemIndex) => {
            if (item.type === 'text') {
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][content]`,
                item.content,
              );
            } else if (item.type === 'list') {
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              item.list.map((lis, lisIndex) => {
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][list][${lisIndex}]`,
                  lis,
                );
              });
            } else if (item.type === 'label-value') {
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              item.data.map((data, dataIndex) => {
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][data][${dataIndex}][label]`,
                  data.label,
                );
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][data][${dataIndex}][value]`,
                  data.value,
                );
              });
            } else if (item.type === 'table') {
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `updateDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );

              item.headers.map((header, headerIndex) => {
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][headers][${headerIndex}][label]`,
                  header.label,
                );
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][headers][${headerIndex}][field]`,
                  header.field,
                );
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][headers][${headerIndex}][position]`,
                  'left',
                );
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][headers][${headerIndex}][width]`,
                  header.width,
                );
              });

              item.contents.map((content, contentIndex) => {
                formData.append(
                  `updateDetails[${index}][items][${itemIndex}][contents][${contentIndex}][id]`,
                  content.id,
                );
                item.headers.map((header) => {
                  formData.append(
                    `updateDetails[${index}][items][${itemIndex}][contents][${contentIndex}][${header.field}]`,
                    content[header.field],
                  );
                });
              });
            }
          });
        });
    }

    if (details.filter((item) => item.isNew).length > 0) {
      details
        .filter((item) => item.isNew)
        .map((detail, index) => {
          formData.append(`addDetails[${index}][columns]`, detail.columns);
          detail.items.map((item, itemIndex) => {
            if (item.type === 'text') {
              formData.append(
                `addDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `addDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              formData.append(
                `addDetails[${index}][items][${itemIndex}][content]`,
                item.content,
              );
            } else if (item.type === 'list') {
              formData.append(
                `addDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `addDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              item.list.map((lis, lisIndex) => {
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][list][${lisIndex}]`,
                  lis,
                );
              });
            } else if (item.type === 'label-value') {
              formData.append(
                `addDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `addDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );
              item.data.map((data, dataIndex) => {
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][data][${dataIndex}][label]`,
                  data.label,
                );
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][data][${dataIndex}][value]`,
                  data.value,
                );
              });
            } else if (item.type === 'table') {
              formData.append(
                `addDetails[${index}][items][${itemIndex}][title]`,
                item.title,
              );
              formData.append(
                `addDetails[${index}][items][${itemIndex}][type]`,
                item.type,
              );

              item.headers.map((header, headerIndex) => {
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][headers][${headerIndex}][label]`,
                  header.label,
                );
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][headers][${headerIndex}][field]`,
                  header.field,
                );
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][headers][${headerIndex}][position]`,
                  'left',
                );
                formData.append(
                  `addDetails[${index}][items][${itemIndex}][headers][${headerIndex}][width]`,
                  header.width,
                );
              });

              item.contents.map((content, contentIndex) => {
                item.headers.map((header) => {
                  formData.append(
                    `addDetails[${index}][items][${itemIndex}][contents][${contentIndex}][${header.field}]`,
                    content[header.field],
                  );
                });
              });
            }
          });
        });
    }

    if (removedDetail.length > 0) {
      removedDetail.map((detail, index) => {
        formData.append(`removeDetails[${index}]`, detail.id);
      });
    }

    if (faqs.filter((item) => item.isNew).length > 0) {
      faqs
        .filter((item) => item.isNew)
        .map((faq, index) => {
          formData.append(`addFaqs[${index}][questionId]`, faq.questionId);
          formData.append(`addFaqs[${index}][answerId]`, faq.answerId);
          formData.append(`addFaqs[${index}][questionEn]`, faq.questionEn);
          formData.append(`addFaqs[${index}][answerEn]`, faq.answerEn);
          formData.append(`addFaqs[${index}][orderFaq]`, index + 1);
        });
    }

    if (faqs.filter((item) => item.isUpdated).length > 0) {
      faqs
        .filter((item) => item.isUpdated)
        .map((faq, index) => {
          formData.append(`updateFaqs[${index}][id]`, faq.id);
          formData.append(`updateFaqs[${index}][questionId]`, faq.questionId);
          formData.append(`updateFaqs[${index}][answerId]`, faq.answerId);
          formData.append(`updateFaqs[${index}][questionEn]`, faq.questionEn);
          formData.append(`updateFaqs[${index}][answerEn]`, faq.answerEn);
          formData.append(`updateFaqs[${index}][orderFaq]`, index + 1);
        });
    }

    if (removedFaqs.length > 0) {
      removedFaqs.map((faq, index) => {
        formData.append(`removeFaqs[${index}]`, faq.id);
      });
    }

    // attributesUtils();

    edit(formData);
    setPopupProduct({
      isOpen: false,
      type: '',
      message: '',
    });
    setLoading(true);
  };

  // * USE EFFECT
  useEffect(() => {
    getAllCategories({ search: '' }, { onError: onErrorMutation });
  }, []);

  useEffect(() => {
    if (productId) {
      getDetailProduct(
        { id: productId },
        {
          onError: onErrorMutation,
          onSuccess: (response) => {
            setDataForm({
              productName: response.data.data.productName,
              sku: response.data.data.sku,
              amazonLink: response.data.data.amazonLink,
              alibabaLink: response.data.data.alibabaLink,
              price: response.data.data.price,
              isBestSeller: response.data.data.isBestSeller,
              categories: response.data.data.categories,
            });
            setImages(response.data.data.images);
            setDetails(response.data.data.details);
            setFaqs(response.data.data.faqs);
          },
        },
      );
    } else {
      router.back();
      setLoading(true);
    }
  }, [productId]);

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
