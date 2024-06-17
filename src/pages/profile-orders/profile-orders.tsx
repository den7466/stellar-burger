import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrdersHistorySelector,
  getOrdersThunk
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersHistorySelector);
  const dispatch = useDispatch();
  const token = localStorage.getItem('refreshToken');

  useEffect(() => {
    if (token) dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
