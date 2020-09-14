import { RECEIVE_SELECTED_DISTANCE, RECEIVE_SELECTED_MASK_TYPE } from "./Types";
import store from "../Store";

export const selectedDistanceAction = (distance) => ({
  type: RECEIVE_SELECTED_DISTANCE,
  text: distance.text,
  info: distance.info,
});

export const selectedMaskAction = (mask) => ({
  type: RECEIVE_SELECTED_MASK_TYPE,
  text: mask.text,
  info: mask.info,
});

export const receiveSelectedDistance = (distance) =>
  store.dispatch(selectedDistanceAction(distance));

export const receiveSelectedMask = (mask) =>
  store.dispatch(selectedMaskAction(mask));
