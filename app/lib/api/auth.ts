import axiosInstance from './axios';
import { AUTH_ENDPOINTS } from './endpoint';

export const loginApi = (data: any) => {
  return axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const registerApi = (data: any) => {
  return axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);
};
