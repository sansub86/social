/**
 * Created by User-35 on 16.12.2019.
 */
import {profileAPI} from "../api/api";
const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS ="SET_STATUS";
export const addNewPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_STATUS, status});

let initialState = {
    posts: [
        {id: 1, message: 'hi, how do you do?'},
        {id: 2, message: 'Hello World'},
        {id: 2, message: 'What is your name?'}
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, message: action.newPostText}],
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
        default:
            return state;
    }
};

export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
};
export const getStatus = (userId) => (dispatch) =>{
    profileAPI.getStatus(userId).then(response => {
        dispatch(setUserStatus(response.data))
    });
};
export const updateStatus = (status) => (dispatch) =>{
    profileAPI.updateStatus(status).then(response => {
        if(response.data.resultCode === 0){
            dispatch(setUserStatus(status))
        }
    });
};

export default profileReducer;
