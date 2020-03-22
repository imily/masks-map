import { RECEIVE_SELECTED_DISTANCE, RECEIVE_SELECTED_MASK_TYPE } from './Types';
import store from '../Store';

export const receiveSelectedDistance = distance => (
    {
        type: RECEIVE_SELECTED_DISTANCE,
        text: distance.text,
        info: distance.info,
    }
);

export const receiveSelectedMask = mask => (
    {
        type: RECEIVE_SELECTED_MASK_TYPE,
        text: mask.text,
        info: mask.info,
    }
);

export const dispatchReceiveSelectedDistance = (distance) => (
    store.dispatch(receiveSelectedDistance(distance))
);

export const dispatchReceiveSelectedMask = (mask) => (
    store.dispatch(receiveSelectedMask(mask))
);
