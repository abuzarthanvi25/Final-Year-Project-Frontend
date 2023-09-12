import ApiResource from 'services/api';
import ApiConstants from 'store/apiConstants';

async function handleGetJobListings(payload, thunkAPI) {
  try {
    let response;
    if (payload) {
      response = await ApiResource.get(`${ApiConstants.getJobListings}?search=${payload?.searchQuery}`);
    } else {
      response = await ApiResource.get(`${ApiConstants.getJobListings}`);
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}

export const JobListingApiServices = {
  handleGetJobListings
};
