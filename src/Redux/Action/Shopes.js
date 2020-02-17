import { RECEIVE_SHOPES } from './Types';

export const receiveShopes = json => (
    {
        type: RECEIVE_SHOPES,
        list: json
    }
);
