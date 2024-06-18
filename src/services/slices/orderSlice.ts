import {
  TFeedsResponse,
  TNewOrderResponse,
  TOrderResponse,
  getFeedsApi,
  getOrderByNumberApi,
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
  orderInfoData: TOrderResponse | null;
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
  orderInfoData: null,
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

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
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
      const ingredients = state.constructorItems.ingredients;
      const tmp = ingredients[action.payload];
      ingredients[action.payload] = ingredients[action.payload - 1];
      ingredients[action.payload - 1] = tmp;
      state.constructorItems.ingredients = ingredients;
    },
    moveDownIngredient: (state, action) => {
      const ingredients = state.constructorItems.ingredients;
      const tmp = ingredients[action.payload];
      ingredients[action.payload] = ingredients[action.payload + 1];
      ingredients[action.payload + 1] = tmp;
      state.constructorItems.ingredients = ingredients;
    },
    resetOrderConstructor: () => initialState
  },
  selectors: {
    getFeedsAllSelector: (state: TInitialState) => state.feedData?.orders,
    getFeedsDataSelector: (state: TInitialState) => state.feedData,
    getOrdersHistorySelector: (state: TInitialState) => state.ordersHistory,
    getOrderRequestStatusSelector: (state: TInitialState) => state.orderRequest,
    getConstructorItemsSelector: (state: TInitialState) =>
      state.constructorItems,
    getorderModalDataSelector: (state: TInitialState) =>
      state.successedOrder?.order,
    getOrderByNumberSelector: (state: TInitialState) =>
      state.orderInfoData?.orders[0]
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
      })
      .addCase(postOrderThunk.rejected, (state) => {
        state.orderRequest = false;
      });

    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderInfoData = action.payload;
      })
      .addCase(getOrderByNumberThunk.rejected, (state) => {
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
  getorderModalDataSelector,
  getOrderByNumberSelector
} = orderSlice.selectors;
export const {
  addIngredient,
  resetOrderConstructor,
  deleteIngredient,
  moveDownIngredient,
  moveUpIngredient
} = orderSlice.actions;
