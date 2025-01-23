import ProductContextProvider from '@/context/ProductContext';
import AddProductAdminPageView from '@/pages/AddProductAdmin';
import CheckAuthorizationAdmin from '@/pages/CheckAuthorizationAdmin';

const AddProductAdminPage = (props) => {
  return (
    <CheckAuthorizationAdmin>
      <ProductContextProvider>
        <AddProductAdminPageView {...props} />
      </ProductContextProvider>
    </CheckAuthorizationAdmin>
  );
};

export default AddProductAdminPage;
