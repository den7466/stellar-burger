import {
  TNewOrderResponse,
  TOrderResponse,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  ordersHistory: TOrder[];
  successedOrder: TNewOrderResponse | null;
  orderInfoData: TOrderResponse | null;
  orderRequest: boolean;
  orderError: SerializedError | null;
};

export const initialState: TOrderState = {
  ordersHistory: [],
  successedOrder: null,
  orderInfoData: null,
  orderRequest: false,
  orderError: null
};

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
    resetOrderData: () => initialState
  },
  selectors: {
    getOrdersHistorySelector: (state: TOrderState) => state.ordersHistory,
    getOrderRequestStatusSelector: (state: TOrderState) => state.orderRequest,
    getorderModalDataSelector: (state: TOrderState) =>
      state.successedOrder?.order,
    getOrderByNumberSelector: (state: TOrderState) =>
      state.orderInfoData?.orders[0]
  },
  extraReducers(builder) {
    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.ordersHistory = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error;
      });

    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.successedOrder = action.payload;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error;
      });

    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderInfoData = action.payload;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error;
      });
  }
});

export const {
  getOrdersHistorySelector,
  getOrderRequestStatusSelector,
  getorderModalDataSelector,
  getOrderByNumberSelector
} = orderSlice.selectors;

export const { resetOrderData } = orderSlice.actions;
