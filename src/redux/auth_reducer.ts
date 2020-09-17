/**
 * Created by User-35 on 21.02.2020.
 */
import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {stopSubmit} from 'redux-form'
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CATPTCHA_URL_SUCCESS = 'SET_CATPTCHA_URL_SUCCESS';
export type InitialStateType = typeof InitialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>


let InitialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

const authReducer = (state = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CATPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state;
    }
};
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: 'SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
    setCaptchaUrl: (captchaUrl: string) => ({type: 'SET_CATPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
};

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(meData.data.id, meData.data.email, meData.data.login, true));
    }
};
export const login = (email: string, password: string, rememberMe: boolean = false, captcha: string):ThunkType => async (dispatch) => {
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
export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const capcthaUrl = data.url;
    dispatch(actions.setCaptchaUrl(capcthaUrl));
};
export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};

export default authReducer