import { getLocalStorage } from '@/helpers/localStorage';
import axios from 'axios';
export const publicAPI = process.env.NEXT_PUBLIC_API;

export const apiClient = axios.create({
  timeout: 5000,
  headers: {
    'X-CSRF-Token': getLocalStorage('csrfToken'),
    Authorization: getLocalStorage('accessToken'),
  },
});

export const serviceLogin = (payload) =>
  apiClient.post(`${publicAPI}/authorizationservice/login`, payload);

export const serviceGetDashboardData = () =>
  apiClient.post(`${publicAPI}/dashboardservice/getdashboarddata`);

export const serviceGetAllCategories = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/getallcategories`, payload);

export const serviceAddCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/add`, payload);

export const serviceEditCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/edit`, payload);

export const serviceRemoveCategory = (payload) =>
  apiClient.post(`${publicAPI}/categoryservice/remove`, payload);

export const serviceGetAllProducts = (payload) =>
  apiClient.post(`${publicAPI}/productservice/getallproducts`, payload);

export const serviceGetDetailProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/detail`, payload);

export const serviceAddProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/add`, payload);

export const serviceEditProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/edit`, payload);

export const serviceRemoveProduct = (payload) =>
  apiClient.post(`${publicAPI}/productservice/remove`, payload);

export const serviceGetAllAttributes = (payload) =>
  apiClient.post(`${publicAPI}/productservice/getallattributes`, payload);

export const serviceGetAllHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/getallhorizontallist`, payload);

export const serviceGetHorizontalListDetail = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/detail`, payload);

export const serviceAddHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/add`, payload);

export const serviceEditHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/edit`, payload);

export const serviceRemoveHorizontalList = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/horizontallist/remove`, payload);

export const serviceGetAllBanners = (payload) =>
  apiClient.post(`${publicAPI}/contentservice/getallbanners`, payload);
