import { combineReducers } from 'redux';
import { location } from './Location';
import { shopes } from './Shopes';

const RootReducer = combineReducers({
    location,
    shopes
  });
  
export default RootReducer;
