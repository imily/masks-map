import {cteateStore} from 'redux';
import rootReducer from './RootReducer';

export const Store = cteateStore(rootReducer);
