import { TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  constructorIngredients,
  deleteIngredient,
  getConstructorItemsSelector,
  initialState,
  moveDownIngredient,
  moveUpIngredient,
  resetOrderConstructor,
  TConstructorState
} from './constructorSlice';
import { configureStore } from '@reduxjs/toolkit';

const bun: TConstructorIngredient = {
  id: '0',
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredient: TConstructorIngredient = {
  id: '0',
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
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const newStateWithIngredient: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: [
      {
        id: '0',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  }
};

const newStateWithBun: TConstructorState = {
  constructorItems: {
    bun: {
      id: '0',
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    ingredients: []
  }
};

const initialStateWithIngredients: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: [
      {
        id: '0',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
      }
    ]
  }
};

const stateWithIngredientsMoveUp: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: [
      {
        id: '1',
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
      },
      {
        id: '0',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]
  }
};

describe('[2] - Тест проверяют редьюсер слайса constructor.', () => {
  describe('[2.1] - Проверка синхронных экшенов.', () => {
    test('[2.1.1] - Проверка обработки экшена добавления - addIngredient (ингредиент).', () => {
      const state = constructorIngredients.reducer(
        initialState,
        addIngredient(ingredient)
      );
      expect(state).toEqual(newStateWithIngredient);
    });
    test('[2.1.2] - Проверка обработки экшена добавления - addIngredient (булка).', () => {
      const state = constructorIngredients.reducer(
        initialState,
        addIngredient(bun)
      );
      expect(state).toEqual(newStateWithBun);
    });
    test('[2.1.3] - Проверка обработки экшена удаления ингредиента - deleteIngredient.', () => {
      const state = constructorIngredients.reducer(
        newStateWithIngredient,
        deleteIngredient(0)
      );
      expect(state).toEqual(initialState);
    });
    test('[2.1.4] - Проверка обработки экшена изменения порядка ингредиентов в начинке (вверх) - moveUpIngredient.', () => {
      const state = constructorIngredients.reducer(
        initialStateWithIngredients,
        moveUpIngredient(1)
      );
      expect(state).toEqual(stateWithIngredientsMoveUp);
    });
    test('[2.1.5] - Проверка обработки экшена изменения порядка ингредиентов в начинке (вниз) - moveDownIngredient.', () => {
      const state = constructorIngredients.reducer(
        stateWithIngredientsMoveUp,
        moveDownIngredient(0)
      );
      expect(state).toEqual(initialStateWithIngredients);
    });
    test('[2.1.6] - Проверка обработки экшена очистки конструктора - resetOrderConstructor.', () => {
      const state = constructorIngredients.reducer(
        newStateWithIngredient,
        resetOrderConstructor()
      );
      expect(state).toEqual(initialState);
    });
  });
  describe('[2.2] - Проверка селекторов.', () => {
    const itemsConstructorData = {
      bun: {
        id: '0',
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      ingredients: [
        {
          id: '1',
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-03-large.png'
        }
      ]
    };
    const store = configureStore({
      reducer: {
        constructorIngredients: constructorIngredients.reducer
      },
      preloadedState: {
        constructorIngredients: {
          constructorItems: {
            bun: {
              id: '0',
              _id: '643d69a5c3f7b9001cfa093c',
              name: 'Краторная булка N-200i',
              type: 'bun',
              proteins: 80,
              fat: 24,
              carbohydrates: 53,
              calories: 420,
              price: 1255,
              image: 'https://code.s3.yandex.net/react/code/bun-02.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png'
            },
            ingredients: [
              {
                id: '1',
                _id: '643d69a5c3f7b9001cfa0944',
                name: 'Соус традиционный галактический',
                type: 'sauce',
                proteins: 42,
                fat: 24,
                carbohydrates: 42,
                calories: 99,
                price: 15,
                image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
                image_mobile:
                  'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
                image_large:
                  'https://code.s3.yandex.net/react/code/sauce-03-large.png'
              }
            ]
          }
        }
      }
    });
    test('[2.2.1] - Проверка селектора получения итемов конструктора - getConstructorItemsSelector.', () => {
      const constructorItems = getConstructorItemsSelector(store.getState());
      expect(constructorItems).toEqual(itemsConstructorData);
    });
  });
});
