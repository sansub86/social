/**
 * Created by User-35 on 21.02.2020.
 */
import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CATPTCHA_URL_SUCCESS = 'SET_CATPTCHA_URL_SUCCESS';

export type InitialStateType2 = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

let InitialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
};
export type InitialStateType = typeof InitialState;
const authReducer = (state = InitialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CATPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
type SetAuthUserDataActionPaylodType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPaylodType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: 'SET_USER_DATA',
    payload: {userId, email, login, isAuth}
});

type SetCaptchaUrlActionType = {
    type: typeof SET_CATPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: 'SET_CATPTCHA_URL_SUCCESS',
    payload: {captchaUrl}
});
export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(meData.data.id, meData.data.email, meData.data.login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean = false, captcha: string) => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        if (loginData.messages.length > 0) {
            dispatch(stopSubmit("login", {_error: loginData.messages[0]}))
        }
    }
};
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const capcthaUrl = response.data.url;
    dispatch(setCaptchaUrl(capcthaUrl));
};
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export default authReducer