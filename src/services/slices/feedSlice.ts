import { TFeedsResponse, getFeedsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';

type TFeedState = {
  feedData: TFeedsResponse;
  loading: boolean;
  error: SerializedError | null;
};

export const initialState: TFeedState = {
  feedData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
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
        state.error = null;
      })
      .addCase(getFeedsAllThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feedData = action.payload;
      })
      .addCase(getFeedsAllThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const { getFeedsAllSelector, getFeedsDataSelector } =
  feedSlice.selectors;
