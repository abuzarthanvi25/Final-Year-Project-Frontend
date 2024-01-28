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
    const response = await ApiResource.post(`${ApiConstants.evaluateAnswers}?user_id=${payload?.user_id}`, {
      data: payload?.answers,
      user_name: payload?.user_name
    });
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
