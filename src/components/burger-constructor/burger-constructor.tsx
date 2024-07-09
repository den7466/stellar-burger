import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrderRequestStatusSelector,
  getorderModalDataSelector,
  postOrderThunk,
  resetOrderData
} from '../../services/slices/orderSlice';
import {
  getConstructorItemsSelector,
  resetOrderConstructor
} from '../../services/slices/constructorSlice';
import { getUserSelector } from '../../services/slices/authorizationSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderModalData = useSelector(getorderModalDataSelector);
  const orderRequest = useSelector(getOrderRequestStatusSelector);
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const ingredientIds = [
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id,
        constructorItems.bun._id
      ];
      dispatch(postOrderThunk(ingredientIds));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetOrderConstructor());
    dispatch(resetOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData || null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
