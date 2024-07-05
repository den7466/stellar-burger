import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';
import { authorizationSlice } from './slices/authorizationSlice';
import { constructorIngredients } from './slices/constructorSlice';
import { feedSlice } from './slices/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { orderSlice } from './slices/orderSlice';

const rootReducerInitState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [authorizationSlice.name]: authorizationSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [constructorIngredients.name]: constructorIngredients.getInitialState()
};

describe('[1] - Тест проверяют правильную инициализацию rootReducer.', () => {
  test("[1.1] - Проверка работы редьюсера с type: 'UNKNOWN_ACTION'.", () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(rootReducerInitState, action);
    expect(state).toEqual(rootReducerInitState);
  });
  test('[1.2] - Проверяет работу начального состояния.', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    expect(state).toEqual(rootReducerInitState);
  });
});
