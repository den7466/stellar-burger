import { getIngredientsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngridientsState = {
  data: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
};

export const initialState: TIngridientsState = {
  data: [],
  loading: false,
  error: null
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
    getIngredientsSelector: (state: TIngridientsState) => state.data,
    getLoadingIngredients: (state: TIngridientsState) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngridientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngridientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getIngridientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const { getIngredientsSelector, getLoadingIngredients } =
  ingredientsSlice.selectors;
