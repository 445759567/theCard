import {USER_ID, USER} from './actionTypes'

const defaultState = {
    userID:'',
    user:{}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_ID:
            return {
                ...state,
                userID: action.data
            }
        case USER:
            return {
                ...state,
                user: action.data
            }
    }

    return state
}
