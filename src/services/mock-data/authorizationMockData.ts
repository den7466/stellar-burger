import { TAuthResponse, TUserResponse } from '@api';

export const responceAuthData: TAuthResponse = {
  success: true,
  refreshToken: '000000000000000001',
  accessToken: '000000000000000002',
  user: {
    email: 'test@test.test',
    name: 'testUser'
  }
};

export const responceUserData: TUserResponse = {
  success: true,
  user: {
    email: 'test@test.test',
    name: 'testUser'
  }
};
