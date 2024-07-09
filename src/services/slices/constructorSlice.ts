import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { moveElementsInArray } from '../../utils/moveElementsInArray';

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type TConstructorState = {
  constructorItems: TConstructorItems;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorIngredients = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<any>) => {
      const ingredient = action.payload;
      ingredient.type !== 'bun'
        ? state.constructorItems.ingredients.push(ingredient)
        : (state.constructorItems.bun = ingredient);
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveUpIngredient: (state, action) => {
      state.constructorItems.ingredients = moveElementsInArray(
        state.constructorItems.ingredients,
        action.payload,
        action.payload - 1
      );
    },
    moveDownIngredient: (state, action) => {
      state.constructorItems.ingredients = moveElementsInArray(
        state.constructorItems.ingredients,
        action.payload,
        action.payload + 1
      );
    },
    resetOrderConstructor: () => initialState
  },
  selectors: {
    getConstructorItemsSelector: (state: TConstructorState) =>
      state.constructorItems
  }
});

export const { getConstructorItemsSelector } = constructorIngredients.selectors;

export const {
  addIngredient,
  resetOrderConstructor,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient
} = constructorIngredients.actions;
