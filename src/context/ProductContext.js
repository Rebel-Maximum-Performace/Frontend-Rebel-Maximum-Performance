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

  return (
    <ProductContext.Provider
      value={{
        details,
        setDetails,
        errorFields,
        setErrorFields,
        faqs,
        setFaqs,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
export default ProductContextProvider;
