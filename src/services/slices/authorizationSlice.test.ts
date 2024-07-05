import { TAuthResponse, TUserResponse } from '@api';
import {
  authChecked,
  authorizationSlice,
  getAuthCheckedSelector,
  getAuthenticatedSelector,
  getUserErrorSelector,
  getUserRequestSelector,
  getUserSelector,
  getUserThunk,
  initialState,
  loginUserThunk,
  logoutUser,
  registrationNewUserThunk,
  updateUserThunk
} from './authorizationSlice';
import { configureStore } from '@reduxjs/toolkit';

const responceAuthData: TAuthResponse = {
  success: true,
  refreshToken: '000000000000000001',
  accessToken: '000000000000000002',
  user: {
    email: 'test@test.test',
    name: 'testUser'
  }
};

const responceUserData: TUserResponse = {
  success: true,
  user: {
    email: 'test@test.test',
    name: 'testUser'
  }
};

describe('[4] - Тест проверяют редьюсер слайса authorization.', () => {
  describe('[4.1] - Проверка синхронных экшенов.', () => {
    test('[4.1.1] - Проверка экшена статуса пользователя - authChecked.', () => {
      const { isAuthChecked } = authorizationSlice.reducer(
        initialState,
        authChecked()
      );
      expect(isAuthChecked).toEqual(true);
    });
    test('[4.1.2] - Проверка экшена очистки-выхода пользователя - logoutUser.', () => {
      const { isAuthChecked, userData, isAuthenticated } =
        authorizationSlice.reducer(initialState, logoutUser());
      expect(isAuthChecked).toBe(true);
      expect(userData).toBe(null);
      expect(isAuthenticated).toBe(false);
    });
  });
  describe('[4.2] - Проверка асинхронных экшенов.', () => {
    describe('[4.2.1] - Проверка регистрации пользователя - registrationNewUserThunk.', () => {
      test('[4.2.1.1] - Проверка при вызове экшена Request.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: registrationNewUserThunk.pending.type
        });
        const { userRequest } = state;
        expect(userRequest).toBe(true);
      });
      test('[4.2.1.2] - Проверка при вызове экшена Success.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: registrationNewUserThunk.fulfilled.type,
          payload: responceAuthData
        });
        const { userRequest, userData } = state;
        expect(userRequest).toBe(false);
        expect(userData).toEqual(responceAuthData);
      });
      test('[4.2.1.3] - Проверка при вызове экшена Failed', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: registrationNewUserThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { userRequest, userError } = state;
        expect(userRequest).toBe(false);
        expect(userError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
    describe('[4.2.2] - Проверка входа пользователя - loginUserThunk.', () => {
      test('[4.2.2.1] - Проверка при вызове экшена Request.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: loginUserThunk.pending.type
        });
        const { userRequest } = state;
        expect(userRequest).toBe(true);
      });
      test('[4.2.2.2] - Проверка при вызове экшена Success.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: loginUserThunk.fulfilled.type,
          payload: responceAuthData
        });
        const { userRequest, userData } = state;
        expect(userRequest).toBe(false);
        expect(userData).toEqual(responceAuthData);
      });
      test('[4.2.2.3] - Проверка при вызове экшена Failed.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: loginUserThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { userRequest, userError } = state;
        expect(userRequest).toBe(false);
        expect(userError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
    describe('[4.2.3] - Проверка загрузки данных пользователя - getUserThunk.', () => {
      test('[4.2.3.1] - Проверка при вызове экшена Request.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: getUserThunk.pending.type
        });
        const { userRequest } = state;
        expect(userRequest).toBe(true);
      });
      test('[4.2.3.2] - Проверка при вызове экшена Success.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: getUserThunk.fulfilled.type,
          payload: responceUserData
        });
        const { userRequest, userData } = state;
        expect(userRequest).toBe(false);
        expect(userData).toEqual(responceUserData);
      });
      test('[4.2.3.3] - ', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: getUserThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { userRequest, userError } = state;
        expect(userRequest).toBe(false);
        expect(userError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
    describe('[4.2.4] - Проверка обновления пользователя - updateUserThunk.', () => {
      test('[4.2.4.1] - Проверка при вызове экшена Request.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: updateUserThunk.pending.type
        });
        const { userRequest } = state;
        expect(userRequest).toBe(true);
      });
      test('[4.2.4.2] - Проверка при вызове экшена Success.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: updateUserThunk.fulfilled.type,
          payload: responceUserData
        });
        const { userRequest, userData } = state;
        expect(userRequest).toBe(false);
        expect(userData).toEqual(responceUserData);
      });
      test('[4.2.4.3] - Проверка при вызове экшена Failed.', () => {
        const state = authorizationSlice.reducer(initialState, {
          type: updateUserThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { userRequest, userError } = state;
        expect(userRequest).toBe(false);
        expect(userError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
  });
  describe('[4.3] - Проверка селекторов.', () => {
    const store = configureStore({
      reducer: {
        authorization: authorizationSlice.reducer
      },
      preloadedState: {
        authorization: {
          isAuthChecked: true,
          isAuthenticated: true,
          userData: responceAuthData,
          userRequest: false,
          userError: null
        }
      }
    });
    test('[4.3.1] - Проверка селектора получения ошибки - getUserErrorSelector.', () => {
      const userError = getUserErrorSelector(store.getState());
      expect(userError).toBe(null);
    });
    test('[4.3.2] - Проверка селектора получения статуса аутентификации - getAuthenticatedSelector.', () => {
      const isAuthenticated = getAuthenticatedSelector(store.getState());
      expect(isAuthenticated).toBe(true);
    });
    test('[4.3.3] - Проверка селектора получения статуса проверки пользователя - getAuthCheckedSelector.', () => {
      const isAuthChecked = getAuthCheckedSelector(store.getState());
      expect(isAuthChecked).toBe(true);
    });
    test('[4.3.4] - Проверка селектора получения данных о пользователе - getUserSelector.', () => {
      const userData = getUserSelector(store.getState());
      expect(userData).toEqual(responceAuthData.user);
    });
    test('[4.3.5] - Проверка селектора получения статуса запроса пользователя - getUserRequestSelector.', () => {
      const userRequest = getUserRequestSelector(store.getState());
      expect(userRequest).toBe(false);
    });
  });
});
