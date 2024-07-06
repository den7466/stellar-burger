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

const orderInitialState: TOrderState = {
  ordersHistory: [
    {
      _id: '667039af856777001bb1b93a',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-06-17T13:27:11.127Z',
      updatedAt: '2024-06-17T13:27:11.507Z',
      number: 43052
    }
  ],
  successedOrder: {
    success: true,
    name: 'Флюоресцентный био-марсианский бургер',
    order: {
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      _id: '668912f8856777001bb20247',
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-07-06T09:48:40.197Z',
      updatedAt: '2024-07-06T09:48:40.736Z',
      number: 45046
    }
  },
  orderInfoData: {
    success: true,
    orders: [
      {
        _id: '668939c3856777001bb2029d',
        ingredients: [
          '643d69a5c3f7b9001cfa093f',
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный бессмертный бургер',
        createdAt: '2024-07-06T12:34:11.958Z',
        updatedAt: '2024-07-06T12:34:12.410Z',
        number: 45054
      }
    ]
  },
  orderRequest: false,
  orderError: null
};

const responceGetOrder = [
  {
    _id: '667039af856777001bb1b93a',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-06-17T13:27:11.127Z',
    updatedAt: '2024-06-17T13:27:11.507Z',
    number: 43052
  }
];

const responcePostOrder = {
  success: true,
  name: 'Флюоресцентный био-марсианский бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '668912f8856777001bb20247',
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-07-06T09:48:40.197Z',
    updatedAt: '2024-07-06T09:48:40.736Z',
    number: 45046
  }
};

const responceGetOrderByNumber = {
  success: true,
  orders: [
    {
      _id: '668912f8856777001bb20247',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '666c572897ede0001d070a36',
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-07-06T09:48:40.197Z',
      updatedAt: '2024-07-06T09:48:40.736Z',
      number: 45046,
      __v: 0
    }
  ]
};

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
