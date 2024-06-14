import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';
import { RootState } from '../store';

interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export type TAuthorizationState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TAuthResponse | null;
  registrationReques: boolean;
  registrationError: SerializedError | null;
  loginUserError: SerializedError | null;
  loginUserRequest: boolean;
};

const initialState: TAuthorizationState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  registrationReques: false,
  registrationError: null,
  loginUserError: null,
  loginUserRequest: false
};

export const registrationNewUserThunk = createAsyncThunk(
  'authorization/registrationUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'authorization/loginUser',
  async (data: TLoginData) => await loginUserApi(data)
);

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getRegistrationErrorSelector: (state: TAuthorizationState) =>
      state.registrationError,
    getLoginErrorSelector: (state: TAuthorizationState) => state.loginUserError,
    getAuthenticatedSelector: (state: TAuthorizationState) =>
      state.isAuthenticated,
    getAuthCheckedSelector: (state: TAuthorizationState) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationNewUserThunk.pending, (state) => {
        state.registrationReques = true;
        state.registrationError = null;
      })
      .addCase(registrationNewUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.registrationReques = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registrationNewUserThunk.rejected, (state, action) => {
        state.registrationError = action.error;
        state.registrationReques = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserError = action.error;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      });
  }
});

export const {
  getRegistrationErrorSelector,
  getLoginErrorSelector,
  getAuthenticatedSelector,
  getAuthCheckedSelector
} = authorizationSlice.selectors;
