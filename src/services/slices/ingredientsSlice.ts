import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngridientsState = {
  data: TIngredient[];
  loading: boolean;
};

const initialState: TIngridientsState = {
  data: [],
  loading: false
};

export const getIngridientsThunk = createAsyncThunk<TIngredient[]>(
  'ingridients/getAll',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingridients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state: TIngridientsState) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridientsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngridientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIngridientsThunk.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const selectorsIngredients = ingredientsSlice.selectors;
