import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsSelector,
  getIngridientsThunk,
  getLoadingIngredients,
  ingredientsSlice,
  initialState
} from './ingredientsSlice';
import { ingredient, ingredients } from '../mock-data/ingredientsMockData';

describe('[3] - Тест проверяют редьюсер слайса ingredients.', () => {
  describe('[3.1] - Проверка асинхронных экшенов.', () => {
    describe('[3.1.1] - Проверка загрузки ингредиентов - getIngridientsThunk.', () => {
      test('[3.1.1.1] - Проверка при вызове экшена Request.', () => {
        const state = ingredientsSlice.reducer(initialState, {
          type: getIngridientsThunk.pending.type
        });
        const { loading } = state;
        expect(loading).toBe(true);
      });
      test('[3.1.1.2] - Проверка при вызове экшена Success.', () => {
        const state = ingredientsSlice.reducer(initialState, {
          type: getIngridientsThunk.fulfilled.type,
          payload: ingredients
        });
        const { loading, data } = state;
        expect(loading).toBe(false);
        expect(data).toEqual(ingredients);
      });
      test('[3.1.1.3] - Проверка при вызове экшена Failed.', () => {
        const state = ingredientsSlice.reducer(initialState, {
          type: getIngridientsThunk.rejected.type,
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
  describe('[3.2] - Проверка селекторов.', () => {
    const store = configureStore({
      reducer: {
        ingridients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingridients: {
          data: [ingredient],
          loading: false,
          error: null
        }
      }
    });
    test('[3.2.1] - Проверка селектора получения ингредиентов - getIngredientsSelector', () => {
      const data = getIngredientsSelector(store.getState());
      expect(data).toEqual([ingredient]);
    });
    test('[3.2.2] - Проверка селектора получения статуса загрузки ингредиентов - getLoadingIngredients', () => {
      const loading = getLoadingIngredients(store.getState());
      expect(loading).toBe(false);
    });
  });
});
