import { loginApi, registerApi } from '../api/auth';
import { setAuthCookies } from '../cookie';

export const loginAction = async (data: any) => {
  const response = await loginApi(data);

  setAuthCookies(response.data.token, response.data.user);

  return response.data;
};

export const registerAction = async (data: any) => {
  return await registerApi(data);
};
