import ProductContextProvider from '@/context/ProductContext';
import EditProductAdminPageView from '@/views/EditProductAdmin';
import CheckAuthorizationAdmin from '@/views/CheckAuthorizationAdmin';

const EditProductAdminPage = (props) => {
  return (
    <CheckAuthorizationAdmin>
      <ProductContextProvider>
        <EditProductAdminPageView {...props} />
      </ProductContextProvider>
    </CheckAuthorizationAdmin>
  );
};

export default EditProductAdminPage;
