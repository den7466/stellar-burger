import { TFeedsResponse, getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  feedData: TFeedsResponse;
  loading: boolean;
};

const initialState: TFeedState = {
  feedData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const getFeedsAllThunk = createAsyncThunk(
  'order/getFeedsAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsAllSelector: (state: TFeedState) => state.feedData?.orders,
    getFeedsDataSelector: (state: TFeedState) => state.feedData
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
  }
});

export const { getFeedsAllSelector, getFeedsDataSelector } =
  feedSlice.selectors;
