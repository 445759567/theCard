import {USER_ID, USER} from './actionTypes'

export const setUserIDAction = (data) => ({
   type: USER_ID,
  data: data,
})
export const setUserAction = (data) => ({
    type: USER,
    data: data,
})