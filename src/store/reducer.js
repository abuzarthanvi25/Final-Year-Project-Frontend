import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import InterviewReducer from './reducers/interviewReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  interview: InterviewReducer
});

export default rootReducer;
