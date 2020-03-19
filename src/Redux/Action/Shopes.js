import { RECEIVE_SHOPES, RECEIVE_SHOPES_ERROR } from './Types';
import callGetShopes from '../../Api/Shopes';
import store from '../Store';

export const receiveShopes = json => (
    {
        type: RECEIVE_SHOPES,
        list: json
    }
);

export const receiveShopesError = (errorCode, errorText) => (
    {
      type: RECEIVE_SHOPES_ERROR,
      errorCode,
      errorText,
    }
);
  
export const dispatchReceiveCname = () => (
  () => (
    callGetShopes()
      .then((json) => {
        if (json) {
          json.forEach(item => (
            item.show = false
          ));
          store.dispatch(receiveShopes(json));
        }
      })
      .catch((error) => {
        store.dispatch(receiveShopesError(error.response.status, error.response.statusText));
      })
  )
);