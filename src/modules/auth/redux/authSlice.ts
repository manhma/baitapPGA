import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { userInfo } from 'os';
import { ILoginParams } from '../../../models/auth';
import { IUser } from '../../../models/user';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { fetchThunk } from '../../common/redux/thunk';

// interface IInitialState {
//   isLoading: boolean;
//   data: IUser;
//   errorMessage: string;
//   rememberMe: boolean;
// }

// First, create the thunk
export const setUserInfo = createAsyncThunk('auth/userInfo', async (data: ILoginParams) => {
  const res = await fetch('http://api.training.div3.pgtest.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: data.email, password: data.password }),
  });
  const json = await res.json();
  return { ...json, rememberMe: data.rememberMe };
});

// export const setUserInfoNotLogin = createAsyncThunk('auth/userInfo', async (contentType:any) => {
//   const res = await fetch('http://api.training.div3.pgtest.co/api/v1/user', {
//     method: 'POST',
//     headers:
//       contentType !== 'multipart/form-data'
//         ? {
//             'Content-Type': contentType || 'application/json',
//             Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
//           }
//         : {},
//     cache: 'no-store',
//   });
//   const json = await res.json();
//   return json;
// });

const initialState = {
  isLoading: false,
  data: {},
  errorMessage: '',
  rememberMe: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(setUserInfo.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      if (action.payload?.code === RESPONSE_STATUS_SUCCESS) {
        const { data, rememberMe } = action.payload;

        state.data = data;
        state.rememberMe = rememberMe;
      } else {
        state.errorMessage = action.payload.message;
      }
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(setUserInfo.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.errorMessage = 'Thatbai';
      state.isLoading = false;
    });

    ///setUserInfoNotLogin

    // // Bắt đầu thực hiện action login (Promise pending)
    // builder.addCase(setUserInfoNotLogin.pending, (state) => {
    //   // Bật trạng thái loading
    // });

    // // Khi thực hiện action login thành công (Promise fulfilled)
    // builder.addCase(setUserInfoNotLogin.fulfilled, (state, action) => {
    //   // Tắt trạng thái loading, lưu thông tin user vào store
    //   if (action.payload?.code === RESPONSE_STATUS_SUCCESS) {
    //     console.log('action.payload: ', action.payload);
    //     // state.data = action;
    //   }
    // });

    // // Khi thực hiện action login thất bại (Promise rejected)
    // builder.addCase(setUserInfoNotLogin.rejected, (state, action) => {
    //   // Tắt trạng thái loading, lưu thông báo lỗi vào store
    //   state.errorMessage = 'Thatbai';
    // });
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;