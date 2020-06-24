/**
 * Created by User-35 on 16.12.2019.
 */
import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
type AddNewPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addNewPostActionCreator = (newPostText:string):AddNewPostActionCreatorType => ({type: ADD_POST, newPostText});
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileType => ({type: SET_USER_PROFILE, profile});
type SetUserStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setUserStatus = (status: string):SetUserStatusType => ({type: SET_STATUS, status});
type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number):DeletePostType => ({type: DELETE_POST, postId});
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessType  => ({type: SAVE_PHOTO_SUCCESS, photos});
let initialState = {
    posts: [
        {id: 1, message: 'hi, how do you do?', likesCount: 2},
        {id: 2, message: 'Hello World', likesCount:8},
        {id: 3, message: 'What is your name?', likesCount:6}
    ] as Array<PostType>,
    profile: null as ProfileType | null ,
    status: "",
    newPostText: ''
};
export type InitialStateType = typeof initialState;
const profileReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.newPostText, likesCount:0}],
                newPostText: ''
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

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(response.data))

};
export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
};
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
       // let message = response.data.messages.length > 0 ? response.data.messages[0];
        if (response.data.messages.length > 0) {
            let message = response.data.messages[0];
            let mes = message.replace(/.+Contacts-.+?/g,'').slice(0,-1).toLowerCase();
            let obj = {
                "contacts": {
                }
            };
            // @ts-ignore
            obj['contacts'][mes]= message;
            dispatch(stopSubmit("edit-profile", obj));
            return Promise.reject(message);
        }
    }
};

export default profileReducer;
