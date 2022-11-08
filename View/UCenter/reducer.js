import {USER_ID} from './actionTypes'

const defaultState = {
    userID:'',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_ID:
            return {
                ...state,
                userID: action.data
            }
    }

    return state
}
