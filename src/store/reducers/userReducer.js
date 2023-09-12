import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { UserApiServices } from 'store/actions/userAction';
import { InterviewApiServices } from 'store/actions/interviewAction';

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
};

let initialState = {
  error: null,
  loading: loadingStates.idle,
  user: null,
  pastEvaluations: []
};

export const registerUserRequest = createAsyncThunk('UserReducer/registerUserRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.handleRegisterUser(payload, thunkApi);
  return response;
});

export const loginUserRequest = createAsyncThunk('UserReducer/loginUserRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.handleLoginUser(payload, thunkApi);
  return response;
});

export const getPastEvaluationsRequest = createAsyncThunk('UserReducer/getPastEvaluationsRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.handleGetUserEvaluations(payload, thunkApi);
  return response;
});

export const resetStateRequest = createAsyncThunk('InterviewReducer/resetStateRequest', async (payload, thunkApi) => {
  const response = await InterviewApiServices.resetState(payload, thunkApi);
  return response;
});

const UserReducer = createReducer(initialState, {
  [registerUserRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    };
  },

  [registerUserRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      user: action.payload.data.user
    };
  },

  [registerUserRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    };
  },
  [loginUserRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    };
  },

  [loginUserRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      user: action.payload.data.user
    };
  },

  [loginUserRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    };
  },
  [getPastEvaluationsRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    };
  },

  [getPastEvaluationsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      pastEvaluations: action.payload.data
    };
  },

  [getPastEvaluationsRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    };
  }
  // [resetStateRequest.fulfilled]: () => {
  //   return {
  //     ...initialState
  //   };
  // }
});

export default UserReducer;
