import ApiResource from 'services/api';
import ApiConstants from 'store/apiConstants';

async function submitDetails(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.getInterviewQuestions, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

async function resetState(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.resetState);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

async function evaluateAnswers(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.evaluateAnswers, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

export const InterviewApiServices = {
  submitDetails,
  resetState,
  evaluateAnswers
};
