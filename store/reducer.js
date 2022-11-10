import { combineReducers } from "redux";
import {reducer as user} from '../View/UCenter';
import {reducer as cardEdit} from '../View/CardEdit';

const reducer = combineReducers({
    user,
    cardEdit
})

export default reducer