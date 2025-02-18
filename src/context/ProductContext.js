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
  });

  const [addImages, setAddImages] = useState([]);
  const [addCategories, setAddCategories] = useState([]);

  const [removedCategories, setRemovedCategories] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedDetail, setRemovedDetail] = useState([]);
  const [removedProductAttributes, setRemovedProductAttributes] = useState([]);
  const [removedFaqs, setRemovedFaqs] = useState([]);

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
        removedProductAttributes,
        setRemovedProductAttributes,
        removedFaqs,
        setRemovedFaqs,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
export default ProductContextProvider;
