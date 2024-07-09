import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderRequestStatusSelector,
  getOrdersHistorySelector,
  getOrdersThunk
} from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersHistorySelector);
  const dispatch = useDispatch();
  const token = localStorage.getItem('refreshToken');
  const orderRequest = useSelector(getOrderRequestStatusSelector);

  useEffect(() => {
    if (token) dispatch(getOrdersThunk());
  }, []);

  if (orderRequest) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
