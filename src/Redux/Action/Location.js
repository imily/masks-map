import { RECEIVE_USER_LOCATION, RECEIVE_USER_LOCATION_ERROR } from "./Types";
import getCurrentLocation from "../../Api/Location";
import store from "../Store";

export const userLocationAction = (json) => ({
  type: RECEIVE_USER_LOCATION,
  list: json,
});

export const userLocationActionError = (errorCode, errorText) => ({
  type: RECEIVE_USER_LOCATION_ERROR,
  errorCode,
  errorText,
});

export const receiveUserLocation = () => () =>
  getCurrentLocation().then((json) => {
    if (json) {
      store.dispatch(userLocationAction(json));
    }
  });
