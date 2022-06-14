import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

export const fetchThunk = async (
  url: string,
  method: 'get' | 'post' | 'delete' | 'put' = 'get',
  body?: object | FormData,
  contentType?: string,
) => {
  const res = await fetch(url, {
    method,
    headers:
      contentType !== 'multipart/form-data'
        ? {
            'Content-Type': contentType || 'application/json',
            Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
          }
        : {},
    body: typeof body === 'object' ? JSON.stringify(body) : body,
  });
  const json = await res.json();
  return json;
};
