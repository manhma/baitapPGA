import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../redux/authSlice';
import { AppDispatch } from '../../../redux/store';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../configs/routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';

export default function LoginPage() {
  let history = useHistory();
  const auth = useSelector((state: any) => state.auth);

  const dispath = useDispatch<AppDispatch>();
  const onLogin = (values: ILoginParams) => {
    dispath(setUserInfo(values));
  };

  useEffect(() => {
    if (auth.data.token) {
      Cookies.set(ACCESS_TOKEN_KEY, auth.data.token, { expires: auth.rememberMe ? 7 : undefined });
      history.replace(ROUTES.home);
    }
  }, [auth.data]);

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <LoginForm onLogin={onLogin} isLoading={auth.isLoading} errorMessage={auth.errorMessage} />
      <a href="/sign-up">Đăng kí ngay</a>
    </div>
  );
}
