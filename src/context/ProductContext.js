'use client';
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [details, setDetails] = useState([
    {
      items: [{ title: 'Description', type: 'text', content: '' }],
      columns: 1,
    },
  ]);
  const [faqs, setFaqs] = useState([]);
  const [errorFields, setErrorFields] = useState({
    productName: { isError: false, message: '' },
    sku: { isError: false, message: '' },
    amazonLink: { isError: false, message: '' },
    alibabaLink: { isError: false, message: '' },
    price: { isError: false, message: '' },
    category: { isError: false, message: '' },
    details: [],
    images: { isError: false, message: '' },
    description: { isError: false, message: '' },
  });

  const [addImages, setAddImages] = useState([]);
  const [addCategories, setAddCategories] = useState([]);

  const [removedCategories, setRemovedCategories] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedDetail, setRemovedDetail] = useState([]);
  const [removedFaqs, setRemovedFaqs] = useState([]);

  const handleValidation = ({
    dataForm,
    images,
    sendErrorType,
    onErrorMutation,
  }) => {
    if (dataForm.productName.length === 0) {
      setErrorFields({
        ...errorFields,
        productName: {
          isError: true,
          message: sendErrorType('productName'),
        },
      });
      onErrorMutation({ message: sendErrorType('productName') });
      return false;
    }

    if (dataForm.sku.length === 0) {
      setErrorFields({
        ...errorFields,
        sku: {
          isError: true,
          message: sendErrorType('sku'),
        },
      });
      onErrorMutation({ message: sendErrorType('sku') });
      return false;
    }

    if (dataForm.amazonLink.length === 0) {
      setErrorFields({
        ...errorFields,
        amazonLink: {
          isError: true,
          message: sendErrorType('amazonLink'),
        },
      });
      onErrorMutation({ message: sendErrorType('amazonLink') });
      return false;
    }

    if (dataForm.alibabaLink.length === 0) {
      setErrorFields({
        ...errorFields,
        alibabaLink: {
          isError: true,
          message: sendErrorType('alibabaLink'),
        },
      });
      onErrorMutation({ message: sendErrorType('alibabaLink') });
      return false;
    }

    if (dataForm.price.length === 0) {
      setErrorFields({
        ...errorFields,
        price: {
          isError: true,
          message: sendErrorType('price'),
        },
      });
      onErrorMutation({ message: sendErrorType('price') });
      return false;
    }

    if (dataForm.categories.length === 0) {
      setErrorFields({
        ...errorFields,
        category: {
          isError: true,
          message: sendErrorType('category'),
        },
      });
      onErrorMutation({ message: sendErrorType('category') });
      return false;
    }

    if (images.length === 0) {
      setErrorFields({
        ...errorFields,
        images: {
          isError: true,
          message: sendErrorType('images'),
        },
      });
      onErrorMutation({ message: sendErrorType('images') });
      return false;
    }

    if (details[0].items?.[0]?.content?.length === 0) {
      setErrorFields({
        ...errorFields,
        description: {
          isError: true,
          message: sendErrorType('description'),
        },
      });
      onErrorMutation({ message: sendErrorType('description') });
      return false;
    }

    return true;
  };

  return (
    <ProductContext.Provider
      value={{
        details,
        setDetails,
        errorFields,
        setErrorFields,
        faqs,
        setFaqs,
        addImages,
        setAddImages,
        addCategories,
        setAddCategories,
        removedCategories,
        setRemovedCategories,
        removedImages,
        setRemovedImages,
        removedDetail,
        setRemovedDetail,
        removedFaqs,
        setRemovedFaqs,
        handleValidation,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
export default ProductContextProvider;
