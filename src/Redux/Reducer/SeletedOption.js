import { RECEIVE_SELECTED_DISTANCE, RECEIVE_SELECTED_MASK_TYPE } from '../Action/Types';

const selectedOptionInitState = {
    distance: {
        info: 1,
        text: '一公里'
    },
    mask:  {
        info: '',
        text: ''
    },
};

export const selectedOption = (state = selectedOptionInitState, action) => {
    switch (action.type) {
        case RECEIVE_SELECTED_DISTANCE:
        return {
            ...state,
            distance: {
                info: action.info,
                text: action.text
            },
        };
        case RECEIVE_SELECTED_MASK_TYPE:
        return {
            ...state,
            mask: {
                info: action.info,
                text: action.text
            },
        };
        default:
        return state;
    }
};
