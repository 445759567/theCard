import {CARD_STYLE_ID} from './actionTypes'

const defaultState = {
    cardStyleID: 'style1'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case CARD_STYLE_ID:
            return {
                ...state,
                cardStyleID: action.data
            }
    }

    return state
}
