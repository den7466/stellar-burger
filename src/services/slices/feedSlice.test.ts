import { configureStore } from '@reduxjs/toolkit';
import {
  feedSlice,
  getFeedsAllSelector,
  getFeedsAllThunk,
  getFeedsDataSelector,
  initialState
} from './feedSlice';

const feedState = {
  feedData: {
    success: true,
    orders: [
      {
        _id: '66890395856777001bb2021c',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный антарианский space традиционный-галактический био-марсианский бургер',
        createdAt: '2024-07-06T08:43:01.893Z',
        updatedAt: '2024-07-06T08:43:03.392Z',
        number: 45043
      }
    ],
    total: 44669,
    totalToday: 71
  },
  loading: false,
  error: null
};

describe('[5] - Тест проверяют редьюсер слайса feed.', () => {
  describe('[5.1] - Проверка асинхронных экшенов.', () => {
    describe('[5.1.1] - Проверка загрузки данных feed - getFeedsAllThunk', () => {
      test('[5.1.1.1] - Проверка при вызове экшена Request.', () => {
        const state = feedSlice.reducer(initialState, {
          type: getFeedsAllThunk.pending.type
        });
        const { loading } = state;
        expect(loading).toBe(true);
      });
      test('[5.1.1.2] - Проверка при вызове экшена Success.', () => {
        const state = feedSlice.reducer(initialState, {
          type: getFeedsAllThunk.fulfilled.type,
          payload: feedState
        });
        const { loading, feedData } = state;
        expect(loading).toBe(false);
        expect(feedData).toEqual(feedState);
      });
      test('[5.1.1.3] - Проверка при вызове экшена Failed.', () => {
        const state = feedSlice.reducer(initialState, {
          type: getFeedsAllThunk.rejected.type,
          error: { name: 'test error', message: 'Test error message' }
        });
        const { loading, error } = state;
        expect(loading).toBe(false);
        expect(error).toEqual({
          name: 'test error',
          message: 'Test error message'
        });
      });
    });
  });
  describe('[5.2] - Проверка селекторов.', () => {
    const store = configureStore({
      reducer: {
        feed: feedSlice.reducer
      },
      preloadedState: {
        feed: feedState
      }
    });
    test('[5.2.1] - Проверка селектора получения всех заказов feed - getFeedsAllSelector.', () => {
      const feedOrdersData = getFeedsAllSelector(store.getState());
      expect(feedOrdersData).toEqual(feedState.feedData.orders);
    });
    test('[5.2.2] - Проверка селектора получения данных feed - getFeedsDataSelector.', () => {
      const feedListData = getFeedsDataSelector(store.getState());
      expect(feedListData).toEqual(feedState.feedData);
    });
  });
});
