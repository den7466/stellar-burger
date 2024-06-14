import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type TConstructorState = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructorOrder',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<any>) {
      const ingredient = action.payload;
      ingredient.type !== 'bun'
        ? state.constructorItems.ingredients.push(ingredient)
        : (state.constructorItems.bun = ingredient);
    }
  },
  selectors: {
    getConstructorSelector: (state: TConstructorState) => state
  }
});

export const { getConstructorSelector } = constructorSlice.selectors;
export const { addIngredient } = constructorSlice.actions;
