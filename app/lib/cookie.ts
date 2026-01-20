import Cookies from 'js-cookie';

export const setAuthCookies = (token: string, user: any) => {
  Cookies.set('token', token);
  Cookies.set('user', JSON.stringify(user));
};

export const clearAuthCookies = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};
