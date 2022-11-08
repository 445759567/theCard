import { combineReducers } from "redux";
import {reducer as user} from '../View/UCenter';

const reducer = combineReducers({
    user,
})

export default reducer