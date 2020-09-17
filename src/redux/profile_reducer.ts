/**
 * Created by User-35 on 16.12.2019.
 */
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = "SN/PROFILE/ADD_POST";
const SET_USER_PROFILE = "SN/PROFILE/SET_USER_PROFILE";
const SET_STATUS = "SN/PROFILE/SET_STATUS";
const DELETE_POST = "SN/PROFILE/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SN/PROFILE/SAVE_PHOTO_SUCCESS";

export const actions = {
    addNewPostActionCreator: (newPostText:string) => ({type: ADD_POST, newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    setUserStatus: (status: string) => ({type: SET_STATUS, status} as const),
    deletePost: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoSuccess: (photos: PhotosType)  => ({type: SAVE_PHOTO_SUCCESS, photos} as const)
};

let initialState = {
    posts: [
        {id: 1, message: 'hi, how do you do?', likesCount: 2},
        {id: 2, message: 'Hello World', likesCount:8},
        {id: 3, message: 'What is your name?', likesCount:6}
    ] as Array<PostType>,
    profile: null as ProfileType | null ,
    status: "",
};

const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.newPostText, likesCount:0}],
            };
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
};

export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
};
export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setUserStatus(response))

};
export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
};
export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
};
export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if(userId != null){
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("user id can't be null")
        }

    } else {
       // let message = response.data.messages.length > 0 ? response.data.messages[0];
        if (data.messages.length > 0) {
            let message = data.messages[0];
            let mes = message.replace(/.+Contacts-.+?/g,'').slice(0,-1).toLowerCase();
            let obj = {
                "contacts": {
                }
            };
            // @ts-ignore
            obj['contacts'][mes]= message;
            dispatch(stopSubmit("edit-profile", obj))
            return Promise.reject(message);
        }
    }
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer;
