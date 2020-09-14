import { RECEIVE_SHOPES, RECEIVE_SHOPES_ERROR } from "./Types";
import callGetShopes from "../../Api/Shopes";
import store from "../Store";

export const shopesAction = (json) => ({
  type: RECEIVE_SHOPES,
  list: json,
});

export const shopesActionError = (errorCode, errorText) => ({
  type: RECEIVE_SHOPES_ERROR,
  errorCode,
  errorText,
});

export const receiveShopes = () => () =>
  callGetShopes()
    .then((json) => {
      if (json) {
        json.forEach((item) => (item.show = false));
        store.dispatch(shopesAction(json));
      }
    })
    .catch((error) => {
      store.dispatch(
        shopesActionError(error.response.status, error.response.statusText)
      );
    });
