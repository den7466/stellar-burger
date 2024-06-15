import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/authorizationSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserSelector);
  return <AppHeaderUI userName={userData?.user.name} />;
};
