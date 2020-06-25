/**
 * Created by Александр on 08.02.2020.
 */
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "react";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

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
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            };
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage};
        case "SET_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount};
        case "TOGGLE_IS_LOADING":
            return {...state, isLoading: action.isLoading};
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isLoading ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};
type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId: userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId: userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users: users} as const),
    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_USERS_COUNT',
        totalUsersCount: totalUsersCount
    } as const),
    toggleIsLoading: (isLoading: boolean) => ({
        type: 'TOGGLE_IS_LOADING',
        isLoading
    } as const),
    toggleFollowingProgress: (isLoading: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isLoading,
        userId
    } as const)
}
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const requestUsers = (page: number, PageSize: number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.toggleIsLoading(true));
    dispatch(actions.setCurrentPage(page));
    let data = await usersAPI.getUsers(page, PageSize);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.toggleIsLoading(false));
};
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
};
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
};
export default usersReducer;