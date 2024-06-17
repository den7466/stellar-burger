import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export type TAuthorizationState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  userData: TAuthResponse | TUserResponse | null;
  registrationRequest: boolean;
  registrationError: SerializedError | null;
  loginUserError: SerializedError | null;
  loginUserRequest: boolean;
  updateUserRequest: boolean;
};

const initialState: TAuthorizationState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  registrationRequest: false,
  registrationError: null,
  loginUserError: null,
  loginUserRequest: false,
  updateUserRequest: false
};

export const registrationNewUserThunk = createAsyncThunk(
  'authorization/registrationUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'authorization/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    const dataResponse = await loginUserApi(data);
    if (!dataResponse?.success) return rejectWithValue(dataResponse);
    setCookie('accessToken', dataResponse.accessToken);
    localStorage.setItem('refreshToken', dataResponse.refreshToken);
    return dataResponse;
  }
);

export const getUserThunk = createAsyncThunk(
  'authorization/getUser',
  async () => await getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'authorization/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    logoutUser: (state) => {
      state.userData = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    }
  },
  selectors: {
    getRegistrationErrorSelector: (state: TAuthorizationState) =>
      state.registrationError,
    getLoginErrorSelector: (state: TAuthorizationState) => state.loginUserError,
    getAuthenticatedSelector: (state: TAuthorizationState) =>
      state.isAuthenticated,
    getAuthCheckedSelector: (state: TAuthorizationState) => state.isAuthChecked,
    getUserSelector: (state: TAuthorizationState) => state.userData?.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationNewUserThunk.pending, (state) => {
        state.registrationRequest = true;
        state.registrationError = null;
      })
      .addCase(registrationNewUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.registrationRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registrationNewUserThunk.rejected, (state, action) => {
        state.registrationError = action.error;
        state.registrationRequest = false;
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

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      });

    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.updateUserRequest = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.updateUserRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.updateUserRequest = false;
      });
  }
});

export const { authChecked, logoutUser } = authorizationSlice.actions;
export const {
  getRegistrationErrorSelector,
  getLoginErrorSelector,
  getAuthenticatedSelector,
  getAuthCheckedSelector,
  getUserSelector
} = authorizationSlice.selectors;
