import ProductContextProvider from '@/context/ProductContext';
import AddProductAdminPageView from '@/views/AddProductAdmin';
import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';

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
