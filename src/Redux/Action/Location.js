import { RECEIVE_USER_LOCATION, RECEIVE_USER_LOCATION_ERROR } from './Types';
import initMap from '../../Api/Location';
import store from '../Store';

export const receiveUserLocation = json => (
  {
    type: RECEIVE_USER_LOCATION,
    list: json
  }
);

export const receiveUserLocationError = (errorCode, errorText) => (
  {
    type: RECEIVE_USER_LOCATION_ERROR,
    errorCode,
    errorText,
  }
);

export const dispatchReceiveLocation = () => (
  () => (
    initMap()
      .then((json) => {
        if (json) {
          store.dispatch(receiveUserLocation(json));
        }
    })
  )
);
