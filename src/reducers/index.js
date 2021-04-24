
import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { passports } from './passports.reducers';

const rootReducer = combineReducers({
  authentication,
  passports,
});

export default rootReducer;