import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Routes } from './Routes';
import { ACCESS_TOKEN_KEY } from './utils/constants';

function App() {
  // const dispath = useDispatch();
  // const auth = useSelector((state: any) => state.auth);
  // console.log('auth: ', auth);
  // const getProfile = React.useCallback(async () => {
  //   const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  //   if (accessToken && !auth.data) {
  //     dispath(setUserInfoNotLogin(''));
  //     // const json = await dispatch(fetchThunk(API_PATHS.userProfile));
  //     // if (json?.code === RESPONSE_STATUS_SUCCESS) {
  //     //   dispatch(setUserInfo({ ...json.data, token: accessToken }));
  //     //   dispatch(replace(ROUTES.home));
  //     // }
  //   }
  // }, [auth.data]);

  // useEffect(() => {
  //   getProfile();
  // }, [getProfile]);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
