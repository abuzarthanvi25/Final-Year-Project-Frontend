import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import InterviewReducer from './reducers/interviewReducer';
import UserReducer from './reducers/userReducer';
import JobListingReducer from './reducers/jobListingReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  interview: InterviewReducer,
  user: UserReducer,
  jobs: JobListingReducer
});

export default rootReducer;
