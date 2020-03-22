import { combineReducers } from 'redux';
import { location } from './Location';
import { shopes } from './Shopes';
import { selectedOption } from './SeletedOption';

const RootReducer = combineReducers({
    location,
    shopes,
    selectedOption
  });
  
export default RootReducer;
