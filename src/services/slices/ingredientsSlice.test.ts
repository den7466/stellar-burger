import {
  getIngridientsThunk,
  ingredientsSlice,
  initialState
} from './ingredientsSlice';

const ingredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

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
    // TODO: getIngredientsSelector
    // TODO: getLoadingIngredients
  });
});
