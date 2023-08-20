import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { InterviewApiServices } from 'store/actions/interviewAction';

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
};

let initialState = {
  error: null,
  loading: loadingStates.idle,
  allQuestions: [],
  userDetails: null
};

export const submitDetailsRequest = createAsyncThunk('InterviewReducer/submitDetailsRequest', async (payload, thunkApi) => {
  const response = await InterviewApiServices.submitDetails(payload, thunkApi);
  return response;
});

export const resetStateRequest = createAsyncThunk('InterviewReducer/resetStateRequest', async (payload, thunkApi) => {
  const response = await InterviewApiServices.resetState(payload, thunkApi);
  return response;
});

const InterviewReducer = createReducer(initialState, {
  [submitDetailsRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    };
  },

  [submitDetailsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allQuestions: action.payload.data?.questions,
      userDetails: action.payload.data?.user_details
    };
  },

  [submitDetailsRequest.rejected]: (state, action) => {
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

export default InterviewReducer;
