import { ILoginParams } from '../../../models/auth';

export const fetchThunk = (url: string, body?: any, method: 'get' | 'post' | 'delete' | 'put' = 'get') => {
  return async () => {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof body === 'object' ? JSON.stringify(body) : body,
      // body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const json = await res.json();
    //   return { ...json, rememberMe: data.rememberMe };
    return json;
  };
};
