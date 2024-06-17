import {
  TFeedsResponse,
  TNewOrderResponse,
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TInitialState = {
  feedData: TFeedsResponse;
  ordersHistory: TOrder[];
  successedOrder: TNewOrderResponse | null;
  constructorItems: TConstructorItems;
  loading: boolean;
  orderRequest: boolean;
};

const initialState: TInitialState = {
  feedData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  ordersHistory: [],
  successedOrder: null,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  orderRequest: false
};

export const getFeedsAllThunk = createAsyncThunk(
  'order/getFeedsAll',
  async () => await getFeedsApi()
);

export const getOrdersThunk = createAsyncThunk(
  'order/getOrders',
  async () => await getOrdersApi()
);

export const postOrderThunk = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
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
    getFeedsAllSelector: (state: TInitialState) => state.feedData?.orders,
    getFeedsDataSelector: (state: TInitialState) => state.feedData,
    getOrdersHistorySelector: (state: TInitialState) => state.ordersHistory,
    getOrderRequestStatusSelector: (state: TInitialState) => state.orderRequest,
    getConstructorItemsSelector: (state: TInitialState) =>
      state.constructorItems,
    getorderModalDataSelector: (state: TInitialState) =>
      state.successedOrder?.order
  },
  extraReducers(builder) {
    builder
      .addCase(getFeedsAllThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeedsAllThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData = action.payload;
      })
      .addCase(getFeedsAllThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersHistory = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.successedOrder = action.payload;
        state.constructorItems = { bun: null, ingredients: [] };
      })
      .addCase(postOrderThunk.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  getFeedsAllSelector,
  getFeedsDataSelector,
  getOrdersHistorySelector,
  getOrderRequestStatusSelector,
  getConstructorItemsSelector,
  getorderModalDataSelector
} = orderSlice.selectors;
export const { addIngredient } = orderSlice.actions;
