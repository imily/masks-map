import { RECEIVE_USER_LOCATION } from './Types';

export const receiveUserLocation = json => (
    {
        type: RECEIVE_USER_LOCATION,
        list: json
    }
);
