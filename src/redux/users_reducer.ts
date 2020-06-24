/**
 * Created by Александр on 08.02.2020.
 */
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "react";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let InitialState = {
    users: [] as Array<UserType>,
    pageSize: 15,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number> //array of id user
};
type InitialStateType = typeof InitialState;
const usersReducer = (state = InitialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case  TOGGLE_IS_LOADING:
            return {...state, isLoading: action.isLoading};
        case  TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};
type ActionsTypes =
    FollowSuccessActionType
    | UnfollowSuccessActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleIsLoadingActionType
    | ToggleFollowingProgressActionType
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: 'FOLLOW', userId: userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: 'UNFOLLOW', userId: userId});
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: 'SET_USERS', users: users});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: 'SET_CURRENT_PAGE',
    currentPage: currentPage
});
type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
    type: 'SET_USERS_COUNT',
    totalUsersCount: totalUsersCount
});
type ToggleIsLoadingActionType = {
    type: typeof TOGGLE_IS_LOADING
    isLoading: boolean
}
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({
    type: 'TOGGLE_IS_LOADING',
    isLoading
});
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isLoading: boolean
    userId: number
}
export const toggleFollowingProgress = (isLoading: boolean, userId: number): ToggleFollowingProgressActionType => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isLoading,
    userId
});
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, PageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleIsLoading(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, PageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsLoading(false));
};
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
};
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
};
export default usersReducer;