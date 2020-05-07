/**
 * Created by User-35 on 21.02.2020.
 */
import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA';

let InitialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false

};
const authReducer = (state = InitialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: 'SET_USER_DATA',
    payload: {userId, email, login, isAuth}
});
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.data.id, response.data.data.email, response.data.data.login, true));
    }
};
export const login = (email, password, rememberMe = false) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.messages.length > 0) {
            dispatch(stopSubmit("login", {_error: response.data.messages[0]}))
        }

    }
};
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer;