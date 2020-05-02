import { RECEIVE_SHOPES, RECEIVE_SHOPES_ERROR } from '../Action/Types';
import { notification } from 'antd';

const shopesInitState = {
  list: [],
  errorCode: 0,
  errorText: '',
};

export const shopes = (state = shopesInitState, action) => {
  switch (action.type) {
    case RECEIVE_SHOPES:
    return {
      ...state,
      list: action.list,
    };
    case RECEIVE_SHOPES_ERROR:
    return {
        ...state,
        errorCode: action.errorCode,
        errorText: notification.error({
        message: '取得店家資料失敗',
        description: action.errorText,
      }),
    };
    default:
    return state;
  }
};
