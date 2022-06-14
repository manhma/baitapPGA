import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './App.css';
import { ROUTES } from './configs/routes';
import { setUserInfoNotLogin } from './modules/auth/redux/authSlice';
import { AppDispatch } from './redux/store';
import { Routes } from './Routes';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { RouterChildContext } from 'react-router';
import SignUpPage from './modules/auth/pages/SignUpPage';

function App() {
  const dispath = useDispatch<AppDispatch>();
  const history = useHistory() as RouterChildContext['router']['history'];
  const auth = useSelector((state: any) => state.auth);
  const getProfile = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    if (accessToken && !auth.data.data) {
      dispath(setUserInfoNotLogin());
    }
  };
  useEffect(() => {
    if (auth.data) {
      history?.push(ROUTES.home);
    }
  }, [auth]);

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
