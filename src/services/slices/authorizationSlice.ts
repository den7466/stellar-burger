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
  userRequest: boolean;
  userError: SerializedError | null;
};

const initialState: TAuthorizationState = {
  isAuthChecked: false,
  isAuthenticated: false,
  userData: null,
  userRequest: false,
  userError: null
};

export const registrationNewUserThunk = createAsyncThunk(
  'authorization/registrationUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const dataResponse = await registerUserApi(data);
    if (!dataResponse?.success) return rejectWithValue(dataResponse);
    setCookie('accessToken', dataResponse.accessToken);
    localStorage.setItem('refreshToken', dataResponse.refreshToken);
    return dataResponse;
  }
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
    getUserErrorSelector: (state: TAuthorizationState) => state.userError,
    getAuthenticatedSelector: (state: TAuthorizationState) =>
      state.isAuthenticated,
    getAuthCheckedSelector: (state: TAuthorizationState) => state.isAuthChecked,
    getUserSelector: (state: TAuthorizationState) => state.userData?.user,
    getUserRequestSelector: (state: TAuthorizationState) => state.userRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrationNewUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(registrationNewUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(registrationNewUserThunk.rejected, (state, action) => {
        state.userError = action.error;
        state.userRequest = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.userRequest = true;
        state.userError = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.userRequest = false;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.userError = action.error;
        state.userRequest = false;
        state.isAuthChecked = true;
      });

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.userRequest = false;
      });

    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.userRequest = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.userRequest = false;
        state.userData = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isAuthChecked = true;
        state.userRequest = false;
      });
  }
});

export const { authChecked, logoutUser } = authorizationSlice.actions;
export const {
  getAuthenticatedSelector,
  getAuthCheckedSelector,
  getUserSelector,
  getUserRequestSelector,
  getUserErrorSelector
} = authorizationSlice.selectors;
