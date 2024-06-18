import { FC, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItemsSelector,
  getOrderRequestStatusSelector,
  getorderModalDataSelector,
  postOrderThunk,
  resetOrderConstructor
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderModalData = useSelector(getorderModalDataSelector);
  const orderRequest = useSelector(getOrderRequestStatusSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = [
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id,
      constructorItems.bun._id
    ];
    dispatch(postOrderThunk(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderConstructor());
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
