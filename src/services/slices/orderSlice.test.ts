import { configureStore } from '@reduxjs/toolkit';
import {
  getOrderByNumberSelector,
  getOrderByNumberThunk,
  getorderModalDataSelector,
  getOrderRequestStatusSelector,
  getOrdersHistorySelector,
  getOrdersThunk,
  initialState,
  orderSlice,
  postOrderThunk,
  resetOrderData,
  TOrderState
} from './orderSlice';
import {
  orderInitialState,
  responceGetOrder,
  responceGetOrderByNumber,
  responcePostOrder
} from '../mock-data/orderMockData';

describe('[6] - Тест проверяют редьюсер слайса order.', () => {
  describe('[6.1] - Проверка синхронных экшенов.', () => {
    test('[6.1.1] - Проверка экшена очистки данных заказа - resetOrderData', () => {
      const state = orderSlice.reducer(orderInitialState, resetOrderData());
      expect(state).toEqual(initialState);
    });
  });
  describe('[6.2] - Проверка асинхронных экшенов.', () => {
    describe('[6.2.1] - Проверка экшена получения данных заказа - getOrdersThunk', () => {
      test('[6.2.1.1] - Проверка при вызове экшена Request.', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrdersThunk.pending.type
        });
        const { orderRequest } = state;
        expect(orderRequest).toBe(true);
      });
      test('[6.2.1.2] - Проверка при вызове экшена Success.', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrdersThunk.fulfilled.type,
          payload: responceGetOrder
        });
        const { orderRequest, ordersHistory } = state;
        expect(orderRequest).toBe(false);
        expect(ordersHistory).toEqual(responceGetOrder);
      });
      test('[6.2.1.3] - Проверка при вызове экшена Failed', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrdersThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { orderRequest, orderError } = state;
        expect(orderRequest).toBe(false);
        expect(orderError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
    describe('[6.2.2] - Проверка экшена оформления заказа - postOrderThunk', () => {
      test('[6.2.2.1] - Проверка при вызове экшена Request.', () => {
        const state = orderSlice.reducer(initialState, {
          type: postOrderThunk.pending.type
        });
        const { orderRequest } = state;
        expect(orderRequest).toBe(true);
      });
      test('[6.2.2.2] - Проверка при вызове экшена Success.', () => {
        const state = orderSlice.reducer(initialState, {
          type: postOrderThunk.fulfilled.type,
          payload: responcePostOrder
        });
        const { orderRequest, successedOrder } = state;
        expect(orderRequest).toBe(false);
        expect(successedOrder).toEqual(responcePostOrder);
      });
      test('[6.2.2.3] - Проверка при вызове экшена Failed', () => {
        const state = orderSlice.reducer(initialState, {
          type: postOrderThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { orderRequest, orderError } = state;
        expect(orderRequest).toBe(false);
        expect(orderError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
    describe('[6.2.3] - Проверка экшена получения заказа по id - getOrderByNumberThunk', () => {
      test('[6.2.3.1] - Проверка при вызове экшена Request.', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrderByNumberThunk.pending.type
        });
        const { orderRequest } = state;
        expect(orderRequest).toBe(true);
      });
      test('[6.2.3.2] - Проверка при вызове экшена Success.', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrderByNumberThunk.fulfilled.type,
          payload: responceGetOrderByNumber
        });
        const { orderRequest, orderInfoData } = state;
        expect(orderRequest).toBe(false);
        expect(orderInfoData).toEqual(responceGetOrderByNumber);
      });
      test('[6.2.3.3] - Проверка при вызове экшена Failed', () => {
        const state = orderSlice.reducer(initialState, {
          type: getOrderByNumberThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { orderRequest, orderError } = state;
        expect(orderRequest).toBe(false);
        expect(orderError).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
  });
  describe('[6.3] - Проверка селекторов.', () => {
    const store = configureStore({
      reducer: {
        order: orderSlice.reducer
      },
      preloadedState: {
        order: orderInitialState
      }
    });
    test('[6.3.1] - Проверка селектора получения истории заказов пользователя - getOrdersHistorySelector', () => {
      const ordersHistory = getOrdersHistorySelector(store.getState());
      expect(ordersHistory).toEqual(orderInitialState.ordersHistory);
    });
    test('[6.3.2] - Проверка селектора получения статуса загрузки - getOrderRequestStatusSelector', () => {
      const orderRequest = getOrderRequestStatusSelector(store.getState());
      expect(orderRequest).toBe(false);
    });
    test('[6.3.3] - Проверка селектора получения информации успешного заказа - getorderModalDataSelector', () => {
      const successedOrder = getorderModalDataSelector(store.getState());
      expect(successedOrder).toEqual(orderInitialState.successedOrder?.order);
    });
    test('[6.3.4] - Проверка селектора получения информации заказа по id - getOrderByNumberSelector', () => {
      const orderInfoData = getOrderByNumberSelector(store.getState());
      expect(orderInfoData).toEqual(orderInitialState.orderInfoData?.orders[0]);
    });
  });
});
