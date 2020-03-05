import { RECEIVE_USER_LOCATION, RECEIVE_USER_LOCATION_ERROR } from '../Action/Types';
import { notification } from 'antd';

const locationInitState = {
    list: [],
    errorCode: 0,
    errorText: '',
};

export const location = (state = locationInitState, action) => {
    switch (action.type) {
        case RECEIVE_USER_LOCATION:
        return {
            ...state,
            list: action.list,
        };
        case RECEIVE_USER_LOCATION_ERROR:
        return {
                ...state,
                errorCode: action.errorCode,
                errorText: notification.error({
                message: '取得位置資料失敗',
                description: action.errorText,
            }),
        };
        default:
        return state;
    }
};
