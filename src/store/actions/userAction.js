import ApiResource from 'services/api';
import ApiConstants from 'store/apiConstants';

async function handleLoginUser(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.getUser, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

async function handleRegisterUser(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.users, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

async function handleGetUserEvaluations(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(`${ApiConstants.getUserEvaluations}?user_id=${payload?.user_id}`);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

export const UserApiServices = {
  handleLoginUser,
  handleRegisterUser,
  handleGetUserEvaluations
};
