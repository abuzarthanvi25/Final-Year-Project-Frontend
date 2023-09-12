import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { JobListingApiServices } from 'store/actions/jobListingAction';
import { resetStateRequest } from './userReducer';

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
};

let initialState = {
  error: null,
  loading: loadingStates.idle,
  jobListings: []
};

export const getJobListingsRequest = createAsyncThunk('JobListingReducer/getJobListingsRequest', async (payload, thunkApi) => {
  const response = await JobListingApiServices.handleGetJobListings(payload, thunkApi);
  return response;
});

const JobListingReducer = createReducer(initialState, {
  [getJobListingsRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    };
  },

  [getJobListingsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      jobListings: action.payload.data
    };
  },

  [getJobListingsRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    };
  },
  [resetStateRequest.fulfilled]: () => {
    return {
      ...initialState
    };
  }
});

export default JobListingReducer;
