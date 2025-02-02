import { decryptData } from '@/helpers/encryption';
import axios from 'axios';
export const publicAPI = process.env.NEXT_PUBLIC_API;

export const apiClient = axios.create({
  timeout: 5000,
});

export const serviceLogin = (payload) =>
  apiClient.post(`${publicAPI}/authorizationservice/login`, payload);

export const serviceGetDashboardData = () =>
  apiClient.post(`${publicAPI}/dashboardservice/getdashboarddata`, null, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetAllCategories = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/getallcategories`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceAddCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/add`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceEditCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/edit`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceRemoveCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/remove`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetAllProducts = (payload) =>
  apiClient.post(`${publicAPI}/productservice/getallproducts`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetDetailProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/detail`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceAddProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/add`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceEditProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/edit`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceRemoveProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/remove`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetAllAttributes = (payload) =>
  apiClient.post(`${publicAPI}/productservice/getallattributes`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetAllHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/getallhorizontallist`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetHorizontalListDetail = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/detail`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceAddHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/add`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceEditHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/edit`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceRemoveHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/remove`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceGetAllBanners = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/getallbanners`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceAddBanner = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/banners/add`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });

export const serviceEditBanner = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/banners/edit`, payload, {
    headers: {
      'X-CSRF-Token': decryptData(localStorage.getItem('csrfToken')),
      Authorization: decryptData(localStorage.getItem('accessToken')),
    },
  });
