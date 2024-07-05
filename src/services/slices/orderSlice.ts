import {
  TNewOrderResponse,
  TOrderResponse,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  ordersHistory: TOrder[];
  successedOrder: TNewOrderResponse | null;
  orderInfoData: TOrderResponse | null;
  orderRequest: boolean;
};

const initialState: TOrderState = {
  ordersHistory: [],
  successedOrder: null,
  orderInfoData: null,
  orderRequest: false
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
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.ordersHistory = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state) => {
        state.orderRequest = false;
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
  getOrdersHistorySelector,
  getOrderRequestStatusSelector,
  getorderModalDataSelector,
  getOrderByNumberSelector
} = orderSlice.selectors;

export const { resetOrderData } = orderSlice.actions;
